const PROJECT = 'shenyang_xiaochengxu-'

const ADVERT_KEKY = 'advert'

// 设置储存token
const setTokenStorage = (token) => {
  uni.setStorageSync(`${PROJECT}token`, token)
}

// 获取token
const getTokenStorage = () => {
  return uni.getStorageSync(`${PROJECT}token`)
}

// 清除所有的localStorage储存
const deleteStorage = () => {
  // 登出时广告不应该被清除
  const advert = getAdvertStore()

  uni.clearStorageSync()

  setAdvertStore(advert)
}

// 设置广告
export function setAdvertStore(data) {
  setStorage(ADVERT_KEKY, data)
}

// 获取广告
export function getAdvertStore() {
  return getStorage(ADVERT_KEKY)
}


export function setStorage(key, data) {
  uni.setStorageSync(`${PROJECT}${key}`, data)
}

export function getStorage(key) {
  return uni.getStorageSync(`${PROJECT}${key}`)
}


export {
  setTokenStorage,
  getTokenStorage,
  deleteStorage
}
