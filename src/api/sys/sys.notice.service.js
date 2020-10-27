import request from '@/utils/request'
/**
 * 添加通知公告
 * @param {*} data
 */
export function save(data) {
  return request({
    url: '/sys/notice/save',
    method: 'post',
    data
  })
}
/**
 * 修改通知公告
 * @param {*} data
 */
export function update(data) {
  return request({
    url: '/sys/notice/update',
    method: 'post',
    data
  })
}
/**
 * 删除通知公告
 * @param {*} data
 */
export function remove(data) {
  return request({
    url: '/sys/notice/remove',
    method: 'post',
    data
  })
}
/**
 * 通过id获取通知公告
 * @param {*} data
 */
export function get(data) {
  return request({
    url: '/sys/notice/get',
    method: 'post',
    data
  })
}
/**
 * 分页查询通知公告列表
 * @param {*} data
 */
export function list(data) {
  return request({
    url: '/sys/notice/list',
    method: 'post',
    data
  })
}
