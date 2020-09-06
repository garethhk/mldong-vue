<template>
  <el-form ref="form" :model="form" :inline="true">
    <el-form-item label="操作说明" prop="m_LIKE_description">
      <el-input v-model="form.m_LIKE_description" placeholder="请输入操作说明" size="small" style="width: 240px"></el-input>
    </el-form-item>
    <el-form-item label="请求类型" prop="m_EQ_requestType">
      <m-dict size="small" mode="searchForm" v-model="form.m_EQ_requestType" dict-key="sys_request_log_request_type"></m-dict>
    </el-form-item>
    <el-form-item label="用户名" prop="m_EQ_userName">
      <el-input v-model="form.m_EQ_userName" placeholder="请输入用户名" size="small" style="width: 240px"></el-input>
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
        m_LIKE_description: undefined,
        m_EQ_requestType: undefined,
        m_EQ_userName: undefined
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
