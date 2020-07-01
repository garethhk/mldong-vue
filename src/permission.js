import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

// 进入页面前拦截
router.beforeEach(async(to, from, next) => {
  // 进度条开始
  NProgress.start()

  // 重设页面标题
  document.title = getPageTitle(to.meta.title)

  // 获取token，判断是否已经登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已经登录且是登录页，则重定向到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      // 判断用户信息是否存在，如果已经存在，则可以进入页面
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 拉取用户信息
          const { menuList } = await store.dispatch('user/getInfo')
          // 生成可访问的路由表
          const accessRoutes = await store.dispatch('permission/generateRoutes', menuList)
          // 动态添加可访问路由表
          router.addRoutes(accessRoutes)
          router.app.$nextTick(() => {
            next({ ...to, replace: true })
          })
        } catch (error) {
          // 获取用户信息失败，则删除会话信息并跳转到登录页
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 是白名单的页面，则可以进入页面
      next()
    } else {
      // 非白名单，则跳转到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// 进入页面后
router.afterEach(() => {
  // 进度条完成
  NProgress.done()
})
