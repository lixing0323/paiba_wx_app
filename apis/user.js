import {
  http
} from '@/common/http'

const RESIDENTIAL_USER = 'user/residential-user/wx'
const USER  = 'user/customer/'
const WX_BIND_PHONE = 'user/customer/wx-bind-phone'
const WX_LOGIN = 'user/customer/wx-login'

// 登录
export function wxBindPhone(data) {
  return http.put(`${WX_BIND_PHONE}`, data )
}

// 账号登录
export function login(data) {
  return http.post(`auth`, data)
}

// 注册
export function register(data) {
  return http.post(`${RESIDENTIAL_USER}`, data)
}

// 微信获取Code
export function getWxAppCode(wxAppCode) {
   return http.get(`${WX_LOGIN}`, {
      params: {
        wxAppCode: wxAppCode
      }
    })
}

// // 获取个人用户信息
// export function getUserInfo(customerId) {
//   return http.get(`${USER}${customerId}`)
// }

// 发送验证码
export function sendRegisterCode(phone) {
  return http.post(`outer-apis/sms/code`, {
    phoneNumber: phone
  })
}

// 换手机号
export function resetMobile(wxPhoneCode) {
  const data = {wxPhoneCode: wxPhoneCode}
  return http.post(`user/customer/mobile/`, data )
}


// 用户协议
export function getUserAgreements() {
  return http.get(`cms/user-agreements/non-auth`)
}

// 用户信息
export function getUserInfo() {
  return http.get('user/info')
}

// 获取用户二维码
export function getWxQRCode() {
  return http.get('user/wxa-code')
}

// 版本审核开关
export function getVersionControl() {
  return http.get('user/version_control')
}

// 填写个人信息
export function putCustomerInfo(data) {
  return http.put(`user/customer/info`, data )
}

// 统计登录信息
export function calcLoginCount(data) {
   return http.post(`${WX_LOGIN}/record`, data)
}
