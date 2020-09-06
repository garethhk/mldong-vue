<template>
  <el-form :inline="false" class="m-form" ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item class="m-form-item" label="操作说明" prop="description">
      <el-input type="text" v-model="form.description" placeholder="请输入操作说明"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="请求类型" prop="requestType">
      <m-dict mode="form" v-model="form.requestType" dict-key="sys_request_log_request_type"></m-dict>
    </el-form-item>
    <el-form-item class="m-form-item" label="请求方法" prop="method">
      <el-input type="text" v-model="form.method" placeholder="请输入请求方法"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="ip" prop="ip">
      <el-input type="text" v-model="form.ip" placeholder="请输入ip"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="用户名" prop="userName">
      <el-input type="text" v-model="form.userName" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="请求uri" prop="uri">
      <el-input type="text" v-model="form.uri" placeholder="请输入请求uri"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="url参数" prop="queryString">
      <el-input type="text" v-model="form.queryString" placeholder="请输入url参数"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="请求参数" prop="body">
      <el-input type="textarea" v-model="form.body" placeholder="请输入请求参数"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="返回参数" prop="returnData">
      <el-input type="textarea" v-model="form.returnData" placeholder="请输入返回参数"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { save as saveRequestLog, update as updateRequestLog, get as getRequestLog } from '@/api/sys/sys.requestLog.service.js'

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
        description: undefined,
        requestType: 1,
        method: undefined,
        ip: undefined,
        userName: undefined,
        uri: undefined,
        queryString: undefined,
        body: undefined,
        returnData: undefined,
        id: undefined
      },
      rules: {
        description: [
          { required: true, message: '操作说明不能为空', trigger: 'blur' }
        ],
        requestType: [
          { required: true, message: '请求类型不能为空', trigger: 'blur' }
        ],
        method: [
          { required: true, message: '请求方法不能为空', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: 'ip不能为空', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        uri: [
          { required: false, message: '请求uri不能为空', trigger: 'blur' }
        ],
        queryString: [
          { required: false, message: 'url参数不能为空', trigger: 'blur' }
        ],
        body: [
          { required: false, message: '请求参数不能为空', trigger: 'blur' }
        ],
        returnData: [
          { required: false, message: '返回参数不能为空', trigger: 'blur' }
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
              updateRequestLog(this.form).then(res => {
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
              saveRequestLog(this.form).then(res => {
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
        getRequestLog({
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
