import {
  http
} from '@/common/http'

const SERVICE_PRODUCTS = 'financial-market/service-products/'
const SERVICE_PRODUCT = 'financial-market/service-product/'
const CUSTOMER_SUPPORTS = 'financial-market/customer-supports/'
const CUSTOMER_SUPPORT = 'financial-market/customer-support/'

export function getServiceProductsList(params) {
  return http.get(`${SERVICE_PRODUCTS}`, {
    params: params
  })
}

export function getServiceProductCateTree(params) {
  return http.get(`${SERVICE_PRODUCT}cate-tree`, {
    params: params
  })
}

export function getServiceProductItem(id) {
  return http.get(`${SERVICE_PRODUCT}${id}`)
}

export function getCustomerSupport(id) {
  return http.get(`${CUSTOMER_SUPPORT}${id}`)
}

export function getServiceCustomerSupportsList(params) {
  return http.get(`${CUSTOMER_SUPPORTS}`, {
    params: params
  })
}
