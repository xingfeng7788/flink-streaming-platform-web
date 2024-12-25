<template>
  <div v-loading="loading"
    :class="'fl-jarcluster-container fl-cluster-edit'+(isReadOnly?' fl-cluster-edit__isRead':'')">
    <el-tooltip class="item" effect="dark" content="返回" placement="right">
      <i ref="backbutton" class="el-icon-d-arrow-left fl-back" @click="handleBack()" />
    </el-tooltip>
    <el-form ref="clusterform" :model="form" :rules="rules" :disabled="isReadOnly" label-width="150px" size="small">
      <el-row v-if="$route.name === 'UpdateClusterCfg'">
        <el-col :span="18">
          <el-form-item label="编号" prop="id">
            <el-input v-model="form.id" placeholder="集群编号" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="集群名称" prop="clusterName">
            <el-input v-model="form.clusterName" placeholder="请输入集群名称(必填)" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="主节点IP" prop="clusterMasterIp">
            <el-input v-model="form.clusterMasterIp" placeholder="请输入主节点IP(必填) flink管理平台部署IP" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="Yarn RM Http地址">
            <el-input v-model="form.yarnRmPort" placeholder="yarn-per-job 和 yarn-application模式必选, aws yarn Resource Manager 默认端口 8088" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="Flink服务HTTP地址">
            <el-input v-model="form.flinkHttpPort" placeholder="Flink Rest & web frontend 地址(Local Cluster模式)" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="Flink-UI端口">
            <el-input v-model="form.flinkUiPort" placeholder="Flink-UI端口,aws flink WEB UI 默认端口 28888" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="HA服务HTTP端口">
            <el-input v-model="form.flinkHaHttpPort" placeholder="Flink Rest & web frontend HA 端口" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="集群备注">
            <el-input v-model="form.remark" placeholder="请输入集群备注" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="isReadOnly===false" class="fl-button-row">
        <el-col :span="24">
          <el-form-item label="">
            <el-button type="primary" @click="submitcluster()">提 交</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { addCluster, editCluster } from '@/api/cluster'

export default {
  name: 'Jarcluster',
  data() {
    return {
      loading: false,
      params: {
        flag: '', // create,update,view
        data: {},
        context: '' // 父页面传递过来的参加，返回时带给父页面恢复上下文
      },
      isReadOnly: false,
      form: {
        id: '',
        clusterName: '',
        clusterMasterIp: '',
        yarnRmPort: '',
        flinkHttpPort: '',
        flinkUiPort: '',
        flinkHaHttpPort: '',
        remark: ''
      },
      rules: {
        clusterName: [{ required: true, message: '请输入集群名称', trigger: 'blur' }],
        clusterMasterIp: [{ required: true, message: '请输入主节点IP', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    const params = this.$route.params
    this.params.flag = params.flag
    this.params.context = params.context
    this.params.data = params.data || {}
    const cluster = params.data
    this.isReadOnly = !(params.flag === 'create' || params.flag === 'update')

    this.form.id = cluster.id ? cluster.id : ''
    this.form.clusterName = cluster.clusterName ? cluster.clusterName : ''
    this.form.clusterMasterIp = cluster.clusterMasterIp ? cluster.clusterMasterIp : ''
    this.form.yarnRmPort = cluster.yarnRmPort ? cluster.yarnRmPort : ''
    this.form.flinkHttpPort = cluster.flinkHttpPort ? cluster.flinkHttpPort : ''
    this.form.flinkUiPort = cluster.flinkUiPort ? cluster.flinkUiPort : ''
    this.form.flinkHaHttpPort = cluster.flinkHaHttpPort ? cluster.flinkHaHttpPort : ''
    this.form.remark = cluster.remark ? cluster.remark : ''
  },
  methods: {
    handleBack() { // 返回
      // const routerName = this.params.flag === 'history' ? 'Historycluster' : 'FlinkclusterManage'
      this.$router.replace({ name: 'ClusterCfg', params: this.params.context })
    },
    submitcluster() { // 提交修改、新建表单
      this.$refs.clusterform.validate((valid) => {
        if (valid) {
          const clusterName = this.form.clusterName
          const data = {
            id: this.form.id,
            clusterName: this.form.clusterName,
            clusterMasterIp: this.form.clusterMasterIp,
            yarnRmPort: this.form.yarnRmPort,
            flinkHttpPort: this.form.flinkHttpPort,
            flinkUiPort: this.form.flinkUiPort,
            flinkHaHttpPort: this.form.flinkHaHttpPort,
            remark: this.form.remark
          }
          if (!data.id && this.params.flag === 'create') {
            addCluster(data).then(response => {
              this.loading = false
              const { code, data, success, message } = response
              if (code !== '200' || !success) {
                this.$message({ type: 'error', message: (message || '请求数据异常！') })
                return
              }
              this.$message({ type: 'success', message: `新增集群[${clusterName}]成功！` })
              this.$refs.backbutton.click()
            }).catch(error => {
              this.loading = false
              this.$message({ type: 'error', message: '请求异常！' })
              console.log(error)
            })
          } else if (data.id && this.params.flag === 'update') {
            editCluster(data).then(response => {
              this.loading = false
              const { code, data, success, message } = response
              if (code !== '200' || !success) {
                this.$message({ type: 'error', message: (message || '请求数据异常！') })
                return
              }
              this.$message({ type: 'success', message: `修改集群[${clusterName}]成功！` })
              this.$refs.backbutton.click()
            }).catch(error => {
              this.loading = false
              this.$message({ type: 'error', message: '请求异常！' })
              console.log(error)
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .fl-jarcluster-container {
    margin: 0px 20px;
  }
  .fl-back {
    color: #303133;
    font-size: 14px;
    margin-left: -20px;
    cursor: pointer;
  }
  .fl-back:hover {
    color: #a2a6af;
  }
  .fl-cluster-edit {
    box-sizing: border-box;
    background: #fff;
    min-height: calc(100% - 40px);
    /*max-width: 1160px;*/
  }
  .fl-cluster-edit >>> label {
    font-weight: 500;
  }
  .fl-cluster-edit >>> .el-form-item {
    margin-bottom: 15px!important;
  }
  .fl-alarm-row >>> .el-form-item {
    margin-top: -10px!important;
    margin-bottom: 0px!important;
  }
  .fl-cm-row__isRead >>> .el-form-item {
    margin-bottom: 0px!important;
  }
  .fl-button-row >>> .el-form-item {
    margin-bottom: 0px!important;
  }
  .fl-form-item {
    width: 100%;
  }
</style>
