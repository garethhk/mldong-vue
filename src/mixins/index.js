const mixins = {
  methods: {
    // 图片url包裹处理
    wrapImgUrl: function(url) {
      if (!url) {
        return ''
      }
      if (url.indexOf('http') === 0) {
        return url
      }
      return process.env.VUE_APP_IMG_BASE_URL + url
    },
    // 返回
    goBack() {
      this.$router.go(-1)
    },
    // 元素在数组里
    inArray(v, arr) {
      var index = -1
      for (var i = 0; i < arr.length; i++) {
        if (v === arr[i]) {
          index = i
          break
        }
      }
      return index !== -1
    },
    // 元素不在数组里
    notInArray(v, arr) {
      return !this.inArray(v, arr)
    },
    /**
     * 打开弹窗
     * @param {} id  当前行id
     * @param {*} title 弹窗标题
     * @param {*} currentView 当前view-组件
     * @param {*} showOk 是否显示ok
     */
    openDialog(id, title, currentView, showOk = true) {
      this.id = id
      this.title = title || ''
      this.isOpenDialog = true
      this.currentView = 'Edit'
      this.showOk = showOk
    }
  }
}
export default mixins
