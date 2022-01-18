import pymongo
import uvicorn
import boto3
from fastapi import FastAPI, Response, Request
from fastapi.responses import JSONResponse
from pymongo import MongoClient

from aws_confing import *
import pymongo

app = FastAPI(docs_url='/swagger')


def mongo_connection():
    client = MongoClient('localhost', 27017)  # mongoDB는 27017 포트로 돌아갑니다.
    db = client.wewaa
    doc = {'name': 'bobby', 'age': 21}
    db.users.insert_one(doc)

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


s3 = s3_connection()


def serve():
    uvicorn.run(app, host="0.0.0.0", port=80)


@app.get("/images")
async def get_images() -> None:
    # get all images from S3 using boto3
    status_code = 200
    result = {}
    return JSONResponse(result, status_code=status_code)


@app.post("/inference")
async def inference(prompt: str) -> None:
    # generate images with given prompt
    # save images to S3 using boto3

    file = request.files['file']

    s3.put_object(
        ACL="public-read",
        Bucket=f"{AWS_S3_BUCKET_NAME}",
        Body=file,
        Key=file.filename,
        ContentType=file.content_type)

    with open(file.filename, "wb") as f:
        f.write(contents)

    status_code = 201
    result = {}  # show S3 urls with 201 Created? or not?
    return JSONResponse(result, status_code=status_code)


if __name__ == '__main__':
    serve()


mongo_connection()
