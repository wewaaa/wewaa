FROM gcr.io/tpu-pytorch/xla:nightly_3.8_tpuvm

ENV XRT_TPU_CONFIG="localservice;0;localhost:51011"

WORKDIR /dalle

RUN mkdir -p /usr/share/tpu/

RUN pip install --upgrade pip \
    pip install -q transformers \
    git+https://github.com/patil-suraj/vqgan-jax.git \
    git+https://github.com/borisdayma/dalle-mini.git \
    wandb jax flax \
    "uvicorn[standard]" \
    fastapi

RUN pip install "jax[tpu]>=0.2.16" -f https://storage.googleapis.com/jax-releases/libtpu_releases.html
RUN apt-get update && apt-get install libgl1 -y
RUN pip install cloud-tpu-client
COPY ./requirements.txt ./
RUN pip install -r requirements.txt

ENTRYPOINT [ "python", "src/main.py" ]