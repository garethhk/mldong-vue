<template>
  <div>
    <el-upload
      :action="useOss?ossUploadUrl:minioUploadUrl"
      :data="useOss?dataObj:null"
      :list-type="listType"
      :headers="{'Auth-Token': token}"
      :multiple="false"
      :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">{{ tip }}</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :modal="false">
      <img width="100%" :src="wrapImgUrl(fileList[0].url)" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { createUploadToken } from '@/api/sys/sys.uploadRecord.service'
import { getToken } from '@/utils/auth'

export default {
  name: 'SingleUpload',
  props: {
    value: {
      type: String,
      default: undefined
    },
    listType: {
      type: String,
      default: 'picture'
    },
    tip: {
      type: String,
      default: '只能上传jpg/png文件，且不超过10MB'
    },
    bizType: {
      type: String,
      default: 'common'
    }
  },
  data() {
    return {
      dataObj: {
        uploadToken: ''
      },
      token: getToken(),
      dialogVisible: false,
      useOss: false, // 使用oss->true;使用MinIO->false
      ossUploadUrl: '',
      minioUploadUrl: process.env.VUE_APP_BASE_API + '/sys/uploadRecord/file?bizType' + this.bizType
    }
  },
  computed: {
    imageUrl() {
      return this.value
    },
    imageName() {
      if (this.value != null && this.value !== '') {
        return this.value.substr(this.value.lastIndexOf('/') + 1)
      } else {
        return null
      }
    },
    fileList() {
      return [{
        name: this.imageName,
        url: this.wrapImgUrl(this.imageUrl)
      }]
    },
    showFileList: {
      get: function() {
        return this.value !== null && this.value !== '' && this.value !== undefined
      },
      set: function(newValue) {
      }
    }
  },
  methods: {
    emitInput(val) {
      this.$emit('input', val)
    },
    handleRemove(file, fileList) {
      this.emitInput('')
    },
    handlePreview(file) {
      this.dialogVisible = true
    },
    beforeUpload(file) {
      const _self = this
      if (!this.useOss) {
        // 不使用oss不需要获取策略
        return true
      }
      return new Promise((resolve, reject) => {
        createUploadToken().then(response => {
          _self.dataObj.uploadToken = response.data.uploadToken
          // _self.dataObj.callback = response.data.callback;
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    handleUploadSuccess(res, file) {
      this.showFileList = true
      this.fileList.pop()
      this.fileList.push({ name: file.name, url: res.data.url })
      this.emitInput(this.fileList[0].url)
    }
  }
}
</script>
<style>

</style>
