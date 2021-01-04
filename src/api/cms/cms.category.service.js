import request from '@/utils/request'
/**
 * 添加栏目
 * @param {*} data
 */
export function save(data) {
  return request({
    url: '/cms/category/save',
    method: 'post',
    data
  })
}
/**
 * 修改栏目
 * @param {*} data
 */
export function update(data) {
  return request({
    url: '/cms/category/update',
    method: 'post',
    data
  })
}
/**
 * 删除栏目
 * @param {*} data
 */
export function remove(data) {
  return request({
    url: '/cms/category/remove',
    method: 'post',
    data
  })
}
/**
 * 通过id获取栏目
 * @param {*} data
 */
export function get(data) {
  return request({
    url: '/cms/category/get',
    method: 'post',
    data
  })
}
/**
 * 分页查询栏目列表
 * @param {*} data
 */
export function list(data) {
  return request({
    url: '/cms/category/list',
    method: 'post',
    data
  })
}
