import {
  http
} from '@/common/http'

const SERVICE_ORDERS = 'financial-market/service-orders/'
const SERVICE_ORDER = 'financial-market/service-order/'

export function getServiceOrdersList(params) {
  return http.get(`${SERVICE_ORDERS}`, {
    params: params
  })
}

export function getServiceOrderItem(id) {
  return http.get(`${SERVICE_ORDER}${id}`)
}

export function postServiceOrders(data) {
  return http.post(`${SERVICE_ORDERS}`, data)
}

export function postServiceOrder(id, data) {
  return http.post(`${SERVICE_ORDER}${id}`, data)
}

export function deleteServiceOrder(id, data) {
  return http.delete(`${SERVICE_ORDER}${id}`, data)
}

// 支付订单
export function postOrderPrepay(data) {
  return http.post(`${SERVICE_ORDER}prepay`, data)
}

// 检查是否已经下单
export function checkOrder(data) {
  return http.post(`${SERVICE_ORDER}check`, data)
}
