<template>
  <div class="app-container">
    <el-button
      style="margin-bottom:10px;margin-left:10px;"
      type="primary"
      icon="el-icon-plus"
      size="small"
      @click="handleOpenSelectUser"
      v-hasPerm="['admin','sys:rbac:saveUserRole']"
    >新增</el-button>
    <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" v-loading="loading" :data="tableData">
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
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-delete" v-hasPerm="['admin','sys:rbac:deleteUserRole']" @click.native.stop="handleDeleteUserRole(scope.row.id)">移除</el-button>
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
import { listUserByRoleId, deleteUserRole } from '@/api/sys/sys.rbac.service.js'
export default {
  props: {
    id: {
      type: [String, Number],
      default: undefined
    }
  },
  data() {
    return {
      // 总记录数
      recordCount: 0,
      // 表格数据加载中
      loading: false,
      // 列表数据
      tableData: [],
      // 当前页
      pageNum: 1,
      // 每页大小
      pageSize: Number(process.env.VUE_APP_PAGE_SIZE)
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
      listUserByRoleId({
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
    // 打开弹窗--使用index.vue中的dialog，所以需要$parent.$parent selectUser -> drawer->index.vue
    handleOpenSelectUser() {
      this.$parent.$parent.openDialog(this.id, `选择用户`, 'selectUser', true)
    },
    handleDeleteUserRole(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var ids = []
        if (id) {
          ids.push(id)
        } else {
          return
        }
        deleteUserRole({
          ids: ids,
          id: this.id
        }).then(res => {
          if (res.code === 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.requestData()
          } else {
            this.$message({
              message: res.msg || '删除失败',
              type: 'error'
            })
          }
        })
      }).catch((e) => {
        this.$message({
          type: 'info',
          message: '已取消删除' + e
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
