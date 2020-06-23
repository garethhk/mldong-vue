import request from '@/utils/request'

const getDefaultState = () => {
  return {
    // 字典map
    dictMap: {}
  }
}

const state = getDefaultState()

const mutations = {
  // 保存字典项
  SAVE_DICT_ITEM: (state, data) => {
    var obj = {}
    obj[data.dictKey] = data
    // 需要拷贝一份，要不然数据变动监听不到
    state.dictMap = Object.assign({}, state.dictMap, obj)
  },
  // 移除字典项
  DELETE_DICT_ITEM: (state, dictKey) => {
    delete state.dictMap[dictKey]
  }
}

const actions = {
  // 获取字典的action
  getByDictKey({ commit }, data) {
    return new Promise((resolve, reject) => {
      if (state.dictMap[data.dictKey]) {
        resolve()
      } else {
        // 防止同一个key多次请求
        commit('SAVE_DICT_ITEM', {
          dictKey: data.dictKey,
          items: []
        })
        // 这里暂不用api.service.js
        request({
          url: '/sys/dict/getByDictKey',
          method: 'post',
          data
        }).then(res => {
          if (res.code === 0 && res.data) {
            commit('SAVE_DICT_ITEM', res.data)
          } else {
            commit('DELETE_DICT_ITEM', data.dictKey)
          }
          resolve()
        }).catch(error => {
          commit('DELETE_DICT_ITEM', data.dictKey)
          reject(error)
        })
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
