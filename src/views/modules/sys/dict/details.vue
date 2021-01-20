<template>
  <el-form :inline="false" class="m-form" size="mini" ref="form" :model="form" label-width="80px">
    <el-card class="box-card" style="margin-top:-30px;">
      <div slot="header" class="clearfix">
        <span class="el-page-header__content">字典信息</span>
      </div>
      <el-row>
        <el-col :span="9">
          <el-form-item class="m-form-item" label="名称" prop="name">
            <span>{{ form.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="m-form-item" label="唯一编码" prop="dictKey">
            <span>{{ form.dictKey }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item class="m-form-item" label="备注" prop="remark">
            <span>{{ form.remark }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" style="margin-top:10px;">
      <div slot="header" class="clearfix">
        <span class="el-page-header__content">字典项</span>
      </div>
      <el-table stripe :data="tableData">
        <el-table-column prop="name" label="名称">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column prop="dictItemValue" label="值" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.dictItemValue }}
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.sort }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template slot-scope="scope">
            {{ scope.row.remark }}
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="recordCount>pageSize"
        :total="recordCount"
        :page.sync="pageNum"
        :limit.sync="pageSize"
        @pagination="requestData"
      />
    </el-card>
  </el-form>
</template>
<script>
import { get as getDict } from '@/api/sys/sys.dict.service.js'
import { list as listDictItem } from '@/api/sys/sys.dictItem.service.js'

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
        name: undefined,
        dictKey: undefined,
        remark: undefined,
        id: undefined
      },
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
    id(n, o) {
      this.getDetails()
    }
  },
  mounted() {
    this.getDetails()
  },
  methods: {
    resetFields() {
      this.$refs['form'].resetFields()
      this.$refs['form'].clearValidate()
    },
    getDetails() {
      if (this.id) {
        getDict({
          id: this.id
        }).then(res => {
          this.form = this.$util.copy(res.data, this.form)
        })
        this.requestData()
      }
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
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
