<template>
  <m-form ref="form" :is-edit="false" :id="id" :category="category"></m-form>
</template>
<script>
import MForm from './components/form'

export default {
  components: { MForm },
  props: {
    id: {
      type: [String, Number],
      default: undefined
    },
    category: {
      type: Object,
      default() {
        return {}
      }
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
