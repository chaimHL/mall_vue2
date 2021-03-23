import { request, request2 } from '@/utils/request.js'

export function getHomeMultiData() {
  return request({
    url: '/home/multidata'
  })
}

export function fetchHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
