import {
  http
} from '@/common/http'

const CUSTOMERS = 'user/customers/'
const CUSTOMER = 'user/customer/'

// 获取客户列表
export function getCustomers(params) {
  return http.get(CUSTOMERS, {
    params: params
  })
}

// 获取客户单条
export function getCustomerWithId(customerId) {
  return http.get(`${CUSTOMER}${customerId}`)
}

// 新增客户
export function postCustomers(data) {
  return http.post(CUSTOMERS, data)
}

// 编辑客户信息
export function putCustomerWithId(customerId, data) {
  return http.put(`${CUSTOMER}${customerId}`, data)
}

// 获取客户公司信息
export function getCompanies(params) {
  return http.get('crm/companies/', {
    params: params
  })
}

// 获取客户存款信息
export function getDeposits(params) {
  return http.get('asset-info/deposits/', {
    params: params
  })
}

// 获取客户不动产信息
export function getImmovables(params) {
  return http.get('asset-info/immovables/', {
    params: params
  })
}

// 获取客户动产信息
export function getMovables(params) {
  return http.get('asset-info/movables/', {
    params: params
  })
}

// 获取客户动产信息
export function getCreditCard(params) {
  return http.get('crm/customer-credits/', {
    params: params
  })
}

export function getCustomerImages(params) {
  return http.get('crm/customer-profile-images/', {
    params: params
  })
}


export function postCustomerImages(data) {
  return http.post('crm/customer-profile-images/', data)
}
