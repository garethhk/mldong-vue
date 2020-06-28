<template>
  <el-form ref="form" :model="form" :inline="true">
    <el-form-item label="名称" prop="m_LIKE_name">
      <el-input v-model="form.m_LIKE_name" placeholder="请输入名称" size="small" style="width: 240px"></el-input>
    </el-form-item>
    <el-form-item label="唯一编码" prop="m_EQ_dictKey">
      <el-input v-model="form.m_EQ_dictKey" placeholder="请输入唯一编码" size="small" style="width: 240px"></el-input>
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
        m_LIKE_name: undefined,
        m_EQ_dictKey: undefined
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
