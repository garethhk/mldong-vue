import directive from './directives'

const importDirective = Vue => {
  /**
   * 权限指令
   * options ===>权限字符串数组 ['admin','/sys/role/add']
   */
  Vue.directive('hasPerm', directive.has)
}

export default importDirective
