<template>
  <div>
    <el-tree
      ref="tree"
      :props="props"
      node-key="id"
      :data="treeData"
      :default-checked-keys="defaultCheckedKeys"
      :default-expanded-keys="defaultExpandedKeys"
      show-checkbox>
    </el-tree>
  </div>
</template>
<script>
import { listAccessTree, saveRoleAccess } from '@/api/sys/sys.rbac.service'
export default {
  props: {
    id: {
      type: [String, Number],
      default: undefined
    }
  },
  data() {
    return {
      props: {
        label: 'name',
        children: 'children'
      },
      // 树型数据
      treeData: [],
      // 默认勾选的节点的 key 的数组
      defaultCheckedKeys: [],
      // 默认展开的节点的 key 的数组
      defaultExpandedKeys: []
    }
  },
  watch: {
    id(n) {
      this.getData()
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 获取数据
    getData() {
      if (this.id) {
        listAccessTree({
          id: this.id
        }).then(res => {
          this.treeData = res.data.rows
          this.defaultCheckedKeys = res.data.defaultCheckedKeys
          this.defaultExpandedKeys = res.data.defaultExpandedKeys
        })
      }
    },
    // 提交
    submit() {
      return new Promise((resolve, reject) => {
        saveRoleAccess({
          ids: this.$refs['tree'].getCheckedKeys(),
          id: this.id
        }).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    }
  }
}
</script>
