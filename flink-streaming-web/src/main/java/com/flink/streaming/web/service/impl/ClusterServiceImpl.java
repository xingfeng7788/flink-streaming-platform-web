package com.flink.streaming.web.service.impl;

import com.flink.streaming.web.common.SystemConstants;
import com.flink.streaming.web.common.util.IpUtil;
import com.flink.streaming.web.enums.SysErrorEnum;
import com.flink.streaming.web.enums.YN;
import com.flink.streaming.web.exceptions.BizException;
import com.flink.streaming.web.mapper.ClusterMapper;
import com.flink.streaming.web.mapper.JobConfigMapper;
import com.flink.streaming.web.model.dto.ClusterDTO;
import com.flink.streaming.web.model.dto.PageModel;
import com.flink.streaming.web.model.entity.JobConfig;
import com.flink.streaming.web.model.param.ClusterParam;
import com.flink.streaming.web.service.ClusterService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class ClusterServiceImpl implements ClusterService {
/**
 * @author dingtianlu
 * @date 2024-05-31 10:00
 */

    @Autowired
    private ClusterMapper clusterMapper;

    @Autowired
    private JobConfigMapper jobConfigMapper;

    @Override
    public ClusterDTO getClusterById(Long id) {
        return clusterMapper.selectByPrimaryKey(id);
    }

    @Override
    public ClusterDTO getClusterByIp(String ip) {
        return clusterMapper.selectByIp(ip);
    }


    @Override
    public PageModel<ClusterDTO> queryCluster(ClusterParam clusterParam) {
        if (clusterParam == null) {
            clusterParam = new ClusterParam();
        }

        PageHelper.startPage(clusterParam.getPageNum(), clusterParam.getPageSize(), YN.Y.getCode());

        Page<ClusterDTO> page = clusterMapper.findClusterList(clusterParam);
        if (page == null) {
            return null;
        }
        PageModel<ClusterDTO> pageModel = new PageModel<ClusterDTO>();
        pageModel.setPageNum(page.getPageNum());
        pageModel.setPages(page.getPages());
        pageModel.setPageSize(page.getPageSize());
        pageModel.setTotal(page.getTotal());
        pageModel.addAll(page.getResult());
        return pageModel;
    }

    public static boolean isValidPort(String portStr) {
        try {
            int port = Integer.parseInt(portStr);
            return port >= 0 && port <= 65535;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    @Override
    public void addCluster(ClusterDTO clusterDTO) {
        if (clusterDTO == null) {
            throw new BizException("参数不能空");
        }
        if (StringUtils.isEmpty(clusterDTO.getClusterName())) {
            throw new BizException("集群名称不能空");
        }
        if (clusterDTO.getClusterMasterIp() == null) {
            throw new BizException("IP不能空");
        }
        clusterMapper.insert(clusterDTO);
    }

    @Override
    public void editCluster(ClusterDTO clusterDTO) {
        if (clusterDTO == null) {
            throw new BizException("参数不能空");
        }
        if (StringUtils.isEmpty(clusterDTO.getClusterName())) {
            throw new BizException("集群名称不能空");
        }
        if (clusterDTO.getClusterMasterIp() == null) {
            throw new BizException("IP不能空");
        }
        clusterMapper.updateByPrimaryKeySelective(clusterDTO);
    }

    @Override
    public void delCluster(Long id) {
//         如果有集群任务引用不能删除
        List<JobConfig> jobConfigList = jobConfigMapper.findJobConfigClusterId(id);
        if (!jobConfigList.isEmpty()) {
            throw new BizException("集群被引用");
        }
        clusterMapper.deleteById(id);
    }

    @Override
    public void registerCluster() {
        String ip = IpUtil.getInstance().getLocalIP();
        if (StringUtils.isEmpty(ip)) {
            log.error(" get ip is null");
            throw new BizException(SysErrorEnum.PARAM_IS_NULL);
        }
//     获取cluster集群信息
        ClusterDTO clusterDTO = clusterMapper.selectByIp(ip);
        if (clusterDTO == null) {
            clusterDTO = new ClusterDTO();
            clusterDTO.setClusterName(String.format(SystemConstants.DEFAULT_FLINK_CLUSTER_NAME_PREFIX + "%s", UUID.randomUUID().toString()));
            clusterDTO.setClusterMasterIp(ip);
            clusterDTO.setYarnRmPort(SystemConstants.DEFAULT_FLINK_YARN_PORT);
            clusterDTO.setFlinkUiPort(SystemConstants.DEFAULT_FLINK_UI_PORT);
            clusterDTO.setRemark("默认自动注册集群");
            clusterMapper.insert(clusterDTO);
        } else {
            log.info(" cluster is already exist");
        }
    }
}
