import request from '@/utils/request'
/**
 * 添加部门
 * @param {*} data
 */
export function save(data) {
  return request({
    url: '/sys/dept/save',
    method: 'post',
    data
  })
}
/**
 * 修改部门
 * @param {*} data
 */
export function update(data) {
  return request({
    url: '/sys/dept/update',
    method: 'post',
    data
  })
}
/**
 * 删除部门
 * @param {*} data
 */
export function remove(data) {
  return request({
    url: '/sys/dept/remove',
    method: 'post',
    data
  })
}
/**
 * 通过id获取部门
 * @param {*} data
 */
export function get(data) {
  return request({
    url: '/sys/dept/get',
    method: 'post',
    data
  })
}
/**
 * 分页查询部门列表
 * @param {*} data
 */
export function list(data) {
  return request({
    url: '/sys/dept/list',
    method: 'post',
    data
  })
}
