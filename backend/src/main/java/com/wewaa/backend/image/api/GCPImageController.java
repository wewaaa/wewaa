package com.wewaa.backend.image.api;

import com.google.cloud.storage.Blob;
import com.wewaa.backend.image.dto.GCPDownloadReqDto;
import com.wewaa.backend.image.service.GCPImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/gcp/image")
@RequiredArgsConstructor
public class GCPImageController {

    private final GCPImageService imageService;

    @PostMapping("/")
    public ResponseEntity localDownloadFromStorage(@RequestBody GCPDownloadReqDto downloadReqDto){
        Blob fileFromGCS = imageService.downloadFileFromGCS(downloadReqDto);
        return ResponseEntity.ok(fileFromGCS.toString());
    }
}
