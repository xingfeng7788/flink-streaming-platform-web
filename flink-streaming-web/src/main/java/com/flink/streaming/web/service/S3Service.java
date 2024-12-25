package com.flink.streaming.web.service;

import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

public interface S3Service {
    /**
     * @author dingtianlu
     * @date 2024-06-11 14:58
     */
    String uploadFile(String objectKey, Path filePath);

    String uploadFile(String objectKey, MultipartFile file);

    void deleteFile(String objectKey);

    byte[] downloadFile(String objectKey);
}
