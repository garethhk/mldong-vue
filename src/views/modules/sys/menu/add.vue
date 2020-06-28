<template>
  <m-form ref="form" :is-edit="false" :id="id"></m-form>
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
    submit() {
      return this.$refs.form.submit()
    },
    resetFields() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
