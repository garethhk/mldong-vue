<template>
  <el-form :inline="false" class="m-form" ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item class="m-form-item" label="名称" prop="name">
      <el-input type="text" v-model="form.name" placeholder="请输入名称"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="值" prop="dictItemValue">
      <el-input type="text" v-model="form.dictItemValue" placeholder="值"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="排序" prop="sort">
      <el-input type="text" v-model="form.sort" placeholder="排序"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="备注" prop="remark">
      <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { save as saveDict, update as updateDict, get as getDict } from '@/api/sys/sys.dictItem.service.js'

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
    },
    dictItemId: {
      type: [String, Number],
      default: undefined
    }
  },
  data() {
    return {
      form: {
        name: undefined,
        dictItemValue: undefined,
        remark: undefined,
        sort: undefined,
        id: undefined
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        dictItemValue: [
          { required: true, message: '值不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    dictItemId(n, o) {
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
            this.form.dictId = this.id
            if (this.isEdit) {
              updateDict(this.form).then(res => {
                if (isShowMessage) {
                  if (res.code === 0) {
                    this.$message({
                      message: res.msg || '操作成功',
                      type: 'success'
                    })
                    this.$parent.$parent.$refs.drawer.requestData()
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
                    this.$parent.$parent.$refs.drawer.requestData()
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
          id: this.dictItemId
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
