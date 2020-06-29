const directives = {
  has: {
    inserted: function(el, binding, vnode) {
      var arr = binding.value
      //  判断要查询的数组(arr)是否至少有一个元素包含在目标数组(vnode.context.$store.state.user.access)中
      if (!vnode.context.$store.state.user.accessList.some(_ => arr.indexOf(_) > -1)) {
        vnode.context.$nextTick(() => {
          if (el.parentNode) {
            el.parentNode.removeChild(el)
          }
        })
      }
    }
  }
}

export default directives
