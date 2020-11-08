<template>
  <el-form :inline="false" class="m-form" ref="form" :model="form" :rules="rules" label-width="100px">
    <el-form-item class="m-form-item" label="参数名称" prop="configName">
      <el-input type="text" v-model="form.configName" placeholder="请输入参数名称"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="参数键名" prop="configKey">
      <el-input type="text" v-model="form.configKey" placeholder="请输入参数键名"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="参数键值" prop="configValue">
      <el-input type="textarea" v-model="form.configValue" placeholder="请输入参数键值"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="系统内置" prop="isSystem">
      <m-dict mode="form" v-model="form.isSystem" dict-key="yes_no"></m-dict>
    </el-form-item>
    <el-form-item class="m-form-item" label="备注" prop="remark">
      <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { save as saveConfig, update as updateConfig, get as getConfig } from '@/api/sys/sys.config.service.js'

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
        configName: undefined,
        configKey: undefined,
        configValue: undefined,
        isSystem: 2,
        remark: undefined,
        id: undefined
      },
      rules: {
        configName: [
          { required: true, message: '参数名称不能为空', trigger: 'blur' }
        ],
        configKey: [
          { required: true, message: '参数键名不能为空', trigger: 'blur' }
        ],
        configValue: [
          { required: true, message: '参数键值不能为空', trigger: 'blur' }
        ],
        isSystem: [
          { required: true, message: '系统内置不能为空', trigger: 'blur' }
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
              updateConfig(this.form).then(res => {
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
              saveConfig(this.form).then(res => {
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
        getConfig({
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
