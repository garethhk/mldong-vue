import request from '@/utils/request'
/**
 * 添加文章
 * @param {*} data
 */
export function save(data) {
  return request({
    url: '/cms/article/save',
    method: 'post',
    data
  })
}
/**
 * 修改文章
 * @param {*} data
 */
export function update(data) {
  return request({
    url: '/cms/article/update',
    method: 'post',
    data
  })
}
/**
 * 删除文章
 * @param {*} data
 */
export function remove(data) {
  return request({
    url: '/cms/article/remove',
    method: 'post',
    data
  })
}
/**
 * 通过id获取文章
 * @param {*} data
 */
export function get(data) {
  return request({
    url: '/cms/article/get',
    method: 'post',
    data
  })
}
/**
 * 分页查询文章列表
 * @param {*} data
 */
export function list(data) {
  return request({
    url: '/cms/article/list',
    method: 'post',
    data
  })
}
/**
 * 通过id获取文章-包含扩展信息
 * @param {*} data
 */
export function getWithExt(data) {
  return request({
    url: '/cms/article/getWithExt',
    method: 'post',
    data
  })
}
/**
 * 分页查询文章列表-包含扩展信息
 * @param {*} data
 */
export function listWithExt(data) {
  return request({
    url: '/cms/article/listWithExt',
    method: 'post',
    data
  })
}
