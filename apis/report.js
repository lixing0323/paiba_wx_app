import {
  http
} from '@/common/http'

const CUSTOMER = 'crm/customer/'
const COMPANIES = 'crm/companies/'
const MOVABLES = 'asset-info/movables/'
const IMMOVABLES = 'asset-info/immovables/'

// 获取经营背景
export function getMyCompanies(params) {
  return http.get(COMPANIES, {
    params: params
  })
}

// 获取财务统计
export function getFinancial(customerId, params) {
  return http.get(`${CUSTOMER}${customerId}/report/company-financial`, {
    params: params
  })
}

// 获取动产信息
export function getMovables(params) {
  return http.get(MOVABLES, {
    params: params
  })
}

// 获取不动产信息
export function getImmovables(params) {
  return http.get(IMMOVABLES, {
    params: params
  })
}

// 获取征信信息
export function getCreditReport(params) {
  return http.get('crm/customer-loans/', {
    params: params
  })
}

// 获取对外担保信息
export function getGuarantees(params) {
  return http.get('crm/customer-guarantees/', {
    params: params
  })
}

// 获取贷款逾期情况
export function getLoanStatic(customerId, params) {
  return http.get(`crm/customer/${customerId}/report/loan`, {
    params: params
  })
}

// 获取信用卡逾期情况
export function getCreditStatic(customerId, params) {
  return http.get(`crm/customer/${customerId}/report/credit`, {
    params: params
  })
}