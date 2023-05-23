import {
  http
} from '@/common/http'

// 产品搜索
const PRODUCT_SEARCH = 'financial-market'

export function getProductOfSearching(params) {
  return http.get(`${PRODUCT_SEARCH}/product-search`, {
    params: params
  })
}

export function getProductOfSearchHistory() {
  return http.get(`${PRODUCT_SEARCH}/product-search-history`)
}

export function getProductOfSearchHot() {
  return http.get(`${PRODUCT_SEARCH}/product-search-hot`)
}

export function postProductOfSearchHistory(data) {
  return http.post(`${PRODUCT_SEARCH}/product-search-history`, data)
}


export function getServiceOfSearching(params) {
  return http.get(`financial-market/service-products/`, {
    params: params
  })
}

export function getServiceOfSearchHistory() {
  return http.get(`${PRODUCT_SEARCH}/product-search-history`, {
    params: {
      scope: 'service'
    }
  })
}

export function getServiceOfSearchHot() {
  return http.get(`${PRODUCT_SEARCH}/product-search-hot`, {
    params: {
      scope: 'service'
    }
  })
}

export function postServiceOfSearchHistory(data) {
  return http.post(`${PRODUCT_SEARCH}/product-search-history`, {
    ...data,
    ...{
      scope: 'service'
    }
  })
}
