package com.wewaa.backend.image.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GCPDownloadReqDto {
    private String bucketName;
    private String downloadFileName;
    private String localFileLocation;
}
