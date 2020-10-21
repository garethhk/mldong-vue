<template>
  <el-form ref="form" :model="form" :inline="true">
    <el-form-item label="岗位名称" prop="m_EQ_name">
      <el-input v-model="form.m_EQ_name" placeholder="请输入岗位名称" size="small" style="width: 240px"></el-input>
    </el-form-item>
    <el-form-item label="岗位编码" prop="m_EQ_code">
      <el-input v-model="form.m_EQ_code" placeholder="请输入岗位编码" size="small" style="width: 240px"></el-input>
    </el-form-item>
    <el-form-item label="是否启用" prop="m_EQ_isEnabled">
      <m-dict size="small" mode="searchForm" v-model="form.m_EQ_isEnabled" dict-key="yes_no"></m-dict>
    </el-form-item>
    <el-form-item label="创建时间" prop="m_BT_createTime">
      <el-date-picker
        v-model="form.m_BT_createTime"
        size="small"
        style="width: 240px"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">查询</el-button>
      <el-button icon="el-icon-refresh" size="small" @click="resetform">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
  },
  data() {
    return {
      form: {
        m_EQ_name: undefined,
        m_EQ_code: undefined,
        m_EQ_isEnabled: undefined,
        m_BT_createTime: undefined
      }
    }
  },
  methods: {
    // 搜索
    handleSearch(e) {
      this.$emit('on-search', this.form, e)
    },
    // 重置
    resetform(e) {
      this.$refs['form'].resetFields()
    },
    // 获取表单数据
    getData() {
      var data = Object.assign({}, this.form)
      return data
    }
  }
}
</script>
