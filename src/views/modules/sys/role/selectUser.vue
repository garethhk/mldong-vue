<template>
  <div class="app-container">
    <el-form ref="searchForm" :model="searchForm" :inline="true">
      <el-form-item label="关键字" prop="keywords">
        <el-input v-model="searchForm.keywords" placeholder="请输入用户名、手机号" size="small" style="width: 240px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">查询</el-button>
        <el-button icon="el-icon-refresh" size="small" @click="resetform">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="userName" label="用户名">
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column prop="realName" label="姓名">
        <template slot-scope="scope">
          {{ scope.row.realName }}
        </template>
      </el-table-column>
      <el-table-column prop="mobilePhone" label="手机号">
        <template slot-scope="scope">
          {{ scope.row.mobilePhone }}
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="recordCount>0"
      :total="recordCount"
      :page.sync="pageNum"
      :limit.sync="pageSize"
      @pagination="requestData"
    />
  </div>
</template>
<script>
import { listUserNoInRole, saveUserRole } from '@/api/sys/sys.rbac.service.js'
export default {
  props: {
    id: {
      type: [String, Number],
      default: undefined
    }
  },
  data() {
    return {
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总记录数
      recordCount: 0,
      // 表格数据加载中
      loading: false,
      // 弹出层
      open: false,
      // 弹出层内容
      dialogContent: 'add',
      // 是否显示Ok
      showOk: true,
      // 当前弹出层标题
      title: '',
      // 列表数据
      tableData: [],
      // 提交按钮状态
      submitLoading: false,
      // 当前页
      pageNum: 1,
      // 每页大小
      pageSize: Number(process.env.VUE_APP_PAGE_SIZE),
      // 当前勾选行id
      ids: [],
      // 当前勾选行集合
      selection: [],
      searchForm: {
        keywords: undefined
      }
    }
  },
  watch: {
    id(n) {
      this.requestData()
    }
  },
  mounted() {
    this.requestData()
  },
  methods: {
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.selection = selection
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    // 请求数据
    requestData(page) {
      if (!this.id) {
        return
      }
      if (!page) {
        page = {
          page: this.pageNum,
          limit: this.pageSize
        }
      }
      this.loading = true
      listUserNoInRole({
        pageNum: page.page,
        pageSize: page.limit,
        roleId: this.id,
        ...this.searchForm
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
    // 查询
    handleSearch() {
      this.requestData()
    },
    // 重置
    resetform(e) {
      this.$refs['searchForm'].resetFields()
    },
    resetFields() {
      this.$refs['searchForm'].resetFields()
      this.requestData()
    },
    // 提交
    submit() {
      return new Promise((resolve, reject) => {
        if (!this.ids.length) {
          reject(new Error('id不能为空'))
          return
        }
        saveUserRole({
          ids: this.ids,
          id: this.id
        }).then(res => {
          this.$parent.$parent.$refs.drawer.requestData()
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
