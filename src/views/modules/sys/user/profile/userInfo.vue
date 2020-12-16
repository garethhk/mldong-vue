<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="80px">
    <el-form-item label="真实姓名" prop="realName">
      <el-input v-model="user.realName" />
    </el-form-item>
    <el-form-item label="手机号码" prop="mobilePhone">
      <el-input v-model="user.mobilePhone" maxlength="11" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="user.email" maxlength="50" />
    </el-form-item>
    <el-form-item label="性别">
      <m-dict mode="form" v-model="user.sex" dict-key="sys_user_sex"></m-dict>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <el-button type="danger" size="mini" @click="close">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateProfile } from '@/api/sys/sys.user.service.js'

export default {
  props: {
    user: {
      type: Object,
      default() {
        return undefined
      }
    }
  },
  data() {
    return {
      // 表单校验
      rules: {
        realName: [
          { required: true, message: '用户昵称不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
          {
            type: 'email',
            message: "'请输入正确的邮箱地址",
            trigger: ['blur', 'change']
          }
        ],
        mobilePhone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          updateProfile({
            realName: this.user.realName,
            email: this.user.email,
            mobilePhone: this.user.mobilePhone,
            sex: this.user.sex
          }).then(response => {
            if (response.code === 0) {
              this.msgSuccess('修改成功')
            } else {
              this.msgError(response.msg)
            }
          })
        }
      })
    },
    close() {
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.push({ path: '/' })
    }
  }
}
</script>
