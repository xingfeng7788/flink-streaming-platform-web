package com.flink.streaming.web.service;

import com.flink.streaming.web.model.dto.ClusterDTO;
import com.flink.streaming.web.model.dto.PageModel;
import com.flink.streaming.web.model.param.ClusterParam;

public interface ClusterService {
    /**
     * @author dingtianlu
     * @date 2024-05-31 9:59
     */
    ClusterDTO getClusterById(Long id);

    ClusterDTO getClusterByIp(String ip);

    PageModel<ClusterDTO> queryCluster(ClusterParam clusterParam);

    void addCluster(ClusterDTO clusterDTO);

    void editCluster(ClusterDTO clusterDTO);

    void delCluster(Long id);

    void registerCluster();

}
