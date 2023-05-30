import {
  setTokenStorage,
  getTokenStorage,
  getUserInfoStorage,
  setUserInfoStorage,
  deleteStorage
} from '@/store/localStorage'

const state = {
  token: getTokenStorage(),
  code: '',
  userInfo: getUserInfoStorage()
}

const mutations = {
  token(state, token) {
    state.token = token
  },
  userInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  // 保存token到本地缓存
  saveToken({
    commit
  }, accessToken) {
    commit('token', accessToken)
    setTokenStorage(accessToken)
  },

  // 存储用户信息
  saveUserInfo({
    dispatch,
    commit
  }, userInfo) {
    commit('userInfo', userInfo)
    setUserInfoStorage(userInfo)
  },

  // 登入
  login({
    dispatch,
    commit
  }, data) {
    const {
      token,
      userInfo
    } = data
    dispatch('saveToken', token)
    dispatch('saveUserInfo', userInfo)
  },

  // 登出
  logout({
    commit
  }) {
    commit('userInfo', '')
    commit('token', '')
    deleteStorage()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}