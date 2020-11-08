<template>
  <div class="app-container">
    <el-page-header title="返回" content="" @back="goBack"></el-page-header>
    <!--start========表格列表===========start-->
    <el-table class="mt10" row-key="id" :tree-props="{children: 'children'}" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column prop="name" label="接口名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="routeName" label="权限标识">
        <template slot-scope="scope">
          {{ scope.row.access }}
        </template>
      </el-table-column>
      <el-table-column prop="isShow" label="接口地址">
        <template slot-scope="scope">
          {{ scope.row.uri }}
        </template>
      </el-table-column>
      <!--el-table-column prop="sort" label="排序">
        <template slot-scope="scope">
          {{ scope.row.sort }}
        </template>
      </el-table-column-->
      <el-table-column prop="name" label="备注">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
    </el-table>
    <!--end========表格列表===========end-->
    <!--start========弹框===========start-->
    <el-dialog :title="title" :visible.sync="isOpenDialog" width="500px" append-to-body @close="handleCancel" destroy-on-close>
      <component is-tree :ref="currentView" :is="currentView" :id="id"></component>
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
import { listApiList } from '@/api/sys/sys.rbac.service.js'

export default {
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
      listApiList({
        pageNum: page.page,
        pageSize: page.limit,
        ...this.$refs['searchForm'] ? this.$refs['searchForm'].getData() : {}
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.oldTableData = res.data.rows
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
    }
  }
}
</script>
