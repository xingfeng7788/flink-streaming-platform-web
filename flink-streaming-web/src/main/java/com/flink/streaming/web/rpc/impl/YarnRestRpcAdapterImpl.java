package com.flink.streaming.web.rpc.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.flink.streaming.web.common.FlinkYarnRestUriConstants;
import com.flink.streaming.web.common.SystemConstants;
import com.flink.streaming.web.common.util.HttpUtil;
import com.flink.streaming.web.enums.SysErrorEnum;
import com.flink.streaming.web.enums.YarnStateEnum;
import com.flink.streaming.web.exceptions.BizException;
import com.flink.streaming.web.model.dto.JobConfigDTO;
import com.flink.streaming.web.model.to.AppTO;
import com.flink.streaming.web.model.to.YarnAppInfo;
import com.flink.streaming.web.rpc.YarnRestRpcAdapter;
import com.flink.streaming.web.rpc.model.JobInfo;
import com.flink.streaming.web.service.SystemConfigService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * @author zhuhuipei
 * @Description:
 * @date 2020-08-06
 * @time 20:15
 */
@Service
@Slf4j
public class YarnRestRpcAdapterImpl implements YarnRestRpcAdapter {

  private static final String BODY_HTTP_KILL = "{\"state\":\"KILLED\"}";

  @Autowired
  private SystemConfigService systemConfigService;

  //TODO 设个方法设计不好 需要改造
  @Override
  public String getAppIdByYarn(Long clusterId, String jobName, String queueName) {
    if (StringUtils.isEmpty(jobName)) {
      throw new BizException(SysErrorEnum.PARAM_IS_NULL);
    }
    String url =
        systemConfigService.getYarnRmHttpAddress(clusterId) + SystemConstants.buildHttpQuery(queueName);
    RestTemplate restTemplate = HttpUtil.buildRestTemplate(HttpUtil.TIME_OUT_1_M);
    log.info("请求参数  url={}", url);
    String res = restTemplate.getForObject(url, String.class);

    YarnAppInfo yarnAppInfo = JSON.parseObject(res, YarnAppInfo.class);

    this.check(yarnAppInfo, queueName, jobName, url);

    for (AppTO appTO : yarnAppInfo.getApps().getApp()) {
      if (JobConfigDTO.buildRunName(jobName).equals(appTO.getName())) {
        if (SystemConstants.STATUS_RUNNING.equals(appTO.getState())) {
          log.info("任务信息 appTO={}", appTO);
          return appTO.getId();
        } else {
          log.error("任务运行状态失败 状态是 {}", appTO.getState());
        }
      }
    }
    throw new BizException("yarn队列" + queueName + "中没有找到运行的任务 name="
        + JobConfigDTO.buildRunName(jobName), SysErrorEnum.YARN_CODE.getCode());
  }


  @Override
  public void stopJobByJobId(Long clusterId, String appId) {
    log.info("执行stopJobByJobId appId={}", appId);
    if (StringUtils.isEmpty(appId)) {
      throw new BizException(SysErrorEnum.PARAM_IS_NULL_YARN_APPID);
    }
    String url = HttpUtil.buildUrl(systemConfigService.getYarnRmHttpAddress(clusterId),
        SystemConstants.HTTP_YARN_APPS + appId + "/state");
    log.info("请求关闭 URL ={}", url);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<String> httpEntity = new HttpEntity(BODY_HTTP_KILL, headers);
    RestTemplate restTemplate = HttpUtil.buildRestTemplate(HttpUtil.TIME_OUT_1_M);
    restTemplate.put(url, httpEntity);
  }

  @Override
  public YarnStateEnum getJobStateByJobId(Long clusterId, String appId) {
    if (StringUtils.isEmpty(appId)) {
      throw new BizException(SysErrorEnum.PARAM_IS_NULL_YARN_APPID);
    }

    String url = HttpUtil.buildUrl(systemConfigService.getYarnRmHttpAddress(clusterId),
        SystemConstants.HTTP_YARN_APPS + appId + "/state");
    RestTemplate restTemplate = HttpUtil.buildRestTemplate(HttpUtil.TIME_OUT_1_M);
    String res = restTemplate.getForObject(url, String.class);
    if (StringUtils.isEmpty(res)) {
      log.error("请求失败:返回结果为空 url={}", url);
      throw new BizException(SysErrorEnum.HTTP_REQUEST_IS_NULL);
    }
    return YarnStateEnum.getYarnStateEnum(String.valueOf(JSON.parseObject(res).get("state")));
  }

  @Override
  public JobInfo getJobInfoForPerYarnByAppId(Long clusterId, String appId) {
    if (StringUtils.isEmpty(appId)) {
      throw new BizException(SysErrorEnum.HTTP_REQUEST_IS_NULL);
    }
    String res = null;
    try {

      String url = HttpUtil.buildUrl(systemConfigService.getYarnRmHttpAddress(clusterId),
              FlinkYarnRestUriConstants.getUriJobsAwsEmrForYarn(appId));
      log.info("[getJobInfoForPerYarnByAppId---1]请求参数 appId={} url={}", appId, url);
      res = HttpUtil.buildRestTemplate(HttpUtil.TIME_OUT_1_M).getForObject(url, String.class);
      if (StringUtils.isEmpty(res)) {
        return null;
      }
      JSONObject jsonObject = (JSONObject) JSON.parseObject(res).get("app");
      JobInfo jobInfo = new JobInfo();
      if (jsonObject != null && (SystemConstants.STATUS_RUNNING.equals(jsonObject.get("state"))
              || SystemConstants.STATUS_INITIALIZING.equals(jsonObject.get("state"))
              || SystemConstants.STATUS_SCHEDULED.equals(jsonObject.get("state")))) {
        String url2 = HttpUtil.buildUrl(systemConfigService.getFlinkUIAddress(clusterId), FlinkYarnRestUriConstants.getUriJobsForYarn(appId));
        log.info("[getJobInfoForPerYarnByAppId---2]请求参数 appId={} url={}", appId, url2);
        String res2 = HttpUtil.buildRestTemplate(HttpUtil.TIME_OUT_1_M).getForObject(url2, String.class);
        if (StringUtils.isEmpty(res2)) {
          return null;
        }
        JSONArray jsonArray = (JSONArray) JSON.parseObject(res2).get("jobs");
        JSONObject jsonObject2 = (JSONObject) jsonArray.get(0);
        jobInfo.setId((String) jsonObject2.get("id"));
        jobInfo.setStatus((String) jsonObject.get("state"));
      } else {
        jobInfo.setId((String) jsonObject.get("id"));
        jobInfo.setStatus((String) jsonObject.get("state"));
      }
      return jobInfo;
    } catch (Exception e) {
      log.error("[getJobInfoForPerYarnByAppId] 错误  ", e);
    }
    return null;
  }

  @Override
  public void cancelJobForYarnByAppId(Long clusterId, String appId, String jobId) {
    if (StringUtils.isEmpty(appId) || StringUtils.isEmpty(jobId)) {
      throw new BizException(SysErrorEnum.PARAM_IS_NULL);
    }
    String url = HttpUtil.buildUrl(systemConfigService.getFlinkUIAddress(clusterId),
        FlinkYarnRestUriConstants.getUriCancelForYarn(appId, jobId));
    log.info("[cancelJobByAppId]请求参数 appId={} jobId={} url={}", appId, jobId, url);
    String res = HttpUtil.buildRestTemplate(HttpUtil.TIME_OUT_1_M).getForObject(url, String.class);
    log.info("[cancelJobByAppId]请求参数结果: res={}", res);
  }


  @Override
  public String getSavepointPath(Long clusterId, String appId, String jobId) {

    if (StringUtils.isEmpty(appId) || StringUtils.isEmpty(jobId)) {
      throw new BizException(SysErrorEnum.PARAM_IS_NULL);
    }
    String url = HttpUtil.buildUrl(systemConfigService.getFlinkUIAddress(clusterId),
        FlinkYarnRestUriConstants.getUriCheckpointForYarn(appId, jobId));
    log.info("[getSavepointPath]请求参数 appId={} jobId={} url={}", appId, jobId, url);
    String res = HttpUtil.buildRestTemplate(HttpUtil.TIME_OUT_5_M).getForObject(url, String.class);
    log.info("[getSavepointPath]请求参数结果: res={}", res);
    if (StringUtils.isEmpty(res)) {
      return null;
    }
    try {
      JSONObject jsonObject = (JSONObject) JSON.parseObject(res).get("latest");
      JSONObject savepoint = (JSONObject) jsonObject.get("savepoint");
      if (savepoint == null) {
        return null;
      }
      return (String) savepoint.get("external_path");
    } catch (Exception e) {
      log.error("json 异常 res={}", res, e);
    }

    return null;
  }

  private void check(YarnAppInfo yarnAppInfo, String queueName, String jobName, String url) {
    if (yarnAppInfo == null) {
      log.error("在队列" + queueName + "没有找到任何yarn上的任务 url={}", url);
      throw new BizException("yarn队列" + queueName + "中没有找到运行的任务 name="
          + JobConfigDTO.buildRunName(jobName), SysErrorEnum.YARN_CODE.getCode());
    }
    if (yarnAppInfo.getApps() == null) {
      log.error("yarnAppInfo.getApps() is null", yarnAppInfo);
      throw new BizException("yarn队列" + queueName + "中没有找到运行的任务 name="
          + JobConfigDTO.buildRunName(jobName), SysErrorEnum.YARN_CODE.getCode());
    }
    if (yarnAppInfo.getApps().getApp() == null || yarnAppInfo.getApps().getApp().size() <= 0) {
      log.error("yarnAppInfo.getApps().getApp() is null", yarnAppInfo);
      throw new BizException("yarn队列" + queueName + "中没有找到运行的任务 name="
          + JobConfigDTO.buildRunName(jobName), SysErrorEnum.YARN_CODE.getCode());
    }
  }

}
