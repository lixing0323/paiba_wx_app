import {
  http
} from '@/common/http'

// 获取银行列表
export function getBank(params) {
  return http.get('financial-market/financial-institutions/', {
    params: params
  })
}

// 提交需求
export function postReq(data) {
  return http.post(`financial-market/financial-requirements/`, data)
}
