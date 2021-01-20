<template>
  <div class="app-container">
    <el-button
      style="margin-bottom:10px;margin-left:10px;"
      type="primary"
      icon="el-icon-plus"
      size="small"
      @click="handleOpenAddDictItem"
      v-hasPerm="['admin','sys:dictItem:save']"
    >新增</el-button>
    <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" v-loading="loading" :data="tableData">
      <el-table-column prop="name" label="名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="dictItemValue" label="值">
        <template slot-scope="scope">
          {{ scope.row.dictItemValue }}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序">
        <template slot-scope="scope">
          {{ scope.row.sort }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-delete" v-hasPerm="['admin','sys:dictItem:remove']" @click.native.stop="handleDeleteDictItem(scope.row.id)">移除</el-button>
          <el-button type="text" size="small" icon="el-icon-edit" v-hasPerm="['admin','sys:dictItem:update']" @click.native.stop="handleOpenEditDictItem(scope.row)">修改</el-button>
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
import { list as listDictItem, remove as removeDictItem } from '@/api/sys/sys.dictItem.service.js'
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
      listDictItem({
        pageNum: page.page,
        pageSize: page.limit,
        m_EQ_dictId: this.id,
        orderBy: 'sort asc',
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
    handleOpenAddDictItem() {
      this.$parent.$parent.openDialog(this.id, `添加字典项`, 'dictitem', true)
    },
    // 打开弹窗--使用index.vue中的dialog，所以需要$parent.$parent selectUser -> drawer->index.vue
    handleOpenEditDictItem(row) {
      this.$parent.$parent.openDialog(this.id, `修改字典项`, 'dictitem', true)
      this.$nextTick(() => {
        // this.$parent.$parent.$refs['dictitem'].form = this.$util.copy(row, this.$parent.$parent.$refs['dictitem'].form)
        this.$parent.$parent.$refs['dictitem'].dictItemId = row.id
        this.$parent.$parent.$refs['dictitem'].isEdit = true
      })
    },
    handleDeleteDictItem(id) {
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
        removeDictItem({
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
