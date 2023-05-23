import {
  http
} from '@/common/http'

const STATICS = '/financial-market/workbench'

// 获取登录信息
export function getStatics(staffId) {
  const params = { role: 'ACCOUNT_MANAGER' }
  return http.get(STATICS, {
    params: params
  })
}


export function getTest() {
  return http.get('cms/notice/23')
}
