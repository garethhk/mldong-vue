<template>
  <div class="app-container">
    <el-page-header title="返回" content="" @back="goBack"></el-page-header>
    <!--start========顶部工具栏===========start-->
    <el-row :gutter="10" class="mb8 mt10">
      <el-col :span="1.5">
        <el-button v-hasPerm="['admin','cms:category:save']" type="primary" icon="el-icon-plus" size="small" @click="openDialog(undefined, '添加栏目', 'Add', true)">
          添加
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button v-hasPerm="['admin','cms:category:update']" type="success" icon="el-icon-edit" size="small" :disabled="single" @click="openDialog(ids[0], '修改栏目', 'Edit', true)">
          修改
        </el-button>
      </el-col>
    </el-row>
    <!--end========顶部工具栏===========end-->
    <!--start========表格列表===========start-->
    <el-table row-key="id" :tree-props="{children: 'children'}" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="name" label="栏目名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          {{ scope.row.icon }}
        </template>
      </el-table-column>
      <el-table-column prop="isNav" label="是否导航" width="80">
        <template slot-scope="scope">
          <m-dict mode="list" v-model="scope.row.isNav" dict-key="yes_no"></m-dict>
        </template>
      </el-table-column>
      <el-table-column prop="isShow" label="是否显示" width="80">
        <template slot-scope="scope">
          <m-dict mode="list" v-model="scope.row.isShow" dict-key="yes_no"></m-dict>
        </template>
      </el-table-column>
      <el-table-column prop="isPage" label="单页面" width="80">
        <template slot-scope="scope">
          <m-dict mode="list" v-model="scope.row.isPage" dict-key="yes_no"></m-dict>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="80">
        <template slot-scope="scope">
          {{ scope.row.sort }}
        </template>
      </el-table-column>
      <!--el-table-column prop="seoKeyworks" label="seo关键字">
        <template slot-scope="scope">
          {{ scope.row.seoKeyworks }}
        </template>
      </el-table-column-->
      <el-table-column prop="createTime" label="创建时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="280"
        align="center">
        <template slot-scope="scope">
          <el-button v-hasPerm="['admin','cms:category:get']" type="text" size="small" icon="el-icon-view" @click.native.stop="openDialog(scope.row.id, '查看栏目', 'Details', false)">查看</el-button>
          <el-button v-hasPerm="['admin','cms:category:save']" type="text" size="small" icon="el-icon-plus" @click.native.stop="openDialog(scope.row.id, '添加子栏目', 'Add', true)">添加子栏目</el-button>
          <el-button v-hasPerm="['admin','cms:category:update']" type="text" size="small" icon="el-icon-edit" @click.native.stop="openDialog(scope.row.id, '修改栏目', 'Edit', true)">修改</el-button>
          <el-button v-hasPerm="['admin','cms:category:remove']" type="text" size="small" icon="el-icon-delete" @click.native.stop="handleRemove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--end========表格列表===========end-->
    <!--start========弹框===========start-->
    <el-dialog :title="title" :visible.sync="isOpenDialog" width="800px" append-to-body @close="handleCancel" destroy-on-close>
      <component is-tree :ref="currentView" :is="currentView" v-if="isOpenDialog" :id="id"></component>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="showOk" :loading="submitLoading" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-dialog>
    <!--end========弹框===========end-->
  </div>
</template>
<script>
import Add from './add'
import Edit from './edit'
import Details from './details'
import { list as listCategory, remove as removeCategory } from '@/api/cms/cms.category.service.js'

export default {
  name: 'CmsCategoryIndex',
  components: {
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
      pageSize: 10000,
      // 列表数据
      tableData: [],
      oldTableData: [], // 未转成树前的数据
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
      submitLoading: false
    }
  },
  created() {
    this.requestData()
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
        ids.push(...this.$util.getChildren(this.oldTableData, ids[0], false).map(item => { return item.id }))
        removeCategory({
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
      listCategory({
        pageNum: page.page,
        pageSize: page.limit,
        ...this.$refs['searchForm'] ? this.$refs['searchForm'].getData() : {}
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.oldTableData = res.data.rows
          this.tableData = this.$util.getTree(res.data.rows)
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
    // 搜索重置
    searchReset() {
      this.requestData()
    }
  }
}
</script>
