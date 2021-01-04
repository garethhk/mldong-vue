<template>
  <el-form ref="form" :model="form" :inline="true">
    <el-form-item label="是否导航" prop="m_EQ_isNav">
      <m-dict size="small" mode="searchForm" v-model="form.m_EQ_isNav" dict-key="yes_no"></m-dict>
    </el-form-item>
    <el-form-item label="是否显示" prop="m_EQ_isShow">
      <m-dict size="small" mode="searchForm" v-model="form.m_EQ_isShow" dict-key="yes_no"></m-dict>
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
        m_EQ_isNav: undefined,
        m_EQ_isShow: undefined
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
      this.$emit('on-reset', e)
    },
    // 获取表单数据
    getData() {
      var data = Object.assign({}, this.form)
      return data
    }
  }
}
</script>
