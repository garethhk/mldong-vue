<template>
  <div>
    <el-upload
      :action="useOss?ossUploadUrl:minioUploadUrl"
      :data="useOss?dataObj:null"
      list-type="picture-card"
      :headers="{'Auth-Token': token}"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :limit="maxCount"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :modal="false">
      <img width="100%" :src="wrapImgUrl(dialogImageUrl)" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { createUploadToken } from '@/api/sys/sys.uploadRecord.service'
import { getToken } from '@/utils/auth'

export default {
  name: 'MultiUpload',
  props: {
    // 图片属性数组
    value: {
      type: [Array, String],
      default() {
        return ''
      }
    },
    // 最大上传图片数量
    maxCount: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      dataObj: {
        uploadToken: null
      },
      token: getToken(),
      dialogVisible: false,
      dialogImageUrl: null,
      useOss: false, // 使用oss->true;使用MinIO->false
      ossUploadUrl: '',
      minioUploadUrl: process.env.VUE_APP_BASE_API + '/sys/uploadRecord/file'
    }
  },
  computed: {
    fileList() {
      const fileList = []
      if (this.value instanceof Array) {
        for (let i = 0; i < this.value.length; i++) {
          fileList.push({ url: this.wrapImgUrl(this.value[i]) })
        }
      } else {
        if (this.value) {
          const valueArr = this.value.split(',')
          for (let i = 0; i < valueArr.length; i++) {
            fileList.push({ url: this.wrapImgUrl(valueArr[i]) })
          }
        }
      }
      return fileList
    }
  },
  methods: {
    emitInput(fileList) {
      const value = []
      for (let i = 0; i < fileList.length; i++) {
        value.push(fileList[i].url.replace(process.env.VUE_APP_IMG_BASE_URL, ''))
      }
      if (this.value instanceof Array) {
        this.$emit('input', value)
      } else {
        this.$emit('input', value.join(','))
      }
    },
    handleRemove(file, fileList) {
      this.emitInput(fileList)
    },
    handlePreview(file) {
      this.dialogVisible = true
      this.dialogImageUrl = file.url
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
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    handleUploadSuccess(res, file) {
      this.fileList.push({ name: file.name, url: res.data.url })
      this.emitInput(this.fileList)
    },
    handleExceed(files, fileList) {
      this.$message({
        message: '最多只能上传' + this.maxCount + '张图片',
        type: 'warning',
        duration: 1000
      })
    }
  }
}
</script>
<style>
