package com.wewaa.backend.image.api;

import com.wewaa.backend.image.service.S3UploaderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
@Api(tags = "Image")
public class S3ImageController {

    private final S3UploaderService s3Uploader;

    @PostMapping("/images")
    public String upload(@RequestParam("images") MultipartFile multipartFile) throws IOException {
        s3Uploader.upload(multipartFile, "images");
        return "test";
    }

    @ApiOperation(value = "안녕")
    @GetMapping
    public String test() {
        return "test";
    }
}
