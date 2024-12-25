package com.flink.streaming.web.controller.api;

import com.flink.streaming.web.common.RestResult;
import com.flink.streaming.web.controller.web.BaseController;
import com.flink.streaming.web.exceptions.BizException;
import com.flink.streaming.web.model.dto.ClusterDTO;
import com.flink.streaming.web.model.dto.PageModel;
import com.flink.streaming.web.model.param.ClusterParam;
import com.flink.streaming.web.model.vo.PageVO;
import com.flink.streaming.web.service.ClusterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api")
@Slf4j
public class ClusterController extends BaseController {
/**
 * @author dingtianlu
 * @date 2024-06-04 13:58
 */

    @Autowired
    private ClusterService clusterService;


    @RequestMapping(value = "/listCluster", method = {RequestMethod.POST})
    public RestResult listCluster(ClusterParam clusterParam) {
        if (clusterParam == null) {
            clusterParam = new ClusterParam();
        }
        PageModel<ClusterDTO> pageModel = clusterService.queryCluster(clusterParam);
        PageVO pageVO = new PageVO();
        pageVO.setPageNum(pageModel.getPageNum());
        pageVO.setPages(pageModel.getPages());
        pageVO.setPageSize(pageModel.getPageSize());
        pageVO.setTotal(pageModel.getTotal());
        pageVO.setData(pageModel);
        return RestResult.success(pageVO);
    }
    @RequestMapping(value = "/addCluster", method = {RequestMethod.POST})
    public RestResult addCluster(ClusterDTO clusterDTO) {

        try {
            clusterService.addCluster(clusterDTO);
        } catch (BizException biz) {
            log.warn("addCluster is error ", biz);
            return RestResult.error(biz.getErrorMsg());
        } catch (Exception e) {
            log.error("addCluster is error", e);
            return RestResult.error(e.getMessage());
        }
        return RestResult.success();
    }

    @RequestMapping(value = "/editCluster", method = {RequestMethod.POST})
    public RestResult editCluster(ClusterDTO clusterDTO) {
        try {
            ClusterDTO clusterDTO1 = clusterService.getClusterById(clusterDTO.getId());
            if (clusterDTO1 == null) {
                return RestResult.error("数据不存在");
            }
            clusterService.editCluster(clusterDTO);
        } catch (BizException biz) {
            log.warn("editCluster is error ", biz);
            return RestResult.error(biz.getErrorMsg());
        } catch (Exception e) {
            log.error("editCluster is error", e);
            return RestResult.error(e.getMessage());
        }
        return RestResult.success();
    }

    @RequestMapping("/delCluster")
    public RestResult<String> delCluster(Long id) {
        try {
            ClusterDTO clusterDTO1 = clusterService.getClusterById(id);
            if (clusterDTO1 == null) {
                return RestResult.error("数据不存在");
            }
            clusterService.delCluster(id);
        } catch (BizException e) {
            log.warn("删除失败 id={}", id, e);
            return RestResult.error(e.getCode(), e.getErrorMsg());
        } catch (Exception e) {
            log.error("删除失败 id={}", id, e);
            return RestResult.error(e.getMessage());
        }
        return RestResult.success();
    }
}
