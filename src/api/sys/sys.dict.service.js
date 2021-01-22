import request from '@/utils/request'
/**
 * 添加字典
 * @param {*} data
 */
export function save(data) {
  return request({
    url: '/sys/dict/save',
    method: 'post',
    data
  })
}
/**
 * 修改字典
 * @param {*} data
 */
export function update(data) {
  return request({
    url: '/sys/dict/update',
    method: 'post',
    data
  })
}
/**
 * 删除字典
 * @param {*} data
 */
export function remove(data) {
  return request({
    url: '/sys/dict/remove',
    method: 'post',
    data
  })
}
/**
 * 通过id获取字典
 * @param {*} data
 */
export function get(data) {
  return request({
    url: '/sys/dict/get',
    method: 'post',
    data
  })
}
/**
 * 分页查询字典列表
 * @param {*} data
 */
export function list(data) {
  return request({
    url: '/sys/dict/list',
    method: 'post',
    data
  })
}
/**
 * 获取所有字典枚举
 * @param {*} data
 */
export function listAllEnum() {
  return request({
    url: '/sys/dict/listAllEnum',
    method: 'post'
  })
}
