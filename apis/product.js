import {
  http
} from '@/common/http'

const LOAN_PRODUCTS = 'financial-market/loan-products/'
const LOAN_PRODUCT = 'financial-market/loan-product/'
const LOAN_APPLIES = 'financial-market/loan-product-applies/'
const LOAN_APPLY = 'financial-market/loan-product-apply/'

const FINANCIAL_PRODUCTS = 'financial-market/financial-products/'
const FINANCIAL_PRODUCT = 'financial-market/financial-product/'

// 获取贷款产品
export function getLoanProducts(params) {
  return http.get(LOAN_PRODUCTS, {
    params: params
  })
}

export function getLoanProductWithId(id, params) {
  return http.get(`${LOAN_PRODUCT}${id}`, {
    params: params
  })
}

// 申请产品
export function postLoanProductApplies(data) {
 return http.post(`${LOAN_APPLIES}`, data)
}

// 获取产品申请列表
export function getProductApplies(params) {
  return http.get(LOAN_APPLIES, {
    params: params
  })
}

export function getProductApplyWithId(id, params) {
  return http.get(`${LOAN_APPLY}${id}`, {
    params: params
  })
}

// 处理贷款
export function postProductApply(id, data) {
  return http.post(`${LOAN_APPLY}${id}`, data)
}


// 获取理财产品
export function getFinancialProducts(params) {
  return http.get(FINANCIAL_PRODUCTS, {
    params: params
  })
}

export function getFinancialProductWithId(id, params) {
  return http.get(`${FINANCIAL_PRODUCT}${id}`, {
    params: params
  })
}

// 推荐产品
export function recommendProduct(params) {
  return http.get(`financial-market/recommended-products/`, {
    params: params
  })
}
