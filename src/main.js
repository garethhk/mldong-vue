import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import Pagination from '@/components/Pagination'
Vue.component('Pagination', Pagination)
// 处理自定义组件全局注册
const files = require.context('./components/m', true, /\.vue$/)
files.keys().forEach((routerPath) => {
  const componentName = routerPath.replace(/^\.\/(.*)\/index\.\w+$/, '$1')
  const value = files(routerPath)
  Vue.component('m' + componentName.replace(/([A-Z])/g, '-$1').toLowerCase(), value.default)
}, {})
import '@/styles/index.scss' // global css
import * as util from '@/utils/util'
Vue.prototype.$util = util
import mixins from '@/mixins'
Vue.mixin(mixins)
import App from './App'
import store from './store'
import router from './router'
import importDirective from '@/directive'
/**
 * 注册指令
 */
importDirective(Vue)
import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
