package com.flink.streaming.web.service.impl;
import com.flink.streaming.web.config.AwsS3Properties;
import com.flink.streaming.web.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.nio.file.Path;

@Service
public class S3ServiceImpl implements S3Service {
/**
 * @author dingtianlu
 * @date 2024-06-11 14:38
 */

    private final S3Client s3;
    private final AwsS3Properties properties;


    @Autowired
    public S3ServiceImpl(AwsS3Properties properties) {
        this.properties = properties;
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(properties.getAccessKeyId(), properties.getSecretKey());
        this.s3 = S3Client.builder()
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .region(Region.of(properties.getRegion()))
                .build();
    }

    @Override
    public String uploadFile(String objectKey, Path filePath) {
        try {
            PutObjectRequest putOb = PutObjectRequest.builder()
                    .bucket(properties.getBucketName())
                    .key(objectKey)
                    .build();

            this.s3.putObject(putOb, RequestBody.fromFile(filePath));
            System.out.println("Successfully placed " + objectKey + " into bucket " + properties.getBucketName());
            return String.format("s3://%s/%s", properties.getBucketName(), objectKey);
        } catch (S3Exception e) {
            System.err.println(e.getMessage());
            throw new RuntimeException("上传文件到S3失败", e);
        }
    }

    @Override
    public String uploadFile(String objectKey, MultipartFile file) {
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(properties.getBucketName())
                    .key(objectKey)
                    .build();
            s3.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
            return String.format("s3://%s/%s", properties.getBucketName(), objectKey);
        } catch (IOException e) {
            System.err.println(e.getMessage());
            throw new RuntimeException("上传文件到S3失败", e);
        }
    }

    @Override
    public void deleteFile(String objectKey) {
        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(properties.getBucketName())
                    .key(objectKey)
                    .build();
            s3.deleteObject(deleteObjectRequest);
        } catch (NoSuchKeyException e) {
            System.err.println("文件不存在，删除失败");
        } catch (S3Exception e) {
            // 捕获其他S3异常
            System.err.println(e.getMessage());
            throw new RuntimeException("从S3删除对象失败：" + objectKey, e);
        }
    }

    @Override
    public byte[] downloadFile(String objectKey) {
        try {
            GetObjectRequest getObjectRequest = GetObjectRequest
                    .builder()
                    .bucket(properties.getBucketName())
                    .key(objectKey)
                    .build();
            // 使用S3客户端获取对象的字节流
            ResponseBytes<GetObjectResponse> objectBytes = s3.getObjectAsBytes(getObjectRequest);
            // 从ResponseBytes中返回文件字节数据
            return objectBytes.asByteArray();
        } catch (S3Exception e) {
            System.err.println(e.getMessage());
            throw new RuntimeException("从S3下载对象失败：" + objectKey, e);
        }
    }
}
