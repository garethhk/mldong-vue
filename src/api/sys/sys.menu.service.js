import request from '@/utils/request'
/**
 * 添加菜单
 * @param {*} data
 */
export function save(data) {
  return request({
    url: '/sys/menu/save',
    method: 'post',
    data
  })
}
/**
 * 修改菜单
 * @param {*} data
 */
export function update(data) {
  return request({
    url: '/sys/menu/update',
    method: 'post',
    data
  })
}
/**
 * 删除菜单
 * @param {*} data
 */
export function remove(data) {
  return request({
    url: '/sys/menu/remove',
    method: 'post',
    data
  })
}
/**
 * 通过id获取菜单
 * @param {*} data
 */
export function get(data) {
  return request({
    url: '/sys/menu/get',
    method: 'post',
    data
  })
}
/**
 * 分页查询菜单列表
 * @param {*} data
 */
export function list(data) {
  return request({
    url: '/sys/menu/list',
    method: 'post',
    data
  })
}
