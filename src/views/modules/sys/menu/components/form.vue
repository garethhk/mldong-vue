<template>
  <el-form :inline="false" class="m-form" ref="form" :model="form" :rules="rules" label-width="100px">
    <el-form-item class="m-form-item" label="父菜单" prop="parentId">
      <m-select-tree :is-edit="isEdit||isTree" v-model="form.parentId" url="/sys/menu/list"></m-select-tree>
    </el-form-item>
    <el-form-item class="m-form-item" label="菜单名称" prop="name">
      <el-input type="text" v-model="form.name" placeholder="请输入菜单名称"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="路由地址" prop="path">
      <el-input type="text" v-model="form.path" placeholder="请输入路由地址"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="权限标识" prop="routeName">
      <el-input type="text" v-model="form.routeName" placeholder="请输入权限标识"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="菜单图标" prop="icon">
      <el-popover
        placement="bottom-start"
        width="460"
        trigger="click"
        @show="$refs['iconSelect'].reset()"
      >
        <IconSelect ref="iconSelect" @selected="selected" />
        <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
          <svg-icon
            v-if="form.icon"
            slot="prefix"
            :icon-class="form.icon"
            class="el-input__icon"
            style="height: 32px;width: 16px;"
          />
          <i v-else slot="prefix" class="el-icon-search el-input__icon" />
        </el-input>
      </el-popover>
    </el-form-item>
    <el-form-item class="m-form-item" label="是否显示" prop="isShow">
      <m-dict mode="form" v-model="form.isShow" dict-key="yes_no"></m-dict>
    </el-form-item>
    <el-form-item class="m-form-item" label="排序" prop="sort">
      <el-input type="text" v-model="form.sort" placeholder="请输入排序"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="备注" prop="remark">
      <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { save as saveMenu, update as updateMenu, get as getMenu } from '@/api/sys/sys.menu.service.js'
import IconSelect from '@/components/IconSelect'

export default {
  components: { IconSelect },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    isTree: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number],
      default: undefined
    }
  },
  data() {
    return {
      form: {
        parentId: undefined,
        name: undefined,
        routeName: undefined,
        path: undefined,
        isShow: 2,
        sort: undefined,
        id: undefined,
        icon: undefined,
        remark: undefined
      },
      rules: {
        parentId: [
          { required: false, message: '父菜单不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ],
        routeName: [
          { required: true, message: '权限标识不能为空', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '路由地址不能为空', trigger: 'blur' }
        ],
        isShow: [
          { required: true, message: '是否显示不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: false, message: '排序不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    id(n, o) {
      this.getDetails()
    }
  },
  mounted() {
    this.getDetails()
  },
  methods: {
    // 选择图标
    selected(name) {
      this.form.icon = name
    },
    submit(isShowMessage = 1) {
      return new Promise((resolve, reject) => {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.isEdit) {
              updateMenu(this.form).then(res => {
                if (isShowMessage) {
                  if (res.code === 0) {
                    this.$message({
                      message: res.msg || '操作成功',
                      type: 'success'
                    })
                  }
                }
                resolve(res)
              }).catch(e => {
                reject(e)
              })
            } else {
              delete this.form.id
              saveMenu(this.form).then(res => {
                if (isShowMessage) {
                  if (res.code === 0) {
                    this.$message({
                      message: res.msg || '操作成功',
                      type: 'success'
                    })
                  }
                }
                resolve(res)
              }).catch(e => {
                reject(e)
              })
            }
          } else {
            reject(new Error('error'))
          }
        })
      })
    },
    resetFields() {
      this.$refs['form'].resetFields()
      this.$refs['form'].clearValidate()
    },
    getDetails() {
      if (this.id) {
        getMenu({
          id: this.id
        }).then(res => {
          if (this.isEdit) {
            this.form = this.$util.copy(res.data, this.form)
          } else {
            this.$set(this.form, 'parentId', res.data.id)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
