const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const registerRouter = require('../router')

//创建app
const app = new koa()

//使用中间件
app.use(bodyParser())
app.use(cors())

//注册路由
registerRouter(app)

//导出app
module.exports = app
