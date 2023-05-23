import {
  http
} from '@/common/http'

const STAFF = 'user/platform-staff/info'

// 获取登录信息
export function getStaffUserInfo(staffId) {
  return http.get(STAFF)
}
