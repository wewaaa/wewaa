import uvicorn
from fastapi import FastAPI, Response, requests
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import boto3
from aws_confing import *
from pymongo import MongoClient
from bson import ObjectId
import datetime
import uuid

app = FastAPI(docs_url='/swagger')


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


mongo = MongoClient('mongodb', 27017)  # mongoDB는 27017 포트로 돌아갑니다.

s3 = s3_connection()
db = mongo.wewaa  # wewaa database
image = db.image  # image table


def serve():
    uvicorn.run(app, host="0.0.0.0", port=80)


@app.get("/images")
async def get_images() -> JSONResponse:
    # get all images from S3 using boto3
    #
    # TODO...
    #
    status_code = 200
    result = {}
    return JSONResponse(result, status_code=status_code)


@app.post("/inference")
async def inference(prompt: str) -> JSONResponse:
    # generate images with given prompt
    # save images to S3 using boto3

    print("input promt" + prompt)
    images_list = []
    for i in range(16):
        images_list.append(open('../images/sample.png', 'rb'))

    status_code = 201
    result = {
        "total_image": 16,
        "images_url": []
    }  # show S3 urls with 201 Created? or not?
    for result_image in images_list:
        unique_id = str(uuid.uuid4().int)
        file_name = "images/" + unique_id + ".png"
        image_opened_file = result_image
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
            "prompt": prompt,
            "image_url": "https://drawa-image-bucket.s3.eu-west-2.amazonaws.com/images" + file_name,
            "score": score,
            "created_at": datetime.datetime.utcnow()
        }
        print(image_data_dic)
        print("몽고db에 값이 들어가기전")
        # image.insert_one(image_data_dic)
        print("몽고db에 값이 들어감")
        result["images_url"].append("https://drawa-image-bucket.s3.eu-west-2.amazonaws.com/images" + file_name)
    return JSONResponse(result, status_code=status_code)


@app.get("/greeting")
async def hello():
    return "hello tpu"


def main():
    serve()


if __name__ == '__main__':
    main()