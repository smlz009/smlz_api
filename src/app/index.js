const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user')
const loginRouter = require('../router/login')

//创建app
const app = new koa()

//使用中间件
app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(loginRouter.routes())
app.use(loginRouter.allowedMethods())

//导出app
module.exports = app
