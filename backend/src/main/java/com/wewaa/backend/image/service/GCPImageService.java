package com.wewaa.backend.image.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.wewaa.backend.image.dto.GCPDownloadReqDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Paths;

@Slf4j
@Service
public class GCPImageService {

    public Blob downloadFileFromGCS(GCPDownloadReqDto downloadReqDto) {
//        String keyFileName = "gcs-image-secret-key.json";
//        InputStream keyFile = null;
//        try {
//            keyFile = ResourceUtils.getURL("classpath:" + keyFileName).openStream();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        Storage storage = null;
//        try {
//            storage = StorageOptions.newBuilder().setProjectId("upbeat-sunup-337310")
//                    // Key 파일 수동 등록
//                    .setCredentials(GoogleCredentials.fromStream(keyFile))
//                    .build().getService();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        GoogleCredentials credential = null;
        try {
            credential = GoogleCredentials.fromStream(new FileInputStream("gcs-image-secret-key.json"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        Storage storage = StorageOptions.newBuilder().setCredentials(credential).build().getService();
        String bucketName = downloadReqDto.getBucketName();
        Blob blob = storage.get(bucketName, downloadReqDto.getDownloadFileName());
        blob.downloadTo(Paths.get(downloadReqDto.getLocalFileLocation()));
        return blob;
    }
}
