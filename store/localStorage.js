const PROJECT = 'paiba_wx_app'
const TOKEN = `${PROJECT}_token`
const USERINFO = `${PROJECT}_userInfo`
const PERSONAL = `${PROJECT}_personalInfo`

// 清除所有的localStorage储存
export function deleteStorage() {
  uni.clearStorageSync()
}

export function setStorage(key, data) {
  uni.setStorageSync(`${PROJECT}${key}`, data)
}

export function getStorage(key) {
  return uni.getStorageSync(`${PROJECT}${key}`)
}

// 设置储存token
export function setTokenStorage(token) {
  uni.setStorageSync(TOKEN, token)
}

// 获取token
export function getTokenStorage() {
  return uni.getStorageSync(TOKEN)
}

// 设置用户信息
export function setUserInfoStorage(data) {
  setStorage(USERINFO, data)
}

// 获取用户信息
export function getUserInfoStorage() {
  return getStorage(USERINFO)
}

// 设置用户信息
export function setPersonalInfoStorage(data) {
  setStorage(PERSONAL, data)
}

// 获取用户信息
export function getPersonalInfoStorage() {
  return getStorage(PERSONAL)
}