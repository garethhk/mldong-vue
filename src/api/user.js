import request from '@/utils/request'
/**
 * 登录
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data: {
      userName: data.userName,
      password: data.password
    },
    params: {
      captchaCode: data.captchaCode,
      uuid: data.uuid
    }
  })
}
/**
 * 获取用户信息
 * @param {*} token
 */
export function getInfo(token) {
  return request({
    url: '/sys/user/info',
    method: 'post'
  })
}
/**
 * 退出
 */
export function logout() {
  return request({
    url: '/sys/logout',
    method: 'post'
  })
}
/**
 * 获取图片验证码
 */
export function captchaImage() {
  return request({
    url: '/captchaImage',
    method: 'post'
  })
}
