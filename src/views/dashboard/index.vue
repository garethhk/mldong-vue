<template>
  <div class="dashboard-container">
    <h3>自定义布局</h3>
    <m-dict v-model="form.roleType" dict-key="sys_role_role_type">
      <template v-slot:default="{ dict }">
        <el-select v-model="form.roleType" v-if="dict.items">
          <el-option
            v-for="item in dict.items"
            :key="item.dictItemValue"
            :label="item.name"
            :value="item.dictItemValue">
          </el-option>
        </el-select>
      </template>
    </m-dict>
    <h3>表单布局模式</h3>
    <m-dict v-model="form.roleType" dict-key="sys_role_role_type"></m-dict>
    <h5>当前值：{{ form.roleType }}</h5>
    <h3>列表布局模式</h3>
    <m-dict mode="list" v-model="form.roleType" dict-key="sys_role_role_type"></m-dict>
    <h3>搜索布局模式</h3>
    <m-dict mode="searchForm" v-model="form.roleType" dict-key="sys_role_role_type"></m-dict>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      form: {
        roleType: 20
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
