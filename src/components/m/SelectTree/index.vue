<template>
  <div class="m-select-tree">
    <el-input readonly :size="size" :placeholder="placeholder" v-model="mValue">
      <el-button slot="append" icon="el-icon-search" @click="openDialog"></el-button>
    </el-input>
    <el-dialog :title="dialogTitle" :visible.sync="isOpenDialog" :width="dialogWidth" append-to-body @close="handleCancel">
      <el-tree
        :props="defaultProps"
        :data="treeData"
        node-key="id"
        highlight-current
        :default-expand-all="defaultExpandAll"
        @current-change="handleCurrentChange"
        ref="tree">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from '@/utils/request'
export default {
  name: 'MSelectTree',
  props: {
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
    },
    dialogTitle: { //  弹窗标题
      type: String,
      default: '请选择'
    },
    dialogWidth: { // 弹窗宽度
      type: String,
      default: '30%'
    },
    defaultExpandAll: { // 是否默认展开所有节点
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mValue: '根节点', // 显示的文本值
      isOpenDialog: false, // 是否打开弹窗
      treeData: [], // 树型结构
      defaultProps: { // elementui树型组件默认属性配置
        children: 'children',
        label: 'name'
      }
    }
  },
  watch: {
    value(n, o) { // 监听父组件值变动，子组件也要变动
      if (o === undefined || o === 0) {
        this.refreshView()
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.requestData()
    }
  },
  methods: {
    requestData() {
      if (this.treeData.length) {
        this.$nextTick(() => {
          // dom更新完成再设置当前选中项
          this.refreshView()
        })
        return
      }
      if (this.url) {
        request({
          url: this.url,
          method: 'post',
          data: {
            pageNum: 1,
            pageSize: 10000
          }
        }).then(res => {
          if (res.code === 0) {
            this.treeData = [
              {
                id: 0,
                name: '根节点',
                children: []
              },
              // 这里使用工具方法将id/parentId数据结构转成children结构
              ...this.$util.getTree(res.data.rows)
            ]
            this.$nextTick(() => {
              // dom更新完成再设置当前选中项
              this.refreshView()
            })
          }
        })
      }
    },
    openDialog() { // 打开弹出框
      this.isOpenDialog = true
      this.requestData()
    },
    handleSubmit() {
      this.isOpenDialog = false
    },
    handleCancel() {
      this.isOpenDialog = false
    },
    // 处理当前选中节点变化时触发的事件
    handleCurrentChange(data) {
      // 修改显示
      this.mValue = data.name
      // 子组件值变化要通过父组件
      this.$emit('input', data.id)
    },
    // 刷新页面元素
    refreshView() {
      if (this.$refs.tree) {
        if (this.value === undefined) {
          this.$refs.tree.setCurrentKey(0)
        } else {
          this.$refs.tree.setCurrentKey(this.value)
        }
      }
      if (this.isEdit) {
        var nodes = this.treeData.filter(item => {
          return item.id === this.value
        })
        if (nodes.length) {
          this.mValue = nodes[0].name
        }
      }
    }
  }
}
</script>
