<template>
  <m-form ref="form" is-tree :is-edit="true" :id="id"></m-form>
</template>
<script>
import MForm from './components/form'

export default {
  components: { MForm },
  props: {
    id: {
      type: [String, Number],
      default: undefined
    }
  },
  methods: {
    resetFields() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
