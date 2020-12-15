import request from '@/utils/request'
/**
 * 添加用户
 * @param {*} data
 */
export function save(data) {
  return request({
    url: '/sys/user/save',
    method: 'post',
    data
  })
}
/**
 * 修改用户
 * @param {*} data
 */
export function update(data) {
  return request({
    url: '/sys/user/update',
    method: 'post',
    data
  })
}
/**
 * 删除用户
 * @param {*} data
 */
export function remove(data) {
  return request({
    url: '/sys/user/remove',
    method: 'post',
    data
  })
}
/**
 * 通过id获取用户
 * @param {*} data
 */
export function get(data) {
  return request({
    url: '/sys/user/get',
    method: 'post',
    data
  })
}
/**
 * 分页查询用户列表
 * @param {*} data
 */
export function list(data) {
  return request({
    url: '/sys/user/list',
    method: 'post',
    data
  })
}
/**
 * 自定义分页查询用户列表
 * @param {*} data
 */
export function listWithExt(data) {
  return request({
    url: '/sys/user/listWithExt',
    method: 'post',
    data
  })
}
/** 获取当前用户信息
 * @param {Object} data
 */
export function getProfile() {
  return request({
    url: '/sys/user/getProfile',
    method: 'post'
  })
}
/** 修改密码
 * @param {Object} data
 */
export function updatePwd(data) {
  return request({
    url: '/sys/user/updatePwd',
    method: 'post',
    data
  })
}
/** 修改头像
 * @param {Object} data
 */
export function uploadAvatar(data) {
  return request({
    url: '/sys/user/uploadAvatar',
    method: 'post',
    data
  })
}
/** 修改个人信息
 * @param {Object} data
 */
export function updateProfile(data) {
  return request({
    url: '/sys/user/updateProfile',
    method: 'post',
    data
  })
}
