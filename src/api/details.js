import { request } from '@/utils/request.js'

export function getDetailData(id) {
  return request({
    url: '/detail',
    params: {
      iid: id
    }
  })
}

export class GoodInfo {
  constructor(itemInfo, columns) {
      this.title =  itemInfo.title
      this.price = itemInfo.price
      this.lowPrice = itemInfo.lowPrice
      this.columns = columns
  }
}

export function getDetailRecommend() {
  return request({
    url: '/recommend'
  })
}
