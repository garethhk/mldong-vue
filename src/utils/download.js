import Axios from 'axios'
import { getToken } from '@/utils/auth'
import { Loading } from 'element-ui'

export const download = (url, data) => {
  const loadingInstance = Loading.service({
    fullscreen: true,
    lock: true,
    text: '下载中',
    spinner: 'el-icon-loading' })
  Axios({
    method: 'post',
    url: process.env.VUE_APP_BASE_API + url,
    headers: {
      'Auth-Token': getToken()
    },
    data: data,
    responseType: 'arraybuffer'
  }).then(res => {
    loadingInstance.close()
    var disposition = res.headers['content-disposition']
    var fileName = decodeURI(escape(disposition.substring(disposition.indexOf('filename=') + 9, disposition.length)))
    var blob = new Blob([res.data], { type: res.headers['content-type'] })
    var downloadElement = document.createElement('a')
    var href = window.URL.createObjectURL(blob) // 创建下载的链接
    downloadElement.href = href
    downloadElement.download = fileName // 下载后文件名
    document.body.appendChild(downloadElement)
    downloadElement.click()// 点击下载
    document.body.removeChild(downloadElement) // 下载完成移除元素
    window.URL.revokeObjectURL(href)
  }).catch(e => {
    loadingInstance.close()
  })
}
