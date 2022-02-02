# Original code from https://github.com/borisdayma/dalle-mini/blob/main/tools/inference/inference_pipeline.ipynb
# Writed by Boris Dayma (https://github.com/borisdayma)
# Edited by DPS0340 (https://github.com/DPS0340)

# Copyright 2021 The DALL·E mini Authors
#
#    Licensed under the Apache License, Version 2.0 (the "License");
#    you may not use this file except in compliance with the License.
#    You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS,
#    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#    See the License for the specific language governing permissions and
#    limitations under the License.

from imp import reload
from typing import Any, Callable, Dict, Iterable, List, Tuple

import jax
import jax.numpy as jnp
from dalle_mini.model import CustomFlaxBartForConditionalGeneration as DalleBart
from starlette.responses import JSONResponse
from vqgan_jax.modeling_flax_vqgan import VQModel
from transformers import AutoTokenizer, CLIPProcessor, FlaxCLIPModel
import wandb

def easy_get(dic: dict, *args: List[str]):
    return tuple(map(lambda e: dic[e], args))

def get_dtype():
    # type used for computation - use bfloat16 on TPU's
    dtype = jnp.bfloat16 if jax.local_device_count() == 8 else jnp.float32

    # TODO:
    # - we currently have an issue with model.generate() in bfloat16
    # - https://github.com/google/jax/pull/9089 should fix it
    # - remove below line and test on TPU with next release of JAX
    dtype = jnp.float32

    return dtype

def get_dalle_model() -> Tuple[Any, Any]:
    # Model references
    # dalle-mini
    DALLE_MODEL = "flax-community/dalle-mini"  # can be wandb artifact or 🤗 Hub or local folder
    DALLE_COMMIT_ID = "4d34126d0df8bc4a692ae933e3b902a1fa8b6114"  # used only with 🤗 hub

    dtype = get_dtype()

    # Load models & tokenizer

    # Load dalle-mini
    if ":" in DALLE_MODEL:
        # wandb artifact
        artifact = wandb.Api().artifact(DALLE_MODEL)
        # we only download required files (no need for opt_state which is large)
        model_files = [
            "config.json",
            "flax_model.msgpack",
            "merges.txt",
            "special_tokens_map.json",
            "tokenizer.json",
            "tokenizer_config.json",
            "vocab.json",
        ]
        for f in model_files:
            artifact.get_path(f).download("model")
        model = DalleBart.from_pretrained("model", dtype=dtype)
        tokenizer = AutoTokenizer.from_pretrained("model")
    else:
        # local folder or 🤗 Hub
        model = DalleBart.from_pretrained(
            DALLE_MODEL, revision=DALLE_COMMIT_ID, dtype=dtype
        )
        tokenizer = AutoTokenizer.from_pretrained(DALLE_MODEL, revision=DALLE_COMMIT_ID)

    return model, tokenizer

def get_vqgan_model() -> Any:
    # VQGAN model
    VQGAN_REPO = "flax-community/vqgan_f16_16384"
    VQGAN_COMMIT_ID = None

    # Load VQGAN
    return VQModel.from_pretrained(VQGAN_REPO, revision=VQGAN_COMMIT_ID)

def get_clip_model() -> Tuple[Any, Any]:
    # CLIP model
    CLIP_REPO = "openai/clip-vit-base-patch32"
    CLIP_COMMIT_ID = None

    # Load CLIP
    clip = FlaxCLIPModel.from_pretrained(CLIP_REPO, revision=CLIP_COMMIT_ID)
    processor = CLIPProcessor.from_pretrained(CLIP_REPO, revision=CLIP_COMMIT_ID)

    return clip, processor

def get_models() -> Dict[str, Any]:
    dalle, tokenizer = get_dalle_model()
    vqgan = get_vqgan_model()
    clip, processor = get_clip_model()

    return {
        'dalle': dalle,
        'vqgan': vqgan,
        'clip': clip,
        'tokenizer': tokenizer,
        'processor': processor
    }

def replicate_params(models: dict) -> Dict[str, Any]:
    """Model parameters are replicated on each device for faster inference."""
    from flax.jax_utils import replicate
    dtype = get_dtype()

    dalle, vqgan, clip = easy_get(models, 'dalle', 'vqgan', 'clip')

    # convert model parameters for inference if requested
    if dtype == jnp.bfloat16:
        dalle.params = dalle.to_bf16(dalle.params)

    dalle_params = replicate(dalle.params)
    vqgan_params = replicate(vqgan.params)
    clip_params = replicate(clip.params)

    return {
        'dalle': dalle_params,
        'vqgan': vqgan_params,
        'clip': clip_params
    }


def generate_funcs(models: dict):
    """Model functions are compiled and parallelized to take advantage of multiple devices."""

    from functools import partial

    dalle, vqgan, clip = easy_get(models, 'dalle', 'vqgan', 'clip')

    # model inference
    @partial(jax.pmap, axis_name="batch")
    def p_generate(tokenized_prompt, key, params):
        return dalle.generate(
            **tokenized_prompt,
            do_sample=True,
            num_beams=1,
            prng_key=key,
            params=params,
        )


    # decode images
    @partial(jax.pmap, axis_name="batch")
    def p_decode(indices, params):
        return vqgan.decode_code(indices, params=params)


    # score images
    @partial(jax.pmap, axis_name="batch")
    def p_clip(inputs, params):
        logits = clip(params=params, **inputs).logits_per_image
        return logits
    
    @partial(jax.pmap, axis_name="batch")
    def p_get_images(indices, params):
        return vqgan.decode_code(indices, params=params)

    return {
        'generate': p_generate,
        'decode': p_decode,
        'clip': p_clip,
        'get_images': p_get_images
    }

def get_key_using_seed(seed = None):
    """Keys are passed to the model on each device to generate unique inferences per device."""
    import random

    if seed is None:
        # create a random key
        seed = random.randint(0, 2 ** 32 - 1)

    return jax.random.PRNGKey(seed)


def get_tokenized_prompt(prompt: str = "a red T-shirt", *, models: dict) -> Any:
    """## 🖍 Text Prompt

    Our model may require to normalize the prompt.
    """

    dalle, tokenizer = easy_get(models, 'dalle', 'tokenizer')

    from dalle_mini.text import TextNormalizer

    text_normalizer = TextNormalizer() if dalle.config.normalize_text else None

    """Let's define a text prompt."""

    processed_prompt = text_normalizer(prompt) if dalle.config.normalize_text else prompt

    """We repeat the prompt on each device and tokenize it."""

    # repeat the prompt on each device
    repeated_prompts = [processed_prompt] * jax.device_count()

    # tokenize
    tokenized_prompt = tokenizer(
        repeated_prompts,
        return_tensors="jax",
        padding="max_length",
        truncation=True,
        max_length=128,
    ).data

    return tokenized_prompt

def predict(tokenized_prompt, *, funcs: dict, params: dict, key: Any) -> List:
    """Notes:

    * `0`: BOS, special token representing the beginning of a sequence
    * `2`: EOS, special token representing the end of a sequence
    * `1`: special token representing the padding of a sequence when requesting a specific length

    Finally we distribute the tokenized prompt onto the devices.
    """

    from flax.training.common_utils import shard

    tokenized_prompt = shard(tokenized_prompt)

    """## 🎨 Generate images

    We generate images using dalle-mini model and decode them with the VQGAN.
    """

    # number of predictions
    n_predictions = 16

    # We can customize top_k/top_p used for generating samples
    gen_top_k = None
    gen_top_p = None

    from flax.training.common_utils import shard_prng_key
    import numpy as np
    from PIL import Image
    from tqdm.notebook import trange

    generate, decode = easy_get(funcs, 'generate', 'decode')
    dalle_params, vqgan_params = easy_get(params, 'dalle', 'vqgan')

    # generate images
    images = []
    for i in trange(n_predictions // jax.device_count()):
        # get a new key
        key, subkey = jax.random.split(key)
        # generate images
        encoded_images = generate(
            tokenized_prompt, shard_prng_key(subkey), dalle_params, gen_top_k, gen_top_p
        )
        # remove BOS
        encoded_images = encoded_images.sequences[..., 1:]
        # decode images
        decoded_images = decode(encoded_images, vqgan_params)
        decoded_images = decoded_images.clip(0.0, 1.0).reshape((-1, 256, 256, 3))
        for img in decoded_images:
            images.append(Image.fromarray(np.asarray(img * 255, dtype=np.uint8)))

    return images


def calc_score(images, prompt, *, funcs: dict, models: dict):
    """Let's calculate their score with CLIP."""
    from flax.training.common_utils import shard

    processor, = easy_get(models, 'processor')
    clip, = easy_get(funcs, 'clip')
    clip_params, = easy_get(funcs, 'clip')

    # get clip scores
    clip_inputs = processor(
        text=[prompt] * jax.device_count(),
        images=images,
        return_tensors="np",
        padding="max_length",
        max_length=77,
        truncation=True,
    ).data
    logits = clip(shard(clip_inputs), clip_params)
    logits = logits.squeeze().flatten()

    return logits

from numpy import ndarray

def display_image(prompt: str, images: Iterable, *, logits: ndarray, display: Callable[[Any], None]):
    """Let's display images ranked by CLIP score."""

    print(f"Prompt: {prompt}\n")
    for idx in logits.argsort()[::-1]:
        display(images[idx])
        print(f"Score: {logits[idx]:.2f}\n")

################################################################################################

# Original code by DPS0340 (https://github.com/DPS0340)

# MIT License
#
# Copyright (c) 2022 DPS0340
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

def setup():
    pass

models, params, funcs, key = None, None, None, None

def custom_to_pil(x):
    import numpy as np
    from PIL import Image

    x = np.clip(x, 0.0, 1.0)
    x = (255 * x).astype(np.uint8)
    x = Image.fromarray(x)
    if not x.mode == "RGB":
        x = x.convert("RGB")
    return x

def hallucinate(prompt, num_images=64):
    from flax.training.common_utils import shard
    import random
    import numpy as np

    tokenizer, = easy_get(models, 'tokenizer')
    bart_params, vqgan_params = easy_get(params, 'dalle', 'vqgan')
    p_generate, p_get_images = easy_get(funcs, 'generate', 'get_images')

    prompt = [prompt] * jax.device_count()
    inputs = tokenizer(
        prompt,
        return_tensors="jax",
        padding="max_length",
        truncation=True,
        max_length=128,
    ).data
    inputs = shard(inputs)

    all_images = []
    for i in range(num_images // jax.device_count()):
        key = random.randint(0, 1e7)
        rng = jax.random.PRNGKey(key)
        rngs = jax.random.split(rng, jax.local_device_count())
        indices = p_generate(inputs, rngs, bart_params).sequences
        indices = indices[:, :, 1:]

        images = p_get_images(indices, vqgan_params)
        images = np.squeeze(np.asarray(images), 1)
        for image in images:
            all_images.append(custom_to_pil(image))
    return all_images


def clip_top_k(prompt, images, k=8):
    import numpy as np

    processor, clip = easy_get(models, 'processor', 'clip')

    inputs = processor(text=prompt, images=images, return_tensors="np", padding=True)
    outputs = clip(**inputs)
    logits = outputs.logits_per_text
    scores = np.array(logits[0]).argsort()[-k:][::-1]
    return [images[score] for score in scores]


def top_k_predictions(prompt, num_candidates=32, k=8):
    images = hallucinate(prompt, num_images=num_candidates)
    images = clip_top_k(prompt, images, k=k)
    return images

def init_models():
    global models, params, funcs, key
    setup()
    models = get_models()
    params = replicate_params(models)
    funcs = generate_funcs(models)
    key = get_key_using_seed()

def wrapped_predict(prompt: str):
    tokenized_prompt = get_tokenized_prompt(prompt, models=models)
    images = predict(tokenized_prompt, funcs=funcs, params=params, key=key)

    return images

import uvicorn
from fastapi import FastAPI, Response, requests
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
import boto3
from aws_confing import *
from pymongo import MongoClient
from bson import ObjectId
import datetime
import uuid
from starlette_exporter import PrometheusMiddleware, handle_metrics
from prometheus_fastapi_instrumentator import Instrumentator
app = FastAPI(docs_url='/swagger')
app.add_middleware(PrometheusMiddleware)
app.add_route("/metrics", handle_metrics)
origins = [ "*",
            "http://localhost",
            "http://localhost:80",
            "http://localhost:27017",
            "http://localhost:3000", ]
app.add_middleware(
     CORSMiddleware, 
     allow_origins=origins, 
     allow_credentials=True, 
     allow_methods=["*"], 
     allow_headers=["*"], 
     )
Instrumentator().instrument(app).expose(app)
def s3_connection():
    '''
    s3 bucket에 연결
    :return: 연결된 s3 객체
    '''
    try:
        s3 = boto3.client(
            service_name='s3',
            region_name=AWS_S3_BUCKET_REGION,
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY
        )
    except Exception as e:
        print(e)
        exit("ERROR_S3_CONNECTION_FAILED")
    else:
        print("s3 bucket connected!")
        return s3

def mongodb_connection():
    '''
    mongo bucket에 연결
    return: 연결된 mongo 객체
    '''
    try:
        mongo = MongoClient('localhost',
                  username='wewaa',
                 password='wewaa')  # mongoDB는 27017 포트로 돌아갑니다.
        print(mongo)
        db = mongo.wewaa
    except Exception as e:
        print("[+] Database connection error!")
        raise e
    else:
        print("[+] Database connected!")
        return db


s3 = s3_connection()
db = mongodb_connection()

s3 = s3_connection()
image_table = db.image  # image table

@app.get("/images")
async def get_images(id: str) -> JSONResponse:
    # get all images from S3 using boto3
    #mongo find
    status_code = 200
    result = {}
    return JSONResponse(result, status_code=status_code)

@app.post("/inference")
async def inference(prompt: str) -> JSONResponse:
    if None in [models, params, funcs, key]:
        init_models()

    # generate images with given prompt
    # save images to S3 using boto3
    print("input prompt: "+prompt)
    status_code = 201
    result = {
        "total_image": 16,
        "images_url": []
    } # show S3 urls with 201 Created? or not?

    images_list = top_k_predictions(prompt, num_candidates=64, k=9)
    for result_image in images_list:
        unique_id = str(uuid.uuid4())
        file_name = f"images/{unique_id}.png"
        result_image.save(file_name)
        image_opened_file = open(file_name, 'rb')
        s3.put_object(
            ACL="public-read",
            Bucket=AWS_S3_BUCKET_NAME,
            Body=image_opened_file,
            Key=file_name,
            ContentType="image/png")

        # TODO add user_id and ai estimation score
        score = 0
        user_id = "this_is_userid"
        image_data_dic = {
            "image_id": str(ObjectId()),
            "user_id": user_id,
            "prompt":prompt,
            "image_url": "https://drawa-image-bucket.s3.eu-west-2.amazonaws.com/"+file_name,
            "score": score,
            "created_at": datetime.datetime.now()
        }
        # image_table.insert_one(image_data_dic)
        result["images_url"].append("https://drawa-image-bucket.s3.eu-west-2.amazonaws.com/"+file_name)
    return JSONResponse(result, status_code=status_code)

@app.get("/greeting")
async def hello():
    return "hello tpu"

from pathlib import Path

def serve():
    uvicorn.run("__main__:app", host="0.0.0.0", port=80, reload=True)

def main():
    # init_models()
    serve()


if __name__ == '__main__':
    main()