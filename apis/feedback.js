import {
  http
} from '@/common/http'

const FEEDBACK = 'cms/feedback/'
const FEEDBACKS = 'cms/feedbacks/'

// 获取我的反馈列表
export function getMyFeedbacks(params) {
  return http.get(FEEDBACKS, {
    params: params
  })
}

// 获取我的反馈详情
export function getMyFeedbackWithId(id, params) {
  return http.get(`${FEEDBACK}${id}`, {
    params: params
  })
}


// 提交反馈
export function postFeedback(data) {
  return http.post(FEEDBACKS, data)
}
