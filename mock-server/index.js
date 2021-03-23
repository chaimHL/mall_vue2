const express = require('express')
const Mock = require('mockjs')
const bodyParser = require('body-parser')
// 创建一个express服务器对象
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
// 解决跨域问题
app.all('*', (req, res, next) => {
	// 允许所有来源访问
	res.header('Access-Control-Allow-Origin', '*')
	// 允许访问的方式
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE')
	// 内容类型：如果是post请求必须指定这个属性
	res.header('Content-Type', 'application/json;charset=utf-8')
	next()
})

// 数据
// 对象：图片+文字
const ImgAndTextObj = Mock.mock({
	'list|15': [
		{
			id: '@increment',
			img_url: '@image',
			string: '@cword(6,14)'
		}
	]
})

const ImgAndTextObj2 = Mock.mock({
	'list|15': [
		{
			id: '@increment',
			img_url: '@image',
			string: '@cword(6,14)'
		}
	]
})

const ImgAndTextObj3 = Mock.mock({
	'list|15': [
		{
			id: '@increment',
			img_url: '@image',
			string: '@cword(6,14)'
		}
	]
})

// 首页tab商品数据
app.get(/\/api\/home\/goods/, (req, res) => {
  const { type, page } = req.query
  ImgAndTextObj.type = type
  ImgAndTextObj.page = page
  if (page > 0 && page <= 3) {
    switch (type){
      case 'pop':
        res.send(ImgAndTextObj)
        break
      case 'news':
        res.send(ImgAndTextObj2)
        break
      case 'sell':
        res.send(ImgAndTextObj3)
        break
    }

  } else if (page > 3) {
    res.send({
      list: []
    })
  }
})

// 数据
// Mock.Random.extend({
// 	status() {
// 		let statusArr = ['已收货', '未收回', '已付款', '待付款']
// 		return this.pick(statusArr)
// 	}
// })

// 创建post接口
// app.post(/\/api\/list/, (req, res) => {
// 	console.log('post', req.body)
// 	res.send(data)
// })

// 创建get接口
// app.get(/\/api\/list/, (req, res) => {
// 	console.log('get', req.query)
// 	res.send(data)
// })

const data = Mock.mock({
	'list|5': [
		{
			myStatus: '@status'
		}
	]
})

// 让服务器在3000端口运行
app.listen(3000, () => {
	console.log(3000)
})
