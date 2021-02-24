<template>
  <el-form :inline="false" class="m-form" ref="form" :model="form" :rules="rules" label-width="100px">
    <el-form-item class="m-form-item" label="用户名" prop="userName">
      <el-input type="text" v-model="form.userName" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" placeholder="请输入密码" type="password" />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="form.confirmPassword" placeholder="请输入确认密码" type="password" />
    </el-form-item>
    <el-form-item class="m-form-item" label="姓名" prop="realName">
      <el-input type="text" v-model="form.realName" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="所属部门" prop="deptId">
      <m-select-tree :show-root="false" :is-edit="isEdit||isTree" v-model="form.deptId" url="/sys/dept/list"></m-select-tree>
    </el-form-item>
    <el-form-item class="m-form-item" label="所属岗位" prop="postId">
      <m-select :is-edit="isEdit" v-model="form.postId" url="/sys/post/list"></m-select>
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
    const equalToPassword = (rule, value, callback) => {
      if (this.form.password !== value) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        userName: undefined,
        password: undefined,
        confirmPassword: undefined,
        realName: undefined,
        deptId: undefined,
        postId: undefined,
        mobilePhone: undefined,
        sex: 1,
        isLocked: 1,
        email: undefined,
        id: undefined
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { pattern: /^[a-zA-Z]{1}[a-zA-Z0-9_]{4,15}$/, message: '用户名字母开头,5-16位长度的字母、数字和下划线组合', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { pattern: /^[a-zA-Z]{1}[a-zA-Z0-9@#$%^&*_]{5,15}$/, message: '密码字母开头,6-16位长度的字母、数字和特殊字符(@#$%^&*_)组合', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { required: true, validator: equalToPassword, trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        deptId: [
          { required: true, message: '所属部门不能为空', trigger: 'blur' }
        ],
        postId: [
          { required: true, message: '所属岗位不能为空', trigger: 'blur' }
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
