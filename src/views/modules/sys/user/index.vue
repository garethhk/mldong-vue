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
          v-model="deptName">
        </el-input>
        <el-tree ref="tree" highlight-current :data="deptData" :props="defaultProps" :expand-on-click-node="false" default-expand-all @node-click="handleNodeClick" :filter-node-method="filterNode"></el-tree>
      </el-col>
      <el-col :span="20">
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
            <el-button v-hasPerm="['admin','sys:user:save']" type="primary" icon="el-icon-plus" size="small" @click="openDialog(undefined, '添加用户', 'Add', true)">
              添加
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPerm="['admin','sys:user:update']" type="success" icon="el-icon-edit" size="small" :disabled="single" @click="openDialog(ids[0], '修改用户', 'Edit', true)">
              修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button v-hasPerm="['admin','sys:user:remove']" type="danger" icon="el-icon-delete" size="small" :disabled="multiple" @click="handleRemove">
              删除
            </el-button>
          </el-col>
        </el-row>
        <!--end========顶部工具栏===========end-->
        <!--start========表格列表===========start-->
        <el-table stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" v-loading="loading" :data="tableData" @selection-change="handleSelectionChange">
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
          <el-table-column prop="deptName" label="部门">
            <template slot-scope="scope">
              {{ scope.row.deptName }}
            </template>
          </el-table-column>
          <el-table-column prop="mobilePhone" label="手机号">
            <template slot-scope="scope">
              {{ scope.row.mobilePhone }}
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              <m-dict mode="list" v-model="scope.row.sex" dict-key="sys_user_sex"></m-dict>
            </template>
          </el-table-column>
          <el-table-column prop="isLocked" label="是否锁定">
            <template slot-scope="scope">
              <m-dict mode="list" v-model="scope.row.isLocked" dict-key="yes_no"></m-dict>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间">
            <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button v-hasPerm="['admin','sys:user:get']" type="text" size="small" icon="el-icon-view" @click.native.stop="openDialog(scope.row.id, '查看用户', 'Details', false)">查看</el-button>
              <el-button v-hasPerm="['admin','sys:user:update']" type="text" size="small" icon="el-icon-edit" @click.native.stop="openDialog(scope.row.id, '修改用户', 'Edit', true)">修改</el-button>
              <el-button v-hasPerm="['admin','sys:user:remove']" type="text" size="small" icon="el-icon-delete" @click.native.stop="handleRemove(scope.row)">删除</el-button>
              <el-button v-hasPerm="['admin','sys:user:resetPassword']" type="text" size="small" icon="el-icon-setting" @click.native.stop="handleResetPassword(scope.row)">重置密码</el-button>
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
          <component :ref="currentView" :is="currentView" :id="id"></component>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" v-if="showOk" :loading="submitLoading" @click="handleSubmit">确 定</el-button>
            <el-button @click="handleCancel">取 消</el-button>
          </div>
        </el-dialog>
        <!--end========弹框===========end-->
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MSearch from './components/search'
import Add from './add'
import Edit from './edit'
import Details from './details'
import { listWithExt as listUser, remove as removeUser, resetPassword } from '@/api/sys/sys.user.service.js'
import { list as listDept } from '@/api/sys/sys.dept.service.js'
export default {
  name: 'SysUserIndex',
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
      oldDeptData: [],
      deptData: [],
      m_IN_deptId: undefined,
      deptName: undefined
    }
  },
  watch: {
    deptName(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.requestData()
    listDept({
      pageNum: 1,
      pageSize: 10000
    }).then(res => {
      if (res.code === 0) {
        this.oldDeptData = res.data.rows
        this.deptData = this.$util.getTree(res.data.rows)
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
        removeUser({
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
    handleResetPassword(row) {
      this.$confirm('此操作重置用户密码, 是否继续?', '提示', {
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
        resetPassword({
          ids: ids
        }).then(res => {
          if (res.code === 0) {
            this.$message({ message: '重置用户密码成功', type: 'success' })
            this.requestData()
          } else {
            this.$message({ message: res.msg || '重置用户密码失败', type: 'error' })
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
      listUser({
        pageNum: page.page,
        pageSize: page.limit,
        ...this.$refs['searchForm'] ? this.$refs['searchForm'].getData() : {},
        m_IN_deptId: this.m_IN_deptId
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
      // m_IN_deptId
      var ids = [data.id]
      ids.push(...this.$util.getChildren(this.oldDeptData, ids[0], false).map(item => { return item.id }))
      this.m_IN_deptId = ids
      this.requestData()
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    searchReset() {
      this.m_IN_deptId = undefined
      this.requestData()
    }
  }
}
</script>
