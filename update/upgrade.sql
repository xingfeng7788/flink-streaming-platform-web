drop table if exists `cluster`;
CREATE TABLE `cluster`
(
    `id`                bigint(11) unsigned NOT NULL AUTO_INCREMENT,
    `cluster_name`      varchar(255) not NULL COMMENT '集群名称',
    `cluster_master_ip` varchar(64)  NOT NULL COMMENT '集群主节点ip',
    `yarn_rm_port`      varchar(64)  default null COMMENT '集群yarn端口 默认8088',
    `flink_http_port`    varchar(64)  default null COMMENT 'flink http端口',
    `flink_ui_port`      varchar(64)  default null COMMENT '集群yarn端口 默认20888',
    `flink_ha_http_port` varchar(64)  COMMENT 'Flink HA服务HTTP地址',
    `remark`            text COMMENT '集群备注',
    PRIMARY KEY (`id`),
    UNIQUE KEY    `uk_index_cluster_master_ip` (`cluster_master_ip`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='flink集群表';

alter table  job_config add COLUMN cluster_id BIGINT(11) not null comment '集群编号';
alter table  job_config_history add COLUMN cluster_id BIGINT(11) not null comment '集群编号';
alter table  ip_status add COLUMN cluster_id BIGINT(11) not null comment '集群编号';

-- 添加一个环境变量 是否为master web, IS_MASTER_WEB=true