package com.flink.streaming.web.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
@Configuration
@Data
@ConfigurationProperties(prefix = "aws.s3")
public class AwsS3Properties {
/**
 * @author dingtianlu
 * @date 2024-06-11 14:33
 */
    private String accessKeyId;
    private String secretKey;
    private String bucketName;
    private String region;
}
