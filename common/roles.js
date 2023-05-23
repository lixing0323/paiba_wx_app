import store from '@/store'

function getRoles() {
  let roles = []
  const userInfo = store.getters.userInfo
  roles = userInfo && userInfo.roles ? userInfo.roles.map(i => i.name) : []
  return roles
}

// 是否未登录用户
export function isUnLoginUser() {
  return !store.getters.userInfo && store.getters.token
}

export function isLogOutUser() {
  return !store.getters.userInfo && !store.getters.token
}

// 是否客户登录
export function isCustomer() {
  return getRoles().includes('CUSTOMER')
}

// 是否客户经理登录
export function isStaff() {
  return getRoles().includes('ACCOUNT_MANAGER')
}


export function isAdmin() {
  return getRoles().includes('ADMIN')
}

// 是否为审核通过版本
export function isFormalVersion(version) {
  return (version && (version.versionStatus === 'Formal')) || (version && (version.versionNum > process.env
    .VUE_APP_WX_VERSION))
}
