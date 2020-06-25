<template>
  <div class="m-select">
    <!--el-input readonly :size="size" :placeholder="placeholder" v-model="mValue">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input-->
    <el-select
      :size="size"
      filterable
      :multiple="multiple"
      remote
      :loading="loading"
      :remote-method="requestData"
      :placeholder="placeholder"
      @change="handleChange"
      v-model="mValue">
      <el-option
        v-for="item in options"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="item[valueKey]">
        <slot v-bind:option="item"> </slot>
      </el-option>
    </el-select>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'MSelect',
  props: {
    valueKey: { // 列表中选项的值对应的key
      type: String,
      default: 'id'
    },
    labelKey: { // 列表中选项的标签对应的key
      type: String,
      default: 'name'
    },
    searchKey: { // 模糊搜索的key
      type: String,
      default: 'name'
    },
    url: { // 接口地址
      type: String,
      default: undefined
    },
    isEdit: { // 是否编辑模式
      type: Boolean,
      default: false
    },
    // 绑定的值
    value: {
      type: [String, Number, Array],
      default: undefined
    },
    multiple: { // 是否多选
      type: Boolean,
      default: false
    },
    size: { // medium/small/mini
      type: String,
      default: 'medium'
    },
    placeholder: { //  占位符
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      loading: false,
      mValue: undefined,
      options: []
    }
  },
  watch: {
    value(n, o) { // 监听父组件值变动，子组件也要变动
      this.mValue = n
      if ((o === undefined && this.isEdit) || (o !== undefined && o.length === 0 && this.isEdit)) {
        // 如果旧的值等于undefined
        this.requestData('')
      }
    }
  },
  created() {
    if (!this.isEdit) {
      this.requestData('')
    }
  },
  methods: {
    // 请求数据
    requestData(k) {
      if (this.url) {
        this.loading = true
        var operateType = this.multiple ? 'IN' : 'EQ'
        request({
          url: this.url,
          method: 'post',
          data: {
            ['m_LIKE_' + this.searchKey]: k,
            [`mor_${operateType}_` + this.valueKey]: this.value
          }
        }).then(res => {
          this.loading = false
          if (res.code === 0) {
            this.options = res.data.rows
          }
        }).catch(() => {
          this.loading = false
        })
      }
    },
    // 子组件值变化要通过父组件
    handleChange(value) {
      this.$emit('input', value)
    }
  }
}
</script>
