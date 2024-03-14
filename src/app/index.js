const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const path = require('path')
const registerRouter = require('../router')
const static = require('koa-static')

//创建app
const app = new koa()
const staticPath = '../static'
console.log(path.join(__dirname, staticPath))
//使用中间件
app.use(bodyParser())
app.use(cors())
app.use(static(path.join(__dirname, staticPath)))

//注册路由
registerRouter(app)

//导出app
module.exports = app
