import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// import app from './modules/app'
// import settings from './modules/settings'
// import user from './modules/user'
// 自动注册vuex模块
const files = require.context('./modules', true, /\.js$/)
var modules = {}
files.keys().forEach((routerPath) => {
  const name = routerPath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = files(routerPath)
  const fileModule = value.default
  modules[name] = fileModule
}, {})
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ...modules
  },
  getters
})

export default store
