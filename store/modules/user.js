import {
	setStorage,
	getStorage,
	deleteStorage
} from '@/store/localStorage'

const state = {
	token: getStorage('token'),
	code: '',
	userInfo: getStorage('userInfo')
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
		setStorage('token', accessToken)
	},

	// 存储用户信息
	saveUserInfo({
    dispatch,	commit
	}, userInfo) {
		commit('userInfo', userInfo)
    setStorage('userInfo', userInfo)
	},

  saveUserInfoWithToken({
    dispatch,	commit
	}, data) {
    const { accessToken, userInfo } = data
    dispatch('saveToken', accessToken)
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
