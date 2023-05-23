import {
  http
} from '@/common/http'

const MY_LOANS = 'crm/customer-loans/'
const MY_LOAN = 'crm/customer-loan/'

// 获取登录信息
export function getLoans(params) {
  return http.get(MY_LOANS, {
    params: params
  })
}

export function getLoanWithId(id, params) {
  return http.get(`${MY_LOAN}${id}`, {
    params: params
  })
}

// 最近还款日
export function getRepaymentDays(id, params) {
  return http.get(`${MY_LOAN}to-repayment-days`, {
    params: params
  })
}

// 贷款统计
export function getLoanStatistic(params) {
  return http.get(`statistic/customer/mine`, {
    params: params
  })
}
