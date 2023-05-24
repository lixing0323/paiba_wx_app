import {
  http
} from '@/common/http'

export function getTestList(params) {
  return http.get(`http/getNewsList`, {
    params: params
  })
}