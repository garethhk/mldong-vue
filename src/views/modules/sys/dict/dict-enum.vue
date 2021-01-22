<template>
  <div style="margin-top:-20px">
    <el-form :inline="true">
      <el-form-item class="m-form-item" label="关键字">
        <el-input
          size="small"
          clearable
          placeholder="请输入关键字"
          prefix-icon="el-icon-search"
          type="text"
          v-model="keywords"></el-input>
      </el-form-item>
    </el-form>
    <el-table height="480px" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" v-loading="loading" :data="tableData">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.items" :show-header="false" size="mini">
            <el-table-column label="字典项名称" prop="name"></el-table-column>
            <el-table-column label="字典项键" prop="dictItemKey"></el-table-column>
            <el-table-column label="字典项值" prop="dictItemValue"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="dictKey" label="唯一编码">
        <template slot-scope="scope">
          {{ scope.row.dictKey }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { listAllEnum as listDict } from '@/api/sys/sys.dict.service.js'

export default {
  data() {
    return {
      loading: false,
      recordCount: 0,
      tableData: [],
      keywords: undefined,
      copyTableData: []
    }
  },
  watch: {
    keywords(n) {
      if (n) {
        this.tableData = this.copyTableData.filter(item => {
          return item.name.indexOf(n) !== -1 || item.dictKey.indexOf(n) !== -1
        })
      } else {
        this.tableData = this.copyTableData
      }
    }
  },
  created() {
    this.requestData()
  },
  methods: {
    // 请求数据
    requestData(page) {
      this.loading = true
      listDict({
      }).then(res => {
        this.loading = false
        if (res.code === 0) {
          this.tableData = res.data
          this.recordCount = res.data.length
          this.copyTableData = JSON.parse(JSON.stringify(res.data))
        }
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
