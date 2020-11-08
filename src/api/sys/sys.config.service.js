import request from '@/utils/request'
/**
 * 添加参数
 * @param {*} data
 */
export function save(data) {
  return request({
    url: '/sys/config/save',
    method: 'post',
    data
  })
}
/**
 * 修改参数
 * @param {*} data
 */
export function update(data) {
  return request({
    url: '/sys/config/update',
    method: 'post',
    data
  })
}
/**
 * 删除参数
 * @param {*} data
 */
export function remove(data) {
  return request({
    url: '/sys/config/remove',
    method: 'post',
    data
  })
}
/**
 * 通过id获取参数
 * @param {*} data
 */
export function get(data) {
  return request({
    url: '/sys/config/get',
    method: 'post',
    data
  })
}
/**
 * 分页查询参数列表
 * @param {*} data
 */
export function list(data) {
  return request({
    url: '/sys/config/list',
    method: 'post',
    data
  })
}
