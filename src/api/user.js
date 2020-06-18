import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data: {
      userName: data.username,
      password: data.password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/sys/user/info',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/sys/logout',
    method: 'post'
  })
}
