<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input
          size="small"
          clearable
          placeholder="请输入部门名称"
          prefix-icon="el-icon-search"
          style="margin-bottom: 20px"
          v-model="categoryName">
        </el-input>
        <el-tree ref="tree" highlight-current :data="categoryData" :props="defaultProps" :expand-on-click-node="false" default-expand-all @node-click="handleNodeClick" :filter-node-method="filterNode"></el-tree>
      </el-col>
      <el-col v-if="isPage" :span="20">
        <el-form :inline="false" class="m-form" ref="categoryForm" :model="categoryForm" label-width="100px">
          <el-tabs type="card">
            <el-tab-pane label="基本信息">
              <el-form-item class="m-form-item" label="栏目名称" size="mini">
                {{ currentCategory.name }}
              </el-form-item>
              <el-form-item class="m-form-item" label="内容" prop="content" size="mini">
                <m-tinymce ref="categoryTinymce" v-model="categoryForm.content"></m-tinymce>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="扩展信息" :disabled="!extFormConfig.formItems.length">
              <el-form-item :required="item.required === true" v-for="(item,index) in extFormConfig.formItems" :key="index" class="m-form-item" :label="item.remark">
                <el-input v-if="item.formtype === 'textarea'" type="textarea" v-model="extFormValue[`${item.javaProperty}`]"></el-input>
                <m-single-upload v-else-if="item.formtype === 'singleUpload'" v-model="extFormValue[`${item.javaProperty}`]" :placeholder="'请输入' + item.remark"></m-single-upload>
                <el-input v-else type="text" v-model="extFormValue[`${item.javaProperty}`]" :placeholder="'请输入' + item.remark"></el-input>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
          <el-form-item class="m-form-item">
            <el-button type="primary" :loading="submitCategoryLoading" @click="handleCategorySubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col v-else :span="20">
        <el-tabs type="card">
          <el-tab-pane label="文章列表">
            <!--start========头部折叠面板===========start-->
            <el-collapse accordion value="1" style="padding:0px;">
              <el-collapse-item name="1">
                <template slot="title">
                  <el-page-header title="返回" content="搜索条件" @back="goBack"></el-page-header>
                </template>
                <!--搜索模块-->
                <m-search ref="searchForm" @on-search="handleSearch" @on-reset="searchReset" />
              </el-collapse-item>
            </el-collapse>
            <!--start========头部折叠面板===========start-->
            <!--start========顶部工具栏===========start-->
            <el-row :gutter="10" class="mb8 mt10">
              <el-col :span="1.5">
                <el-button v-hasPerm="['admin','cms:article:save']" type="primary" icon="el-icon-plus" size="small" @click="openDialog(undefined, '添加文章', 'Add', true)">
                  添加
                </el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button v-hasPerm="['admin','cms:article:update']" type="success" icon="el-icon-edit" size="small" :disabled="single" @click="openDialog(ids[0], '修改文章', 'Edit', true)">
                  修改
                </el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button v-hasPerm="['admin','cms:article:remove']" type="danger" icon="el-icon-delete" size="small" :disabled="multiple" @click="handleRemove">
                  删除
                </el-button>
              </el-col>
            </el-row>
            <!--end========顶部工具栏===========end-->
            <!--start========表格列表===========start-->
            <el-table stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column prop="categoryName" label="所属栏目">
                <template slot-scope="scope">
                  {{ scope.row.categoryName }}
                </template>
              </el-table-column>
              <el-table-column prop="title" label="标题">
                <template slot-scope="scope">
                  {{ scope.row.title }}
                </template>
              </el-table-column>
              <el-table-column prop="author" label="作者">
                <template slot-scope="scope">
                  {{ scope.row.author }}
                </template>
              </el-table-column>
              <el-table-column prop="source" label="文章来源">
                <template slot-scope="scope">
                  {{ scope.row.source }}
                </template>
              </el-table-column>
              <el-table-column prop="sort" label="排序" width="80">
                <template slot-scope="scope">
                  {{ scope.row.sort }}
                </template>
              </el-table-column>
              <el-table-column prop="isPublish" label="是否发布" width="80">
                <template slot-scope="scope">
                  <m-dict mode="list" v-model="scope.row.isPublish" dict-key="yes_no"></m-dict>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="150">
                <template slot-scope="scope">
                  {{ scope.row.createTime }}
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                  <el-button v-hasPerm="['admin','cms:article:get']" type="text" size="small" icon="el-icon-view" @click.native.stop="openDialog(scope.row.id, '查看文章', 'Details', false)">查看</el-button>
                  <el-button v-hasPerm="['admin','cms:article:update']" type="text" size="small" icon="el-icon-edit" @click.native.stop="openDialog(scope.row.id, '修改文章', 'Edit', true)">修改</el-button>
                  <el-button v-hasPerm="['admin','cms:article:remove']" type="text" size="small" icon="el-icon-delete" @click.native.stop="handleRemove(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--end========表格列表===========end-->
            <!--start========分页===========start-->
            <pagination
              v-show="recordCount>0"
              :total="recordCount"
              :page.sync="pageNum"
              :limit.sync="pageSize"
              @pagination="requestData"
            />
            <!--end========分页===========end-->
            <!--start========弹框===========start-->
            <el-dialog :title="title" :visible.sync="isOpenDialog" width="50%" append-to-body @close="handleCancel">
              <component :ref="currentView" :is="currentView" v-if="isOpenDialog" :id="id"></component>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-if="showOk" :loading="submitLoading" @click="handleSubmit">确 定</el-button>
                <el-button @click="handleCancel">取 消</el-button>
              </div>
            </el-dialog>
            <!--end========弹框===========end-->
          </el-tab-pane>
          <el-tab-pane label="扩展信息" :disabled="!extFormConfig.formItems.length">
            <el-form :inline="false" class="m-form" ref="categoryForm" :model="categoryForm" label-width="100px">
              <el-form-item class="m-form-item" label="栏目名称" size="mini">
                {{ currentCategory.name }}
              </el-form-item>
              <el-form-item :required="item.required === true" v-for="(item,index) in extFormConfig.formItems" :key="index" class="m-form-item" :label="item.remark">
                <el-input v-if="item.formtype === 'textarea'" type="textarea" v-model="extFormValue[`${item.javaProperty}`]"></el-input>
                <m-single-upload v-else-if="item.formtype === 'singleUpload'" v-model="extFormValue[`${item.javaProperty}`]" :placeholder="'请输入' + item.remark"></m-single-upload>
                <el-input v-else type="text" v-model="extFormValue[`${item.javaProperty}`]" :placeholder="'请输入' + item.remark"></el-input>
              </el-form-item>
              <el-form-item class="m-form-item">
                <el-button type="primary" :loading="submitCategoryLoading" @click="handleCategorySubmit">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MSearch from './components/search'
import Add from './add'
import Edit from './edit'
import Details from './details'
import { listWithExt as listArticle, remove as removeArticle } from '@/api/cms/cms.article.service.js'
import { list as listCategory } from '@/api/cms/cms.category.service.js'
import { update as updateCategory } from '@/api/cms/cms.category.service.js'

export default {
  components: {
    MSearch,
    Add,
    Edit,
    Details
  },
  data() {
    return {
      // 当前id
      id: undefined,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 加载中
      loading: false,
      // 总记录数
      recordCount: 0,
      // 当前页
      pageNum: 1,
      // 每页大小
      pageSize: Number(process.env.VUE_APP_PAGE_SIZE),
      // 列表数据
      tableData: [],
      // 当前勾选行id
      ids: [],
      // 当前勾选行集合
      selection: [],
      // 当前弹出框页面
      currentView: 'Add',
      // 弹框标题
      title: '我是标题',
      // 是否打开弹出框
      isOpenDialog: false,
      // 是否显示弹出框确认按钮
      showOk: true,
      // 提交加载中
      submitLoading: false,
      // 树形
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      oldCategoryData: [],
      categoryData: [],
      m_IN_categoryId: undefined,
      categoryName: undefined,
      isPage: false,
      currentCategory: {},
      categoryForm: {
        parentId: undefined,
        name: undefined,
        icon: undefined,
        isNav: 2,
        isShow: 2,
        isPage: 2,
        sort: undefined,
        seoKeyworks: undefined,
        seoDescription: undefined,
        id: undefined,
        content: undefined
      },
      submitCategoryLoading: false,
      extFormConfig: {
        formItems: []
      },
      extFormValue: {

      }
    }
  },
  mounted() {
    this.requestData()
    listCategory({
      pageNum: 1,
      pageSize: 10000
    }).then(res => {
      if (res.code === 0) {
        this.oldCategoryData = res.data.rows
        this.categoryData = this.$util.getTree(res.data.rows)
      }
    }).catch(() => {})
  },
  methods: {
    // 查询
    handleSearch() {
      this.requestData()
    },
    // 删除
    handleRemove(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var ids = []
        if (row.id) {
          ids.push(row.id)
        } else {
          ids = this.ids
        }
        removeArticle({
          ids: ids
        }).then(res => {
          if (res.code === 0) {
            this.$message({ message: '删除成功', type: 'success' })
            this.requestData()
          } else {
            this.$message({ message: res.msg || '删除失败', type: 'error' })
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    // 表格选中事件
    handleSelectionChange(selection) {
      this.selection = selection
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    // 请求数据
    requestData(page) {
      if (!page) {
        page = {
          page: this.pageNum,
          limit: this.pageSize
        }
      }
      this.loading = true
      listArticle({
        pageNum: page.page,
        pageSize: page.limit,
        ...this.$refs['searchForm'] ? this.$refs['searchForm'].getData() : {},
        m_IN_categoryId: this.m_IN_categoryId
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.tableData = res.data.rows
          this.recordCount = res.data.recordCount
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 表单提交
    handleSubmit() {
      this.submitLoading = true
      this.$refs[this.currentView].submit().then(() => {
        this.submitLoading = false
        this.handleCancel()
        this.requestData()
      }).catch(() => {
        this.submitLoading = false
      })
    },
    // 取消提交
    handleCancel() {
      this.id = undefined
      this.isOpenDialog = false
      if (typeof this.$refs[this.currentView].resetFields === 'function') {
        this.$refs[this.currentView].resetFields()
      }
    },
    // 树点击事件
    handleNodeClick(data) {
      this.currentCategory = data
      this.categoryForm = this.$util.copy(data, this.categoryForm)
      if (data.extFormConfig) {
        this.extFormConfig = JSON.parse(data.extFormConfig)
      } else {
        this.extFormConfig = {
          formItems: []
        }
      }
      if (data.extFormValue) {
        this.extFormValue = JSON.parse(data.extFormValue)
      } else {
        this.extFormValue = {}
      }
      if (data.isPage === 2) {
        this.isPage = true
        this.$nextTick(() => {
          window.setTimeout(() => {
            if (this.currentCategory.content) {
              this.$refs['categoryTinymce'].setContent(this.currentCategory.content)
            } else {
              this.$refs['categoryTinymce'].setContent('')
            }
          }, 100)
        })
      } else {
        this.isPage = false
        var ids = [data.id]
        ids.push(...this.$util.getChildren(this.oldCategoryData, ids[0], false).map(item => { return item.id }))
        this.m_IN_categoryId = ids
        this.requestData()
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    searchReset() {
      this.m_IN_categoryId = undefined
      this.requestData()
    },
    handleCategorySubmit() {
      if (!this.categoryForm) {
        this.categoryForm = ''
      }
      this.categoryForm.extFormValue = JSON.stringify(this.extFormValue)
      this.currentCategory.extFormValue = JSON.stringify(this.extFormValue)
      var errorMsg = []
      this.extFormConfig.formItems.forEach(item => {
        if (item.required === true) {
          if (!this.extFormValue[item.javaProperty]) {
            errorMsg.push(this.extFormConfig.remark)
          }
        }
      })
      if (errorMsg.length) {
        this.$message({ message: errorMsg.join(',') + '不能为空', type: 'error' })
        return
      }
      updateCategory(this.categoryForm).then(res => {
        if (res.code === 0) {
          this.$message({
            message: res.msg || '操作成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>
