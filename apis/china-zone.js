import { http } from '@/common/http'

export function getCascaderChinaZones(params) {
  return http.get(`zone/cascade-china-zones`, {
    params: params
  })
}
