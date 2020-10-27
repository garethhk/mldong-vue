<template>
  <el-form :inline="false" class="m-form" ref="form" :model="form" :rules="rules" label-width="100px">
    <el-form-item class="m-form-item" label="公告标题" prop="title">
      <el-input type="text" v-model="form.title" placeholder="请输入公告标题"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="公告类型" prop="type">
      <m-dict mode="form" v-model="form.type" dict-key="sys_notice_type"></m-dict>
    </el-form-item>
    <el-form-item class="m-form-item" label="内容" prop="content">
      <m-tinymce v-model="form.content"></m-tinymce>
    </el-form-item>
  </el-form>
</template>
<script>
import { save as saveNotice, update as updateNotice, get as getNotice } from '@/api/sys/sys.notice.service.js'

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    isTree: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number],
      default: undefined
    }
  },
  data() {
    return {
      form: {
        title: undefined,
        type: 20,
        content: undefined,
        id: undefined
      },
      rules: {
        title: [
          { required: true, message: '公告标题不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '公告类型不能为空', trigger: 'blur' }
        ],
        content: [
          { required: false, message: '内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    id(n, o) {
      this.getDetails()
    }
  },
  mounted() {
    this.getDetails()
  },
  methods: {
    submit(isShowMessage = 1) {
      return new Promise((resolve, reject) => {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.isEdit) {
              updateNotice(this.form).then(res => {
                if (isShowMessage) {
                  if (res.code === 0) {
                    this.$message({
                      message: res.msg || '操作成功',
                      type: 'success'
                    })
                  }
                }
                resolve(res)
              }).catch(e => {
                reject(e)
              })
            } else {
              delete this.form.id
              saveNotice(this.form).then(res => {
                if (isShowMessage) {
                  if (res.code === 0) {
                    this.$message({
                      message: res.msg || '操作成功',
                      type: 'success'
                    })
                  }
                }
                resolve(res)
              }).catch(e => {
                reject(e)
              })
            }
          } else {
            reject(new Error('error'))
          }
        })
      })
    },
    resetFields() {
      this.$refs['form'].resetFields()
      this.$refs['form'].clearValidate()
    },
    getDetails() {
      if (this.isEdit && this.id) {
        getNotice({
          id: this.id
        }).then(res => {
          this.form = this.$util.copy(res.data, this.form)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
