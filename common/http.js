import Request from '@/js_modules/luch-request/index.js'
import {
  getTokenStorage
} from '@/store/localStorage.js'
import store from '@/store/index.js'

const http = new Request()

// attach token
http.setConfig(config => {
  config.baseURL = process.env.VUE_APP_API_BASE_URL
  config.header = {
    ...config.header,
    token: getTokenStorage(),
    wxaVersion: process.env.VUE_APP_WX_VERSION
  }
  return config
})

http.interceptors.request.use((config) => {
  /* 请求之前拦截器 */
  // GET 方法不能用'content-type': 'application/json'，会导致错误，所以需要改变成 'text/plain'
  // errMsg: "The browser (or proxy) sent a request that this server could not understand."
  if (config.method === 'GET') {
    config.header['content-type'] = 'text/plain'
  }
  config.header = {
    ...config.header,
    'Authorization': `JWT ${getTokenStorage()}`
  }
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
  return statusCode === 200
}

http.interceptors.response.use(async (response) => {
  /* 请求之后拦截器 */
  const res = response.data
  if (res.code === 200) { // 服务端返回的状态码不等于200，则reject()
    return Promise.reject(res)
  } else {
    if (res.errCode === 401) {
      const that = this
      uni.showModal({
        title: res.errMsg,
        icon: 'none',
        duration: 3000,
        success: function(res) {
          if (res.confirm || res.cancel) {
            store.dispatch('user/logout');
            uni.navigateTo({
              url: `/pages/login/index`
            });
          }
        }
      });
      return Promise.reject(res.errMsg)
    } else if (res.errCode === 405 || res.errCode === 400000 || res.errCode === 404 || res.errCode === 400) {
      uni.showToast({
        title: res.errMsg,
        icon: 'none',
        duration: 3000
      })
      return Promise.reject(res.errMsg)
    } else if (res.errCode === 500) {
      const message = '服务器错误！'
      uni.showToast({
        title: message,
        icon: 'none'
      })
      return Promise.reject(message)
    } else {
      return res.data
    }
  }
}, (response) => { // 请求错误做点什么
  const message = '服务器连接失败！'
  uni.showToast({
    title: message,
    icon: 'none'
  })
  return Promise.reject(message)
})

export {
  http
}
