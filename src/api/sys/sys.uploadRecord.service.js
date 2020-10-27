import request from '@/utils/request'

/**
 * 创建上传token-qiniu
 * @param {*} data
 */
export function createUploadToken(data) {
  return request({
    url: '/sys/uploadRecord/createUploadToken',
    method: 'post',
    data
  })
}
