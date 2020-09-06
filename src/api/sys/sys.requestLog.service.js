import request from '@/utils/request'
/**
 * 添加日志管理
 * @param {*} data
 */
export function save(data) {
  return request({
    url: '/sys/requestLog/save',
    method: 'post',
    data
  })
}
/**
 * 修改日志管理
 * @param {*} data
 */
export function update(data) {
  return request({
    url: '/sys/requestLog/update',
    method: 'post',
    data
  })
}
/**
 * 删除日志管理
 * @param {*} data
 */
export function remove(data) {
  return request({
    url: '/sys/requestLog/remove',
    method: 'post',
    data
  })
}
/**
 * 通过id获取日志管理
 * @param {*} data
 */
export function get(data) {
  return request({
    url: '/sys/requestLog/get',
    method: 'post',
    data
  })
}
/**
 * 分页查询日志管理列表
 * @param {*} data
 */
export function list(data) {
  return request({
    url: '/sys/requestLog/list',
    method: 'post',
    data
  })
}
