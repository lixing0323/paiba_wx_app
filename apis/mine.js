import {
  http
} from '@/common/http'

const MINE = 'user/customer/info'

// 获取登录信息
export function getMineInfo(params) {
  return http.get(MINE)
}