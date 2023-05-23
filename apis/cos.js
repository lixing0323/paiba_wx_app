import {
  http
} from '@/common/http'

export function getCOSAuthorization(methods, pathname) {
  return http.get('outer-apis/qcloud/cos-sign')
}
