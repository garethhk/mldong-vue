<template>
  <div class="dashboard-container">
    <el-row type="flex">
      <el-col :span="12">
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
      </el-col>
      <el-col :span="12">
        <h3>选择单个</h3>
        <m-select v-model="userId" url="sys/user/list" value-key="id" label-key="userName" search-key="userName"></m-select>
        <h3>选择单个-修改模式</h3>
        <m-select is-edit v-model="form.userId" url="sys/user/list" value-key="id" label-key="userName" search-key="userName"></m-select>
        <h3>选择多个</h3>
        <m-select multiple v-model="userIds" url="sys/user/list" value-key="id" label-key="userName" search-key="userName"></m-select>
        <h3>选择多个-修改模式</h3>
        <m-select multiple is-edit v-model="form.userIds" url="sys/user/list" value-key="id" label-key="userName" search-key="userName"></m-select>
        <h3>自定义布局</h3>
        <m-select v-model="userId" url="sys/user/list" value-key="id" label-key="userName" search-key="userName">
          <template v-slot:default="{ option }">
            <span>{{ option.id }}--{{ option.userName }}</span>
          </template>
        </m-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      form: {
        roleType: 20,
        userId: undefined,
        userIds: []
      },
      userId: undefined,
      userIds: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    // 模拟修改异步更新
    setTimeout(() => {
      this.$set(this.form, 'userId', 1)
      this.$set(this.form, 'userIds', [1, 9])
    }, 2000)
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
