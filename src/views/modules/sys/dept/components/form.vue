<template>
  <el-form :inline="true" class="m-form" ref="form" :model="form" :rules="rules" label-width="120px">
    <el-form-item class="m-form-item" label="父部门" prop="parentId">
      <m-select-tree :is-edit="isEdit||isTree" v-model="form.parentId" url="/sys/dept/list"></m-select-tree>
    </el-form-item>
    <el-form-item class="m-form-item" label="部门名称" prop="name">
      <el-input type="text" v-model="form.name" placeholder="请输入部门名称"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="部门编码" prop="code">
      <el-input type="text" v-model="form.code" placeholder="请输入部门编码"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="联系人手机号" prop="contacts">
      <el-input type="text" v-model="form.contacts" placeholder="请输入联系人手机号"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="电话" prop="telephone">
      <el-input type="text" v-model="form.telephone" placeholder="请输入电话"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="邮箱" prop="email">
      <el-input type="text" v-model="form.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="地址" prop="address">
      <el-input type="text" v-model="form.address" placeholder="请输入地址"></el-input>
    </el-form-item>
    <el-form-item class="m-form-item" label="是否启用" prop="isEnabled">
      <m-dict mode="form" v-model="form.isEnabled" dict-key="yes_no"></m-dict>
    </el-form-item>
    <el-form-item class="m-form-item" label="排序" prop="sort">
      <el-input type="text" v-model="form.sort" placeholder="请输入排序"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { save as saveDept, update as updateDept, get as getDept } from '@/api/sys/sys.dept.service.js'

export default {
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
        code: undefined,
        contacts: undefined,
        telephone: undefined,
        email: undefined,
        address: undefined,
        isEnabled: 2,
        sort: undefined,
        id: undefined
      },
      rules: {
        parentId: [
          { required: false, message: '父部门不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' }
        ],
        contacts: [
          { required: false, message: '联系人手机号不能为空', trigger: 'blur' }
        ],
        telephone: [
          { required: false, message: '电话不能为空', trigger: 'blur' }
        ],
        email: [
          { required: false, message: '邮箱不能为空', trigger: 'blur' }
        ],
        address: [
          { required: false, message: '地址不能为空', trigger: 'blur' }
        ],
        isEnabled: [
          { required: true, message: '是否启用不能为空', trigger: 'blur' }
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
    submit(isShowMessage = 1) {
      return new Promise((resolve, reject) => {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.isEdit) {
              updateDept(this.form).then(res => {
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
              saveDept(this.form).then(res => {
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
        getDept({
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
.m-form {
  font-size:0;// 解决空白折叠问题
  .m-form-item {
    width: 50%;
    margin-right:0px; // 重写默认margin-right:10px;
  }
}
</style>
