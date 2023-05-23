import {
  http
} from '@/common/http'

const USER_OCR = 'user/ocr/'

// 获取登录信息
export function getIdCardOfOCR(params) {
  return http.get(`${USER_OCR}idcard`, {
    params: params
  })
}
// 介绍图
export function getLicenseOfOCR(params) {
  return http.get(`${USER_OCR}business-license`, {
    params: params
  })
}
