import {
  http
} from '@/common/http'

const REQUIREMENTS = 'financial-market/financial-requirements/'
const REQUIREMENT = 'financial-market/financial-requirement/'

// 获取客户需求列表
export function getCustomerReqs(params) {
  return http.get(REQUIREMENTS, {
    params: params
  })
}

// 获取客户需求单条
export function getCustomerReqWithId(reqId) {
  return http.get(`${REQUIREMENT}${reqId}`)
}

// 处理客户需求
export function putCustomerReqWithId(reqId, data) {
  return http.put(`${REQUIREMENT}${reqId}`, data)
}
