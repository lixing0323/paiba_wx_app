import {
  http
} from '@/common/http'

const BANNERS = 'cms/banners/'

// 获取登录信息
export function getBanners(params) {
  return http.get(BANNERS, {
    params: params
  })
}
// 介绍图
export function getDescImg(params) {
  return http.get('cms/non-carousel-banners/', {
    params: params
  })
}

// banner间隔
export function getIntervalTime() {
  return http.get('cms/banner-config')
}

// 获取广告信息
export function getAdvert() {
  return http.get('cms/advert/non-auth')
}
