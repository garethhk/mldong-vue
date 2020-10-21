<template>
  <el-form :inline="false" class="m-form" ref="form" :model="form" :rules="rules" label-width="100px">
    <el-form-item class="m-form-item" label="岗位名称" prop="name">
      <el-input type="text" v-model="form.name" placeholder="请输入岗位名称"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="岗位编码" prop="code">
      <el-input type="text" v-model="form.code" placeholder="请输入岗位编码"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="是否启用" prop="isEnabled">
      <m-dict mode="form" v-model="form.isEnabled" dict-key="yes_no"></m-dict>
    </el-form-item>
    <el-form-item class="m-form-item" label="排序" prop="sort">
      <el-input type="text" v-model="form.sort" placeholder="请输入排序"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { save as savePost, update as updatePost, get as getPost } from '@/api/sys/sys.post.service.js'

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
        name: undefined,
        code: undefined,
        isEnabled: 2,
        sort: undefined,
        id: undefined
      },
      rules: {
        name: [
          { required: true, message: '岗位名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '岗位编码不能为空', trigger: 'blur' }
        ],
        isEnabled: [
          { required: true, message: '是否启用不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: false, message: '排序不能为空', trigger: 'blur' }
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
              updatePost(this.form).then(res => {
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
              savePost(this.form).then(res => {
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
        getPost({
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
