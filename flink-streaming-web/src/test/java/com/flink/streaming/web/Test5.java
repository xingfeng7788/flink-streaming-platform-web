package com.flink.streaming.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.flink.streaming.web.common.FlinkYarnRestUriConstants;
import com.flink.streaming.web.common.SystemConstants;
import com.flink.streaming.web.common.util.HttpUtil;
import com.flink.streaming.web.enums.SysErrorEnum;
import com.flink.streaming.web.exceptions.BizException;
import com.flink.streaming.web.rpc.model.JobInfo;
import org.apache.commons.lang3.StringUtils;

public class Test5 {
    public static JobInfo getJobInfoForPerYarnByAppId(Long clusterId, String appId) {
        String flinkUrl = "http://10.210.124.65:20888/";
        String yarnUrl = "http://10.210.124.65:8088/";
        if (StringUtils.isEmpty(appId)) {
            throw new BizException(SysErrorEnum.HTTP_REQUEST_IS_NULL);
        }
        String res = null;
        try {

            String url = HttpUtil.buildUrl(yarnUrl,
                    FlinkYarnRestUriConstants.getUriJobsAwsEmrForYarn(appId));
            res = HttpUtil.buildRestTemplate(HttpUtil.TIME_OUT_1_M).getForObject(url, String.class);
            if (StringUtils.isEmpty(res)) {
                return null;
            }
            JSONObject jsonObject = (JSONObject) JSON.parseObject(res).get("app");
            JobInfo jobInfo = new JobInfo();
            if (jsonObject != null && (SystemConstants.STATUS_RUNNING.equals(jsonObject.get("state"))
                    || SystemConstants.STATUS_INITIALIZING.equals(jsonObject.get("state"))
                    || SystemConstants.STATUS_SCHEDULED.equals(jsonObject.get("state")))) {
                String url2 = HttpUtil.buildUrl(flinkUrl, FlinkYarnRestUriConstants.getUriJobsForYarn(appId));
                String res2 = HttpUtil.buildRestTemplate(HttpUtil.TIME_OUT_1_M).getForObject(url2, String.class);
                if (StringUtils.isEmpty(res2)) {
                    return null;
                }
                JSONArray jsonArray = (JSONArray) JSON.parseObject(res2).get("jobs");
                JSONObject jsonObject2 = (JSONObject) jsonArray.get(0);
                jobInfo.setId((String) jsonObject2.get("id"));
                jobInfo.setStatus((String) jsonObject2.get("status"));
            } else {
                jobInfo.setId((String) jsonObject.get("id"));
                jobInfo.setStatus((String) jsonObject.get("state"));
            }
            return jobInfo;
        } catch (Exception e) {
            System.out.println("");
        }
        return null;
    }
    public static void main(String[] args) {
        JobInfo jobInfo = getJobInfoForPerYarnByAppId(13L, "application_1733453970426_0002");
        System.out.println(jobInfo);


    }
}
