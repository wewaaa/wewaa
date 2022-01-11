from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
from google.cloud import storage
import os

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./gcs-image-secret-key.json"

app = Flask(__name__)
@app.route('/upload')
def render_file():
    return render_template('upload.html')

@app.route('/fileUpload',methods=['POST'])
def upload_image():
    if request.method == 'POST':
        f = request.files['file']
        # 저장할 경로 + 파일명
        f.save(secure_filename(f.filename))
        print(f.filename)
        print(f.name)

    # The ID of your GCS bucket
    bucket_name = "wewaa_image_bucket"
    # The path to your file to upload
    source_file_name = f.filename
    # The ID of your GCS object
    destination_blob_name = "storage-object-name"

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print(
        "File {} uploaded to {}.".format(
            source_file_name, destination_blob_name
        )
    )
    return render_template('upload.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
