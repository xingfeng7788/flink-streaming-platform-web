package com.flink.streaming.web.model.dto;


import lombok.Data;

@Data
public class ClusterDTO {
/**
 * @author dingtianlu
 * @date 2024-05-31 9:48
 */
    private Long id;
    private String clusterName;
//    private String deployMode;
    private String clusterMasterIp;
    private String yarnRmPort;
    private String flinkHttpPort;
    private String flinkUiPort;
    private String flinkHaHttpPort;
    private String remark;
    private Integer clusterStatus;

}
