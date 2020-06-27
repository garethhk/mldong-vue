<template>
  <el-form :inline="false" class="m-form" ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item class="m-form-item" label="角色名称" prop="name">
      <el-input type="text" v-model="form.name" placeholder="请输入角色名称"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="角色标识" prop="roleKey">
      <el-input type="text" v-model="form.roleKey" placeholder="请输入角色标识"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="角色类型" prop="roleType">
      <m-dict mode="form" v-model="form.roleType" dict-key="sys_role_role_type"></m-dict>
    </el-form-item>
    <el-form-item class="m-form-item" label="是否启用" prop="isEnabled">
      <m-dict mode="form" v-model="form.isEnabled" dict-key="yes_no"></m-dict>
    </el-form-item>
    <el-form-item class="m-form-item" label="备注" prop="remark">
      <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { save as saveRole, update as updateRole, get as getRole } from '@/api/sys/sys.role.service.js'

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
        name: undefined,
        roleKey: undefined,
        roleType: 10,
        isEnabled: 2,
        remark: undefined,
        id: undefined
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        roleKey: [
          { required: true, message: '角色标识不能为空', trigger: 'blur' }
        ],
        roleType: [
          { required: true, message: '角色类型不能为空', trigger: 'blur' }
        ],
        isEnabled: [
          { required: true, message: '是否启用不能为空', trigger: 'blur' }
        ],
        remark: [
          { required: false, message: '备注不能为空', trigger: 'blur' }
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
              updateRole(this.form).then(res => {
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
              saveRole(this.form).then(res => {
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
        getRole({
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
