<template>
  <el-form :inline="false" class="m-form" ref="form" :model="form" :rules="rules" label-width="100px">
    <el-form-item class="m-form-item" label="所属栏目" prop="categoryId">
      <m-select-tree :is-edit="isEdit||isTree" v-model="form.categoryId" url="/cms/category/list"></m-select-tree>
    </el-form-item>
    <el-form-item class="m-form-item" label="标题" prop="title">
      <el-input type="text" v-model="form.title" placeholder="请输入标题"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="作者" prop="author">
      <el-input type="text" v-model="form.author" placeholder="请输入作者"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="文章来源" prop="source">
      <el-input type="text" v-model="form.source" placeholder="请输入文章来源"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="排序" prop="sort">
      <el-input type="text" v-model="form.sort" placeholder="请输入排序"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="大图" prop="cover">
      <m-single-upload v-model="form.cover"></m-single-upload>
    </el-form-item>
    <el-form-item class="m-form-item" label="是否发布" prop="isPublish">
      <m-dict mode="form" v-model="form.isPublish" dict-key="yes_no"></m-dict>
    </el-form-item>
    <el-form-item class="m-form-item" label="发布日期" prop="sort">
      <el-date-picker
        v-model="form.publishTime"
        type="datetime"
        placeholder="选择日期时间"
        align="center"
        value-format="yyyy-MM-dd HH:mm:ss"
        :picker-options="pickerOptions">
      </el-date-picker>
    </el-form-item>
    <el-form-item class="m-form-item" label="内容" prop="content">
      <m-tinymce v-model="form.content"></m-tinymce>
    </el-form-item>
  </el-form>
</template>
<script>
import { save as saveArticle, update as updateArticle, get as getArticle } from '@/api/cms/cms.article.service.js'

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
    category: {
      type: [Object],
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      form: {
        categoryId: undefined,
        title: undefined,
        author: undefined,
        source: undefined,
        sort: undefined,
        cover: undefined,
        isPublish: 2,
        content: undefined,
        id: undefined,
        publishTime: undefined
      },
      rules: {
        categoryId: [
          { required: true, message: '所属栏目不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        author: [
          { required: false, message: '作者不能为空', trigger: 'blur' }
        ],
        source: [
          { required: false, message: '文章来源不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: false, message: '排序不能为空', trigger: 'blur' }
        ],
        cover: [
          { required: false, message: '大图不能为空', trigger: 'blur' }
        ],
        isPublish: [
          { required: false, message: '是否发布不能为空', trigger: 'blur' }
        ],
        content: [
          { required: false, message: '内容不能为空', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
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
    if (this.category.id) {
      this.form.categoryId = this.category.id
    }
  },
  methods: {
    submit(isShowMessage = 1) {
      return new Promise((resolve, reject) => {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.isEdit) {
              updateArticle(this.form).then(res => {
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
              saveArticle(this.form).then(res => {
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
        getArticle({
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
