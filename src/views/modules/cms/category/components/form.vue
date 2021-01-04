<template>
  <el-form :inline="false" class="m-form" ref="form" :model="form" :rules="rules" label-width="120px">
    <el-card class="box-card" style="margin-top:-30px;">
      <div slot="header" class="clearfix">
        <span class="el-page-header__content">基本信息</span>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item class="m-form-item" label="父栏目" prop="parentId">
            <m-select-tree :is-edit="isEdit||isTree" v-model="form.parentId" url="/cms/category/list"></m-select-tree>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="m-form-item" label="栏目名称" prop="name">
            <el-input type="text" v-model="form.name" placeholder="请输入栏目名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="m-form-item" label="是否导航" prop="isNav">
            <m-dict mode="form" v-model="form.isNav" dict-key="yes_no"></m-dict>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="m-form-item" label="是否显示" prop="isShow">
            <m-dict mode="form" v-model="form.isShow" dict-key="yes_no"></m-dict>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="m-form-item" label="是否单页面" prop="isPage">
            <m-dict mode="form" v-model="form.isPage" dict-key="yes_no"></m-dict>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="m-form-item" label="排序" prop="sort">
            <el-input type="text" v-model="form.sort" placeholder="请输入排序"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="m-form-item" label="图标" prop="icon">
        <m-single-upload v-model="form.icon"></m-single-upload>
      </el-form-item>
      <el-form-item class="m-form-item" label="seo关键字" prop="seoKeyworks">
        <el-input type="text" v-model="form.seoKeyworks" placeholder="请输入seo关键字"></el-input>
      </el-form-item>
      <el-form-item class="m-form-item" label="seo描述" prop="seoDescription">
        <el-input type="textarea" v-model="form.seoDescription" placeholder="请输入seo描述"></el-input>
      </el-form-item>
    </el-card>
    <el-card class="box-card" style="margin-top:10px;">
      <div slot="header" class="clearfix">
        <span class="el-page-header__content">扩展字段配置</span>
      </div>
      <el-form-item label="" label-width="0px">
        <el-row>
          <el-col :span="5">表单类型</el-col>
          <el-col :span="4" :offset="1">字段名称</el-col>
          <el-col :span="5" :offset="1">字段说明</el-col>
          <el-col :span="3" :offset="1">是否必填</el-col>
          <el-col :span="3" :offset="1"><el-button icon="el-icon-plus" size="mini" @click="handleAdd(extFormConfig.formItems.length-1)"></el-button></el-col>
        </el-row>
        <el-row :key="index" v-for="(item,index) in extFormConfig.formItems" style="margin-top: 10px;">
          <el-col :span="5">
            <el-select v-model="extFormConfig.formItems[index].formtype" size="medium">
              <el-option label="单行文本" value="text"></el-option>
              <el-option label="多行文本" value="textarea"></el-option>
              <el-option label="单图" value="singleUpload"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-input type="text" v-model="extFormConfig.formItems[index].javaProperty" placeholder="字段名称" size="medium"></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input type="text" v-model="extFormConfig.formItems[index].remark" placeholder="字段说明" size="medium"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-switch
              v-model="extFormConfig.formItems[index].required"
              active-text="是"
              inactive-text="否"
              size="medium">
            </el-switch>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button-group>
              <el-button icon="el-icon-minus" size="mini" @click="handleDelete(index)"></el-button>
              <el-button icon="el-icon-plus" size="mini" @click="handleAdd(index)"></el-button>
            </el-button-group>
          </el-col>
        </el-row>
      </el-form-item>
    </el-card>
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
        isPage: 2,
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
      },
      extFormConfig: {
        formItems: []
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
            this.form.extFormConfig = JSON.stringify(this.extFormConfig)
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
            if (res.data.extFormConfig) {
              this.extFormConfig = JSON.parse(res.data.extFormConfig)
            }
          } else {
            this.$set(this.form, 'parentId', res.data.id)
          }
        })
      }
    },
    handleAdd(index) {
      this.extFormConfig.formItems.splice(index + 1, 0, {
        formtype: 'text',
        javaProperty: 'ext' + (index + 1),
        remark: '扩展字段' + (index + 1)
      })
    },
    handleDelete(index) {
      this.extFormConfig.formItems.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
