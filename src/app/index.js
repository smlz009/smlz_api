const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const path = require('path')
const registerRouter = require('../router')
const serve = require('koa-static')

// 设置静态资源文件夹
const staticPath = '../static'

//创建app
const app = new koa()
//使用中间件
app.use(bodyParser())
app.use(serve(path.join(__dirname, staticPath)))

//注册路由
registerRouter(app)

//导出app
module.exports = app
