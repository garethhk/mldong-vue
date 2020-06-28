<template>
  <el-form :inline="false" class="m-form" ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item class="m-form-item" label="名称" prop="name">
      <el-input type="text" v-model="form.name" placeholder="请输入名称"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="唯一编码" prop="dictKey">
      <el-input type="text" v-model="form.dictKey" placeholder="请输入唯一编码"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="备注" prop="remark">
      <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { save as saveDict, update as updateDict, get as getDict } from '@/api/sys/sys.dict.service.js'

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
        dictKey: undefined,
        remark: undefined,
        id: undefined
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        dictKey: [
          { required: true, message: '唯一编码不能为空', trigger: 'blur' }
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
              updateDict(this.form).then(res => {
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
              saveDict(this.form).then(res => {
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
        getDict({
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
