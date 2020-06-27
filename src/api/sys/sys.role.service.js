import request from '@/utils/request'
/**
 * 添加角色
 * @param {*} data
 */
export function save(data) {
  return request({
    url: '/sys/role/save',
    method: 'post',
    data
  })
}
/**
 * 修改角色
 * @param {*} data
 */
export function update(data) {
  return request({
    url: '/sys/role/update',
    method: 'post',
    data
  })
}
/**
 * 删除角色
 * @param {*} data
 */
export function remove(data) {
  return request({
    url: '/sys/role/remove',
    method: 'post',
    data
  })
}
/**
 * 通过id获取角色
 * @param {*} data
 */
export function get(data) {
  return request({
    url: '/sys/role/get',
    method: 'post',
    data
  })
}
/**
 * 分页查询角色列表
 * @param {*} data
 */
export function list(data) {
  return request({
    url: '/sys/role/list',
    method: 'post',
    data
  })
}
