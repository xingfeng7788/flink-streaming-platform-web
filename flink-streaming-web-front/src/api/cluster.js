import request from '@/utils/request'
import Qs from 'qs'

/**
 * 查询集群列表
 * @param {*} pageNum
 * @param {*} pageSize
 * @param {集群名称} clusterName
 * @param {主节点IP} clusterMasterIp
 * @returns
 */
export function clusterList(pageNum, pageSize, clusterName, clusterMasterIp) {
  return request({
    url: '/listCluster',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    transformRequest: [function(data) { return Qs.stringify(data) }],
    data: {
      pageNum: pageNum,
      pageSize: pageSize,
      clusterName: clusterName,
      clusterMasterIp: clusterMasterIp
    }
  })
}

/**
 * 删除集群
 * @param {集群编号} id
 * @returns
 */
export function deleteCluster(id) {
  return request({
    url: '/delCluster',
    method: 'get',
    params: {
      id: id
    }
  })
}

/**
 * 新增任务
 * @param {集群对象} data
 * clusterName: ''
 * clusterMasterIp: ''
 * yarnRmPort: ''
 * flinkHttpPort: ''
 * flinkUiPort:  ''
 * flinkHaHttpPort: ''
 * remark: ''
 * @returns
 */
export function addCluster(data) {
  return request({
    url: '/addCluster',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    transformRequest: [function(data) { return Qs.stringify(data) }],
    data: data
  })
}

/**
 * 修改集群
 * @param {集群对象} data
 * id: 1
 * clusterName: ''
 * clusterMasterIp: ''
 * yarnRmPort: ''
 * flinkHttpPort: ''
 * flinkUiPort:  ''
 * flinkHaHttpPort: ''
 * remark: ''
 * @returns
 */
export function editCluster(data) {
  return request({
    url: '/editCluster',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    transformRequest: [function(data) { return Qs.stringify(data) }],
    data: data
  })
}
