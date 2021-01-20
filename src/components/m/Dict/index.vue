<template>
  <div class="m-dict">
    <!--表单布局模式-->
    <slot v-if="mode==='form'" v-bind:dict="dict">
      <el-select :disabled="disabled" :size="size" v-model="mValue" v-if="dict.items" @change="handleChange">
        <el-option
          v-for="item in dict.items"
          :key="item.dictItemValue"
          :label="item.name"
          :disabled="item.disabled"
          :value="item.dictItemValue">
        </el-option>
      </el-select>
    </slot>
    <!--列表布局模式-->
    <slot v-else-if="mode==='list'" v-bind:dict="dict">
      <span v-for="item in dict.items" :key="item.dictItemValue">
        <el-tag :type="type" size="mini" v-if="item.dictItemValue === value">{{ item.name }}</el-tag>
      </span>
    </slot>
    <!--搜索表单布局模式-->
    <slot v-else-if="mode==='searchForm'" v-bind:dict="dict">
      <el-select :disabled="disabled" :size="size" v-model="mValue" v-if="dict.items" @change="handleChange">
        <el-option label="所有" :value="undefined"></el-option>
        <el-option
          v-for="item in dict.items"
          :key="item.dictItemValue"
          :label="item.name"
          :disabled="item.disabled"
          :value="item.dictItemValue">
        </el-option>
      </el-select>
    </slot>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MDict',
  props: {
    // 字典唯一编码(表名_字段名)
    dictKey: {
      type: String,
      default: undefined
    },
    // 字典类型(enum->枚举类字典类型,db->数据库字典类型,local->本地字典类型)
    // 不传的话，后端先查enum,再查db
    type: {
      type: String,
      default: 'enum'
    },
    // 绑定的值
    value: {
      type: [String, Number],
      default: undefined
    },
    size: { // medium/small/mini
      type: String,
      default: 'medium'
    },
    mode: { // form->普通表单,list->列表页,searchForm->搜索表单
      type: String,
      default: 'form'
    },
    placeholder: { //  占位符
      type: String,
      default: '请选择'
    },
    disabled: { //  占位符
      type: Boolean,
      default: false
    },
    // 自定义地址
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      mValue: this.value ? Number(this.value) : undefined
    }
  },
  computed: {
    ...mapGetters([
      'dictMap'
    ]),
    // 当前字典
    dict() {
      return this.dictMap[this.dictKey] || {}
    }
  },
  watch: {
    value(n) { // 监听父组件值变动，子组件也要变动
      this.mValue = n ? Number(n) : undefined
    }
  },
  created() {
    if (!this.dictMap[this.dictKey]) {
      // 这里调用store/modules/dict.js/action->getByDictKey
      this.$store.dispatch('dict/getByDictKey', {
        dictKey: this.dictKey,
        type: this.type,
        url: '/sys/dict/getByDictKey'
      })
    }
  },
  methods: {
    // 子组件值变化要通过父组件
    handleChange(value) {
      this.$emit('input', value ? Number(value) : undefined)
      this.$emit('change', value ? Number(value) : undefined)
    }
  }
}
</script>
