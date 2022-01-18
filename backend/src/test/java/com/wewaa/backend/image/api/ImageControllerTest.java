package com.wewaa.backend.image.api;


import com.google.api.gax.paging.Page;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import com.wewaa.backend.BackendApplication;
import org.awaitility.Awaitility;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.util.ResourceUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;


@ExtendWith(SpringExtension.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
        classes = {BackendApplication.class})
class ImageControllerTest {
    @Autowired
    private Storage storage;

    @Autowired private TestRestTemplate testRestTemplate;

    @Value("${gcs-resource-test-bucket}")
    private String bucketName;

    @BeforeEach
    @AfterEach
    void cleanupCloudStorage() {
        Page<Blob> blobs = this.storage.list(this.bucketName);
        for (Blob blob : blobs.iterateAll()) {
            blob.delete();
        }
    }

    @Test
    void authImplicit() throws IOException {
        // If you don't specify credentials when constructing the client, the client library will
        // look for credentials via the environment variable GOOGLE_APPLICATION_CREDENTIALS.
        String keyFileName = "gcs-image-secret-key.json";
        InputStream keyFile = ResourceUtils.getURL("classpath:" + keyFileName).openStream();

        Storage storage = StorageOptions.newBuilder().setProjectId("upbeat-sunup-337310")
                // Key 파일 수동 등록
                .setCredentials(GoogleCredentials.fromStream(keyFile))
                .build().getService();

        System.out.println("Buckets:");
        Page<Bucket> buckets = storage.list();
        for (Bucket bucket : buckets.iterateAll()) {
            System.out.println(bucket.toString());
        }
    }

    @Test
    void testGcsResourceIsLoaded() {
        BlobId blobId = BlobId.of(this.bucketName, "my-file.txt");
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("text/plain").build();
        this.storage.create(blobInfo, "Good Morning!".getBytes(StandardCharsets.UTF_8));

        // 딜레이 test
        Awaitility.await()
                .atMost(15, TimeUnit.SECONDS)
                .untilAsserted(
                        () -> {
                            String result = this.testRestTemplate.getForObject("/", String.class);
                            assertThat(result).isEqualTo("Good Morning!\n");
                        });

        this.testRestTemplate.postForObject("/", "Good Night!", String.class);
        Awaitility.await()
                .atMost(15, TimeUnit.SECONDS)
                .untilAsserted(
                        () -> {
                            String result = this.testRestTemplate.getForObject("/", String.class);
                            assertThat(result).isEqualTo("Good Night!\n");
                        });
    }

}