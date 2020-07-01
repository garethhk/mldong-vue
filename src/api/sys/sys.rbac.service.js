import request from '@/utils/request'
/**
 * 删除角色权限资源关系
 * @param {*} data
 */
export function deleteRoleAccess(data) {
  return request({
    url: '/sys/rbac/deleteRoleAccess',
    method: 'post',
    data
  })
}
/**
 * 删除角色菜单关系
 * @param {*} data
 */
export function deleteRoleMenu(data) {
  return request({
    url: '/sys/rbac/deleteRoleMenu',
    method: 'post',
    data
  })
}
/**
 * 从角色中移除用户
 * @param {*} data
 */
export function deleteUserRole(data) {
  return request({
    url: '/sys/rbac/deleteUserRole',
    method: 'post',
    data
  })
}
/**
 * 获取权限资源树
 * @param {*} data
 */
export function listAccessTree(data) {
  return request({
    url: '/sys/rbac/listAccessTree',
    method: 'post',
    data
  })
}
/**
 * 通过角色id获取菜单
 * @param {*} data
 */
export function listMenuByRoleId(data) {
  return request({
    url: '/sys/rbac/listMenuByRoleId',
    method: 'post',
    data
  })
}
/**
 * 角色成员列表
 * @param {*} data
 */
export function listUserByRoleId(data) {
  return request({
    url: '/sys/rbac/listUserByRoleId',
    method: 'post',
    data
  })
}
/**
 * 查询未加入指定角色的用户列表
 * @param {*} data
 */
export function listUserNoInRole(data) {
  return request({
    url: '/sys/rbac/listUserNoInRole',
    method: 'post',
    data
  })
}
/**
 * 保存角色权限资源关系
 * @param {*} data
 */
export function saveRoleAccess(data) {
  return request({
    url: '/sys/rbac/saveRoleAccess',
    method: 'post',
    data
  })
}
/**
 * 保存角色菜单关系
 * @param {*} data
 */
export function saveRoleMenu(data) {
  return request({
    url: '/sys/rbac/saveRoleMenu',
    method: 'post',
    data
  })
}
/**
 * 保存用户角色关系
 * @param {*} data
 */
export function saveUserRole(data) {
  return request({
    url: '/sys/rbac/saveUserRole',
    method: 'post',
    data
  })
}
