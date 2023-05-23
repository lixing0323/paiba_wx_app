import {
  http
} from '@/common/http'

const CUSTOMER_COMPANY = 'crm/company/'
const CUSTOMER_COMPANIES = 'crm/companies/'

// 获取关联客户公司
export function getCustomerCompanyWithId(companyId) {
  return http.get(`${CUSTOMER_COMPANY}${companyId}`)
}

// 新增客户关联公司
export function postCustomerCompany(data) {
  return http.post(CUSTOMER_COMPANIES, data)
}

// 编辑客户关联公司信息
export function putCustomerCompanyWithId(companyId, data) {
  return http.put(`${CUSTOMER_COMPANY}${companyId}`, data)
}
