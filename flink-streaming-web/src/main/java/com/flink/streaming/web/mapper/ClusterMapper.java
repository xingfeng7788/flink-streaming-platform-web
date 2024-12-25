package com.flink.streaming.web.mapper;

import com.flink.streaming.web.model.dto.ClusterDTO;
import com.flink.streaming.web.model.param.ClusterParam;
import com.github.pagehelper.Page;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClusterMapper {
/**
 * @author dingtianlu
 * @date 2024-05-31 10:08
 */
    ClusterDTO selectByPrimaryKey(@Param("id") Long id);
    ClusterDTO selectByIp(@Param("ip") String ip);

    Page<ClusterDTO> findClusterList(ClusterParam clusterParam);

    void insert(ClusterDTO record);

    void updateByPrimaryKeySelective(ClusterDTO record);

    void deleteById(@Param("id") Long id);
}
