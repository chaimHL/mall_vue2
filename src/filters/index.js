// 时间格式化
export function fomateDate(date, fomate) {
  // 将时间戳转成date对象
  date = new Date(date * 1000)
  // 获取年份
  if (/(y+)/.test(fomate)) {
    fomate = fomate.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  
  // 获取月和日，之所以与获取年份分开，因为月日要加个是否在前边补充0的判断
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
  }
  for (let k in o) {
    // new RegExp(`(${k})`)也就相当于/`(${k})`/
    if (new RegExp(`(${k})`).test(fomate)) {
      let str = o[k] + ''
      fomate = fomate.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fomate
}
// 当月和天为单数时，左边补个0
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
