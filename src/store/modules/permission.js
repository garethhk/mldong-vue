import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.access to determine if the current user has permission
 * @param menus
 * @param route
 */
function hasPermission(menus, route) {
  if (route.name) {
    var currMenu = getMenu(route.name, menus)
    if (currMenu !== null) {
      // 设置菜单的标题、图标
      if (currMenu.name) {
        route.meta.title = currMenu.name
      }
      if (currMenu.icon) {
        route.meta.icon = currMenu.icon
      }
      if (currMenu.sort) {
        route.sort = currMenu.sort
      }
      if (currMenu.remark) {
        route.meta.tagName = currMenu.remark
      }
      if (currMenu.tagName) {
        route.meta.tagName = currMenu.tagName
      }
    } else {
      route.sort = 10
    }
  }
  if (route.meta && route.meta.access) {
    return menus.some(menu => route.meta.access.includes(menu.routeName))
  } else {
    return true
  }
}
// 根据路由名称获取菜单
function getMenu(access, menus) {
  for (let i = 0; i < menus.length; i++) {
    var menu = menus[i]
    if (access === menu.routeName) {
      return menu
    }
  }
  return null
}
// 对菜单进行排序
function sortRouters(accessedRouters) {
  for (let i = 0; i < accessedRouters.length; i++) {
    var router = accessedRouters[i]
    if (router.children && router.children.length > 0) {
      router.children.sort(compare('sort'))
    }
  }
  accessedRouters.sort(compare('sort'))
}

// 降序比较函数
function compare(p) {
  return function(m, n) {
    var a = m[p]
    var b = n[p]
    return b - a
  }
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param menus
 */
export function filterAsyncRoutes(routes, menus) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(menus, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menus)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      var accessedRoutes = filterAsyncRoutes(asyncRoutes, menus)
      // 对菜单进行排序
      sortRouters(accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
