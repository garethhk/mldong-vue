import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // 存在token，就放到请求头中
      // 这里修改一下请求头与后端一致，X-Token->Auth-Token
      config.headers['Auth-Token'] = getToken()
    }
    if (config.data) {
      // 这里对全局的请求参数做处理，主要是拼接查询条件
      var whereParams = []
      Object.keys(config.data).forEach(item => {
        if (item.startsWith('m_')) {
          var value = config.data[item]
          if (value !== undefined) {
            var arr = item.split('_')
            if (arr.length === 3) {
              whereParams.push({
                operateType: arr[1],
                propertyName: arr[2],
                propertyValue: value
              })
            }
          }
          delete config.data[item]
        } else if (item.startsWith('mor_')) {
          // 处理简单的or语句
          value = config.data[item]
          arr = item.split('_')
          if (value !== undefined) {
            if (arr.length === 3) {
              whereParams.push({
                operateType: 'OR',
                propertyName: arr[2],
                propertyValue: {
                  operateType: arr[1],
                  propertyName: arr[2],
                  propertyValue: value
                }
              })
            }
          }
          delete config.data[item]
        }
      })
      if (whereParams.length) {
        config.data.whereParams = whereParams
      }
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // 这里做全局的返回数据处理
  response => {
    const res = response.data

    // 如果状态码不为0，则异常，.
    if (res.code !== 0) {
      Message({
        message: res.msg || '服务器异常',
        type: 'error',
        duration: 5 * 1000
      })

      // 这里的状态码可根据后端状态码进行修改
      if (res.code === 401) {
        // to re-login
        MessageBox.confirm('您已经退出了，将离开该页面，确定退出？', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
