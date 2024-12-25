package com.flink.streaming.web.common.util;

import com.flink.streaming.common.constant.SystemConstant;
import com.flink.streaming.web.common.SystemConstants;
import com.flink.streaming.web.enums.DeployModeEnum;
import com.flink.streaming.web.model.dto.JobConfigDTO;
import com.flink.streaming.web.model.dto.JobRunParamDTO;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

/**
 * @author zhuhuipei
 * @Description:
 * @date 2020-09-18
 * @time 00:56
 */
@Slf4j
public class CommandUtil {

  private static final String APP_CLASS_NAME = "com.flink.streaming.core.JobApplication";
  private static final String CDC_CLASS_NAME = "org.apache.flink.cdc.cli.FlinkApp";

  /**
   * 本地/Standalone Cluster模式
   *
   * @author zhuhuipei
   * @date 2020/11/1
   * @time 09:59
   */
  public static String buildRunCommandForCluster(JobRunParamDTO jobRunParamDTO,
      JobConfigDTO jobConfigDTO, String savepointPath, String address, String downloadUrl) throws Exception {
    StringBuilder command = new StringBuilder();
    command.append(jobRunParamDTO.getFlinkBinPath()).append(" run -d");

    if (StringUtils.isNotEmpty(address)) {
      command.append(" -m ").append(address);
    }

    if (StringUtils.isNotEmpty(savepointPath)) {
      command.append(" -s ").append(savepointPath);
    }

    if (jobConfigDTO.getDeployModeEnum() == DeployModeEnum.STANDALONE) {
      command.append(" ").append(jobConfigDTO.getFlinkRunConfig());
    }

    if (StringUtils.isNotEmpty(jobConfigDTO.getExtJarPath())) {
      List<String> urlJarsList = jobConfigDTO.getExtJarPathUrl(downloadUrl);
      for (String url : urlJarsList) {
        command.append(" -C ").append(url.trim());
      }
    }
    switch (jobConfigDTO.getJobTypeEnum()) {
      case SQL_BATCH:
      case SQL_STREAMING:
        command.append(" -c ").append(APP_CLASS_NAME);
        command.append(" ").append(jobRunParamDTO.getSysHome()).append(SystemConstant.JARVERSION);
        command.append(" -sql ").append(jobRunParamDTO.getSqlPath());
        if (StringUtils.isNotEmpty(jobRunParamDTO.getFlinkCheckpointConfig())) {
          command.append(" ").append(jobRunParamDTO.getFlinkCheckpointConfig());
        }
        command.append(" -type ").append(jobConfigDTO.getJobTypeEnum().getCode());
        break;
      case CDC_STREAMING:
        command.append(" -c ").append(CDC_CLASS_NAME);
        command.append(" ").append(jobRunParamDTO.getSysHome()).append(SystemConstant.CDC_JARVERSION);
        command.append(" ").append(jobRunParamDTO.getSqlPath());
        if (StringUtils.isNotEmpty(jobRunParamDTO.getFlinkCheckpointConfig())) {
          command.append(" ").append(jobRunParamDTO.getFlinkCheckpointConfig());
        }
        break;
      case JAR:
        command.append(" -c ").append(jobConfigDTO.getCustomMainClass());
        command.append(" ").append(jobRunParamDTO.getMainJarPath());
        command.append(" ").append(jobConfigDTO.getCustomArgs());
        break;
      default:
        log.warn("不支持的模式 {}", jobConfigDTO.getJobTypeEnum());
    }

    log.info("buildRunCommandForLocal runCommand={}", command);
    return command.toString();
  }

  /**
   * jar并且构建运行命令
   *
   * @author zhuhuipei
   * @date 2020-09-18
   * @time 00:57
   */
  public static String buildRunCommandForYarnCluster(JobRunParamDTO jobRunParamDTO,
      JobConfigDTO jobConfigDTO, String savepointPath, String downloadUrl) throws Exception {
    StringBuilder command = new StringBuilder();
    command.append(jobRunParamDTO.getFlinkBinPath());
    if (DeployModeEnum.YARN_APPLICATION == jobConfigDTO.getDeployModeEnum()) {
      command.append("  run-application -t yarn-application  ");
    } else {
      command.append(" run -d -t yarn-per-job ");
    }

    if (StringUtils.isNotEmpty(savepointPath)) {
      command.append(" -s ").append(savepointPath);
    }
    command.append(" ").append(jobRunParamDTO.getFlinkRunParam());
    command.append(" -Dyarn.application.name=")
        .append(JobConfigDTO.buildRunName(jobConfigDTO.getJobName()));


    if (StringUtils.isNotEmpty(jobConfigDTO.getExtJarPath())) {
      List<String> urlJarsList = jobConfigDTO.getExtJarPathUrl(downloadUrl);
      for (String url : urlJarsList) {
        command.append(" -C ").append(url.trim());
      }
    }

    switch (jobConfigDTO.getJobTypeEnum()) {
      case SQL_STREAMING:
      case SQL_BATCH:
        command.append(" -c ").append(APP_CLASS_NAME);
        command.append(" ").append(jobRunParamDTO.getSysHome()).append(SystemConstant.JARVERSION);
        command.append(" -sql ").append(jobRunParamDTO.getSqlUrl());
        if (StringUtils.isNotEmpty(jobRunParamDTO.getFlinkCheckpointConfig())) {
          command.append(" ").append(jobRunParamDTO.getFlinkCheckpointConfig());
        }
        command.append(" -type ").append(jobConfigDTO.getJobTypeEnum().getCode());
        break;
      case CDC_STREAMING:
        command.append(" -c ").append(CDC_CLASS_NAME);
        command.append(" ").append(jobRunParamDTO.getSysHome()).append(SystemConstant.CDC_JARVERSION);
        command.append(" ").append(jobRunParamDTO.getSqlPath());
        if (StringUtils.isNotEmpty(jobRunParamDTO.getFlinkCheckpointConfig())) {
          command.append(" ").append(jobRunParamDTO.getFlinkCheckpointConfig());
        }
        break;
      case JAR:
        command.append(" -c ").append(jobConfigDTO.getCustomMainClass());
        command.append(" ").append(jobRunParamDTO.getMainJarPath());
        command.append(" ").append(jobConfigDTO.getCustomArgs());
        break;
      default:
        log.warn("不支持的模式 {}", jobConfigDTO.getJobTypeEnum());
    }

    log.info("buildRunCommandForYarnCluster runCommand={}", command.toString());
    return command.toString();
  }


  public static String buildSavepointCommandForYarn(String jobId, String targetDirectory,
      String yarnAppId,
      String flinkHome) {
    StringBuilder command = new StringBuilder(
        SystemConstants.buildFlinkBin(flinkHome));
    command.append(" savepoint ")
        .append(jobId).append(" ")
        .append(targetDirectory).append(" ")
        .append("-yid ").append(yarnAppId);
    return command.toString();
  }


  public static String buildSavepointCommandForCluster(String jobId, String targetDirectory,
      String flinkHome) {
    StringBuilder command = new StringBuilder(
        SystemConstants.buildFlinkBin(flinkHome));
    command.append(" savepoint ")
        .append(jobId).append(" ")
        .append(targetDirectory).append(" ");
    return command.toString();
  }


}
