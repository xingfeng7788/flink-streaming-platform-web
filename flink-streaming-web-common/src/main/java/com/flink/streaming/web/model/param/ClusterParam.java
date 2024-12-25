package com.flink.streaming.web.model.param;

import com.flink.streaming.web.model.page.PageParam;
import lombok.Data;

@Data
public class ClusterParam  extends PageParam {
/**
 * @author dingtianlu
 * @date 2024-06-04 11:39
 */
    private String clusterName;
    private String clusterMasterIp;

}
