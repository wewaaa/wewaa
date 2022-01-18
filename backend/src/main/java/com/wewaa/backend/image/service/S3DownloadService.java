package com.wewaa.backend.image.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3DownloadService {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.originBucket}")
    public String originBucket;

    public String download(MultipartFile multipartFile, String dirName) throws IOException {
        File downloadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("error: MultipartFile -> File convert fail"));

        return download(downloadFile, dirName);
    }

    private String download(File downloadFile, String dirName) {
        String fileName = dirName + "/" + UUID.randomUUID() + downloadFile.getName();
        String downloadImageUrl = putS3(downloadFile, fileName);
        removeNewFile(downloadFile);
        return downloadImageUrl;
    }

    private String putS3(File downloadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(originBucket, fileName, downloadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(originBucket, fileName).toString();
    }

    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("File delete success");
            return;
        }
        log.info("File delete fail");
    }

    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(System.getProperty("user.dir") + File.separator + file.getOriginalFilename());

        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }else {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
    }
}
