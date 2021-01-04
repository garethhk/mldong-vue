<template>
  <el-form :inline="false" class="m-form" ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item class="m-form-item" label="父栏目" prop="parentId">
      <m-select-tree :is-edit="isEdit||isTree" v-model="form.parentId" url="/cms/category/list"></m-select-tree>
    </el-form-item>
    <el-form-item class="m-form-item" label="栏目名称" prop="name">
      <el-input type="text" v-model="form.name" placeholder="请输入栏目名称"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="图标" prop="icon">
      <el-input type="text" v-model="form.icon" placeholder="请输入图标"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="是否导航" prop="isNav">
      <m-dict mode="form" v-model="form.isNav" dict-key="yes_no"></m-dict>
    </el-form-item>
    <el-form-item class="m-form-item" label="是否显示" prop="isShow">
      <m-dict mode="form" v-model="form.isShow" dict-key="yes_no"></m-dict>
    </el-form-item>
    <el-form-item class="m-form-item" label="排序" prop="sort">
      <el-input type="text" v-model="form.sort" placeholder="请输入排序"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="seo关键字" prop="seoKeyworks">
      <el-input type="text" v-model="form.seoKeyworks" placeholder="请输入seo关键字"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="seo描述" prop="seoDescription">
      <el-input type="textarea" v-model="form.seoDescription" placeholder="请输入seo描述"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { save as saveCategory, update as updateCategory, get as getCategory } from '@/api/cms/cms.category.service.js'

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
        parentId: undefined,
        name: undefined,
        icon: undefined,
        isNav: 2,
        isShow: 2,
        sort: undefined,
        seoKeyworks: undefined,
        seoDescription: undefined,
        id: undefined
      },
      rules: {
        parentId: [
          { required: false, message: '父栏目不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '栏目名称不能为空', trigger: 'blur' }
        ],
        icon: [
          { required: false, message: '图标不能为空', trigger: 'blur' }
        ],
        isNav: [
          { required: false, message: '是否导航不能为空', trigger: 'blur' }
        ],
        isShow: [
          { required: false, message: '是否显示不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: false, message: '排序不能为空', trigger: 'blur' }
        ],
        seoKeyworks: [
          { required: false, message: 'seo关键字不能为空', trigger: 'blur' }
        ],
        seoDescription: [
          { required: false, message: 'seo描述不能为空', trigger: 'blur' }
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
      if (!this.form.parentId) {
        this.form.parentId = 0
      }
      return new Promise((resolve, reject) => {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.isEdit) {
              updateCategory(this.form).then(res => {
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
              saveCategory(this.form).then(res => {
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
      if (this.id) {
        getCategory({
          id: this.id
        }).then(res => {
          if (this.isEdit) {
            this.form = this.$util.copy(res.data, this.form)
          } else {
            this.$set(this.form, 'parentId', res.data.id)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
