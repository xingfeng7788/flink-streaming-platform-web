<template>
  <div v-loading="loading">
    <div v-if="subPageFlag==false" :class="backFlag ? 'fl-container2' : 'fl-container'">
      <el-tooltip v-if="backFlag == true" class="item" effect="dark" content="返回" placement="right">
        <i ref="backbutton" class="el-icon-d-arrow-left fl-back" @click="handleBack()" />
      </el-tooltip>
      <!-- 查询 -->
      <el-form ref="queryform" :model="queryform" :inline="true">
        <el-form-item>
          <el-input v-model="queryform.clusterName" placeholder="集群名称" class="wl-input" @input="handleQuery()" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryform.clusterMasterIp" placeholder="IP" class="wl-input" @input="handleQuery()" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="el-icon-search" @click="handleQuery()">查询</el-button>
          <el-button type="primary" class="el-icon-plus" @click="handleAdd()">新增</el-button>
        </el-form-item>
      </el-form>
      <!-- 列表 -->
      <el-table :data="list" :header-cell-style="{ background: '#f4f4f5', 'text-align': 'center' }" class="wl-table"
        border>
        <el-table-column prop="id" :show-overflow-tooltip="true" label="编号" min-width="60" width="80" align="center"
          fixed />
        <el-table-column prop="clusterName" :show-overflow-tooltip="true" label="集群名称" min-width="100" align="center"
          fixed />
        <el-table-column prop="clusterMasterIp" :show-overflow-tooltip="true" label="主节点IP" width="130"
          align="center" />
        <el-table-column prop="yarnRmPort" :show-overflow-tooltip="true" label="yarnRM端口" width="105" align="center" />
        <el-table-column prop="flinkHttpPort" :show-overflow-tooltip="true" label="flinnkHttp端口" width="105" align="center" />
        <el-table-column prop="flinkUiPort" :show-overflow-tooltip="true" label="flinkUI端口" width="105" align="center" />
        <el-table-column prop="flinkHaHttpPort" :show-overflow-tooltip="true" label="flinkHA服务端口" width="105"
          align="center" />
        <el-table-column prop="clusterStatus" :show-overflow-tooltip="true" label="集群状态" width="80" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.clusterStatus === 1" type="success">运行中</el-tag>
            <el-tag v-else type="danger">停止</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" :show-overflow-tooltip="true" label="集群备注" min-width="100" />
        <el-table-column prop="operate" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <router-link
              :to="{ name: 'UpdateClusterCfg', params: { flag: 'update', context: queryContent(), data: scope.row } }">
              <el-link type="primary" icon="el-icon-edit-outline">修改</el-link>
            </router-link>
            <el-link type="danger" icon="el-icon-delete" @click.native="deleteCluster(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="pageshow" class="wl-pagination" background layout="total, sizes, prev, pager, next"
        :current-page="currentPage" :page-sizes="[10, 15, 20, 50, 100, 150, 200]" :page-size="pageSize" :total="count"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <!-- 子菜单路由 -->
    <router-view/>
  </div>
</template>

<script>
import { clusterList, deleteCluster } from '@/api/cluster'

export default {
  name: 'ClusterCfg',
  data() {
    return {
      loading: false,
      subPageFlag: false, // 当打开子菜单时，当前页内屏蔽
      backFlag: false,
      params: {
        flag: '', // tasklist
        data: {},
        context: '' // 父页面传递过来的参加，返回时带给父页面恢复上下文
      },
      queryform: {
        clusterName: '',
        clusterMasterIp: ''
      },
      list: [],
      count: 0,
      pageSize: 15,
      currentPage: 1,
      pageshow: true
    }
  },
  mounted() {
    if (this.$route.name === 'ClusterCfg') {
      this.subPageFlag = false
      const params = this.$route.params
      if (params) {
        this.queryform.clusterName = (params.clusterName) ? params.clusterName : ''
        this.queryform.clusterMasterIp = (params.clusterMasterIp) ? params.clusterMasterIp : ''
        if (params.currentPage) { // 恢复分页状态
          this.count = params.count
          this.currentPage = params.currentPage
          this.pageSize = params.pageSize
        }
      }
      this.handleQuery()
    } else {
      this.subPageFlag = true
    }
  },
  methods: {
    handleBack() { // 返回
      // this.$router.replace({ name: 'FlinkTaskManage', params: this.params.context })
      this.$router.go(-1)
    },
    queryContent() {
      return {
        count: this.count,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        clusterName: this.queryform.clusterName,
        clusterMasterIp: this.queryform.clusterMasterIp
      }
    },
    handleQuery(event) { // 查询
      this.pageshow = false
      this.getCluster()
      this.$nextTick(() => { this.pageshow = true }) // 解决界面页码不更新问题
    },
    handleSizeChange(pageSize) { // 设置分页大小事件
      this.pageSize = pageSize
      this.handleQuery()
    },
    handleCurrentChange(pageno) { // 处理分页事件
      this.currentPage = pageno
      this.handleQuery()
    },
    getCluster() { // 查询集群列表
      this.loading = true
      const clusterName = this.queryform.clusterName ? this.queryform.clusterName.trim() : ''
      const clusterMasterIp = this.queryform.clusterMasterIp ? this.queryform.clusterMasterIp.trim() : ''
      clusterList(this.currentPage, this.pageSize, clusterName, clusterMasterIp).then(response => {
        this.loading = false
        const { code, success, message, data } = response
        if (code !== '200' || !success) {
          this.$message({ type: 'error', message: (message || '请求数据异常！') })
          return
        }
        this.list = data.data
        this.count = data.total
        if (this.count > 0 && this.list.length == 0) { // 调整PageNo
          this.currentPage = Math.ceil(this.count / this.pageSize)
          this.getCluster()
        }
      }).catch(error => {
        this.loading = false
        this.$message({ type: 'error', message: '请求异常！' })
        console.log(error)
      })
    },
    deleteCluster(row) { // 删除
      const { id, clusterName } = row
      this.$confirm(`确定要删除[${clusterName}]吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deleteCluster(id).then(response => {
          this.loading = false
          const { code, success, message, data } = response
          if (code !== '200' || !success) {
            this.$message({ type: 'error', message: (message || '请求数据异常！') })
            return
          }
          this.handleQuery()
          this.$message({ type: 'success', message: `删除[${clusterName}]成功！` })
        }).catch(error => {
          this.loading = false
          this.$message({ type: 'error', message: '请求异常！' })
          console.log(error)
        })
      })
    },
    handleAdd() {
      this.$router.replace({
        name: 'CreateClusterCfg',
        params: {
          flag: 'create',
          context: this.queryContent(),
          data: {}
        }
      })
    }
  }
}
</script>

<style scoped>
.fl-container {
  margin: 20px;
}

.fl-container2 {
  margin: 0px 20px 20px 20px;
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

.fl-container>>>.el-form-item {
  margin-bottom: 5px !important;
}

.fl-container2>>>.el-form-item {
  margin-bottom: 5px !important;
}

.wl-pagination {
  margin-top: 5px;
}
</style>
