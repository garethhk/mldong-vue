import request from '@/utils/request'
/**
 * 添加岗位
 * @param {*} data
 */
export function save(data) {
  return request({
    url: '/sys/post/save',
    method: 'post',
    data
  })
}
/**
 * 修改岗位
 * @param {*} data
 */
export function update(data) {
  return request({
    url: '/sys/post/update',
    method: 'post',
    data
  })
}
/**
 * 删除岗位
 * @param {*} data
 */
export function remove(data) {
  return request({
    url: '/sys/post/remove',
    method: 'post',
    data
  })
}
/**
 * 通过id获取岗位
 * @param {*} data
 */
export function get(data) {
  return request({
    url: '/sys/post/get',
    method: 'post',
    data
  })
}
/**
 * 分页查询岗位列表
 * @param {*} data
 */
export function list(data) {
  return request({
    url: '/sys/post/list',
    method: 'post',
    data
  })
}
