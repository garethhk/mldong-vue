<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="realName">
      <el-input v-model="form.realName" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobilePhone">
      <el-input v-model="form.mobilePhone" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-select v-model="form.sex">
        <el-option label="男" :value="1"></el-option>
        <el-option label="女" :value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否锁定" prop="isLocked">
      <el-select v-model="form.isLocked">
        <el-option label="是" :value="2"></el-option>
        <el-option label="否" :value="1"></el-option>
      </el-select>
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
        id: undefined,
        userName: undefined,
        realName: undefined,
        email: undefined,
        mobilePhone: undefined,
        sex: 1,
        isLocked: 2,
        roleIds: 0
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
        roleIds: [
          { required: true, message: '所属角色不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    id(n, o) {
      console.log(n)
      this.getDetails()
    }
  },
  mounted() {
    this.getDetails()
  },
  methods: {
    submit() {
      return new Promise((resolve, reject) => {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.isEdit) {
              updateUser(this.form).then(res => {
                if (res.code === 0) {
                  this.$message({
                    message: res.msg || '操作成功',
                    type: 'success'
                  })
                }
                resolve(res)
              }).catch(e => {
                reject(e)
              })
            } else {
              delete this.form.id
              saveUser(this.form).then(res => {
                if (res.code === 0) {
                  this.$message({
                    message: res.msg || '操作成功',
                    type: 'success'
                  })
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
