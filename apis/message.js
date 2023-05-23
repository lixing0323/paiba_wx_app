import {
  http
} from '@/common/http'

const MESSAGES = 'messages/'

const WXA = 'messages/wxa/template'

// 获取我的消息
export function getMyMessages(params) {
  return http.get(MESSAGES, {
    params: params
  })
}

// 获取我的消息详情
export function getMyMessage(id) {
  return http.get(`${MESSAGES}${id}`)
}

// 获取我的消息
export function getMyMessagesCount(params) {
  return http.get(`${MESSAGES}count`, {
    params: params
  })
}

export function postMessages(id) {
  return http.post(`${MESSAGES}${id}`)
}

// 微信订阅消息接口
export function getWeixinAppMessageId(params) {
  return http.get(`${WXA}`, {
    params: params
  })
}

// 公告消息列表
export function getNotices(params) {
  return http.get('cms/notices/', {
    params: params
  })
}

// 单条公告
export function getNotice(id) {
  return http.get(`cms/notice/${id}`)
}

// 读取公告
export function postNotices(data) {
  return http.post(`cms/notice-read-records/`, data)
}
