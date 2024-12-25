import Layout from '@/layout'

export const flinkRouter = [
  {
    path: '/flink/task-manage',
    redirect: 'noRedirect',
    name: 'TaskManage',
    meta: { title: '任务管理', icon: 'list' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'FlinkTaskManage',
        component: () => import('@/views/flink/task-manage/index'),
        meta: { title: '任务列表', icon: 'el-icon-star-off' },
        children: [
          {
            path: '/flink/task-manage/create_sql_streaming_task',
            name: 'CreateSqlStreamingTask',
            component: (resolve) => require([`@/views/flink/task-manage/sqltask.vue`], resolve),
            hidden: true,
            meta: { title: '创建SQL流任务' },
            children: []
          },
          {
            path: '/flink/task-manage/edit_sql_streaming_task',
            name: 'UpdateSqlStreamingTask',
            component: (resolve) => require([`@/views/flink/task-manage/sqltask.vue`], resolve),
            hidden: true,
            meta: { title: '编辑SQL流任务' },
            children: []
          },
          {
            path: '/flink/task-manage/view_sql_streaming_task',
            name: 'ViewSqlStreamingTask',
            component: (resolve) => require([`@/views/flink/task-manage/sqltask.vue`], resolve),
            hidden: true,
            meta: { title: '查看SQL流任务' },
            children: []
          },
          {
            path: '/flink/task-manage/create_sql_batch_task',
            name: 'CreateSqlBatchTask',
            component: (resolve) => require([`@/views/flink/task-manage/sqltask.vue`], resolve),
            hidden: true,
            meta: { title: '创建SQL批任务' },
            children: []
          },
          {
            path: '/flink/task-manage/edit_sql_batch_task',
            name: 'UpdateSqlBatchTask',
            component: (resolve) => require([`@/views/flink/task-manage/sqltask.vue`], resolve),
            hidden: true,
            meta: { title: '编辑SQL批任务' },
            children: []
          },
          {
            path: '/flink/task-manage/view_sql_batch_task',
            name: 'ViewSqlBatchTask',
            component: (resolve) => require([`@/views/flink/task-manage/sqltask.vue`], resolve),
            hidden: true,
            meta: { title: '查看SQL批任务' },
            children: []
          },
          {
            path: '/flink/task-manage/create_jar_task',
            name: 'CreateJarTask',
            component: (resolve) => require([`@/views/flink/task-manage/jartask.vue`], resolve),
            hidden: true,
            meta: { title: '创建JAR任务' },
            children: []
          },
          {
            path: '/flink/task-manage/edit_jar_task',
            name: 'UpdateJarTask',
            component: (resolve) => require([`@/views/flink/task-manage/jartask.vue`], resolve),
            hidden: true,
            meta: { title: '编辑JAR批任务' },
            children: []
          },
          {
            path: '/flink/task-manage/view_jar_task',
            name: 'ViewJarTask',
            component: (resolve) => require([`@/views/flink/task-manage/jartask.vue`], resolve),
            hidden: true,
            meta: { title: '查看JAR批任务' },
            children: []
          },
          {
            path: '/flink/log-manage/view_logdetail',
            name: 'ViewTaskLogDetail',
            component: (resolve) => require([`@/views/flink/log-manage/logdetail.vue`], resolve),
            hidden: true,
            meta: { title: '查看日志详情' },
            children: []
          },
          {
            path: '/flink/task-manage/create_cdc_streaming_task',
            name: 'CreateCdcStreamingTask',
            component: (resolve) => require([`@/views/flink/task-manage/cdctask.vue`], resolve),
            hidden: true,
            meta: { title: '创建cdc任务' },
            children: []
          },
          {
            path: '/flink/task-manage/edit_cdc_streaming_task',
            name: 'UpdateCdcStreamingTask',
            component: (resolve) => require([`@/views/flink/task-manage/cdctask.vue`], resolve),
            hidden: true,
            meta: { title: '编辑cdc流任务' },
            children: []
          },
          {
            path: '/flink/task-manage/view_cdc_streaming_task',
            name: 'ViewCdcStreamingTask',
            component: (resolve) => require([`@/views/flink/task-manage/cdctask.vue`], resolve),
            hidden: true,
            meta: { title: '查看cdc流任务' },
            children: []
          },
        ]
      },
      {
        path: '/flink/task-manage/history',
        name: 'HistoryTask',
        component: (resolve) => require([`@/views/flink/task-manage/history.vue`], resolve),
        meta: { title: '历史版本', icon: 'el-icon-tickets' },
        children: [
          {
            path: '/flink/task-manage/view_sql_streaming_task',
            name: 'ViewHistorySqlStreamingTask',
            component: (resolve) => require([`@/views/flink/task-manage/sqltask.vue`], resolve),
            hidden: true,
            meta: { title: '查看SQL流任务' },
            children: []
          },
          {
            path: '/flink/task-manage/view_sql_batch_task',
            name: 'ViewHistorySqlBatchTask',
            component: (resolve) => require([`@/views/flink/task-manage/sqltask.vue`], resolve),
            hidden: true,
            meta: { title: '查看SQL批任务' },
            children: []
          },
          {
            path: '/flink/task-manage/view_jar_task',
            name: 'ViewHistoryJarTask',
            component: (resolve) => require([`@/views/flink/task-manage/jartask.vue`], resolve),
            hidden: true,
            meta: { title: '查看JAR批任务' },
            children: []
          }
        ]
      }
    ]
  },
  {
    path: '/flink/log-manage',
    name: 'LogManage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'FlinkLogManage',
        component: () => import('@/views/flink/log-manage/index'),
        meta: { title: '运行日志', icon: 'documentation' },
        children: [
          {
            path: '/flink/log-manage/view_logdetail',
            name: 'ViewLogDetail',
            component: (resolve) => require([`@/views/flink/log-manage/logdetail.vue`], resolve),
            hidden: true,
            meta: { title: '查看日志详情' },
            children: []
          }
        ]
      }
    ]
  },
  {
    path: '/walle/alarm-manage',
    redirect: 'noRedirect',
    name: 'AlarmManage',
    meta: { title: '告警管理', icon: 'el-icon-message-solid' },
    component: Layout,
    children: [
      {
        path: '/walle/alarm/alarmcfg',
        name: 'AlarmCfg',
        component: () => import('@/views/flink/alarm-manage/alarmcfg.vue'),
        meta: { title: '告警设置', icon: 'el-icon-s-tools' }
      },
      {
        path: '/walle/alarm/logs',
        name: 'AlarmLogs',
        component: () => import('@/views/flink/alarm-manage/index.vue'),
        meta: { title: '告警日志', icon: 'el-icon-document' }
      }
    ]
  },
  {
    path: '/flink/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'UserManage',
        meta: { title: '用户管理', icon: 'el-icon-user' },
        component: () => import('@/views/flink/user-manage')
      }
    ]
  },
  {
    path: '/flink/jarManage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'jarManage',
        meta: { title: '三方jar管理', icon: 'el-icon-upload' },
        component: () => import('@/views/flink/upload')
      }
    ]
  },
  {
    path: '/flink/system-manage',
    redirect: 'noRedirect',
    name: 'SystemManage',
    meta: { title: '系统设置', icon: 'el-icon-setting' },
    component: Layout,
    children: [
      {
        path: '/flink/system-manage/index',
        name: 'SystemCfg',
        component: () => import('@/views/flink/system-manage/index.vue'),
        meta: { title: '全局配置', icon: 'el-icon-s-tools' }
      },
      {
        path: '/flink/system-manage/clustercfg',
        name: 'ClusterCfg',
        component: () => import('@/views/flink/system-manage/clustercfg.vue'),
        meta: { title: '集群配置', icon: 'el-icon-s-tools' },
        children: [
          {
            path: '/flink/system-manage/create_cluster_cfg',
            name: 'CreateClusterCfg',
            component: (resolve) => require([`@/views/flink/system-manage/clustercfgmaintain.vue`], resolve),
            hidden: true,
            meta: { title: '创建集群配置' },
            children: []
          },
          {
            path: '/flink/system-manage/edit_cluster_cfg',
            name: 'UpdateClusterCfg',
            component: (resolve) => require([`@/views/flink/system-manage/clustercfgmaintain.vue`], resolve),
            hidden: true,
            meta: { title: '编辑集群配置' },
            children: []
          }
        ]
      }
    ]
  }
]
