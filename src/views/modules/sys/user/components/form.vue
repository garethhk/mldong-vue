<template>
  <el-form :inline="false" class="m-form" ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item class="m-form-item" label="用户名" prop="userName">
      <el-input type="text" v-model="form.userName" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="姓名" prop="realName">
      <el-input type="text" v-model="form.realName" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="手机号" prop="mobilePhone">
      <el-input type="text" v-model="form.mobilePhone" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="性别" prop="sex">
      <m-dict mode="form" v-model="form.sex" dict-key="sys_user_sex"></m-dict>
    </el-form-item>
    <el-form-item class="m-form-item" label="是否锁定" prop="isLocked">
      <m-dict mode="form" v-model="form.isLocked" dict-key="yes_no"></m-dict>
    </el-form-item>
    <el-form-item class="m-form-item" label="邮箱" prop="email">
      <el-input type="text" v-model="form.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { save as saveUser, update as updateUser, get as getUser } from '@/api/sys/sys.user.service.js'

export default {
  props: {
    isEdit: {
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
        userName: undefined,
        realName: undefined,
        mobilePhone: undefined,
        sex: 1,
        isLocked: 1,
        email: undefined,
        id: undefined
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        mobilePhone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别不能为空', trigger: 'blur' }
        ],
        isLocked: [
          { required: true, message: '是否锁定不能为空', trigger: 'blur' }
        ],
        email: [
          { required: false, message: '邮箱不能为空', trigger: 'blur' }
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
              updateUser(this.form).then(res => {
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
              saveUser(this.form).then(res => {
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
        getUser({
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
