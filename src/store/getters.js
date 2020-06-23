const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  // 这里追加dictMap的get方法，可以使用mapGetters，详见src/components/m/Dict/index.vue
  dictMap: state => state.dict.dictMap
}
export default getters
