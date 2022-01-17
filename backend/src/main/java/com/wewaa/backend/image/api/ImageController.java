package com.wewaa.backend.image.api;

import com.google.cloud.storage.Blob;
import com.wewaa.backend.image.dto.DownloadReqDto;
import com.wewaa.backend.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/image")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/")
    public ResponseEntity localDownloadFromStorage(@RequestBody DownloadReqDto downloadReqDto){
        Blob fileFromGCS = imageService.downloadFileFromGCS(downloadReqDto);
        return ResponseEntity.ok(fileFromGCS.toString());
    }
}
