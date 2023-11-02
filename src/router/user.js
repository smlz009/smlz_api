const koaRouter = require('@koa/router')
const userController = require('../controller/user')
const { verifyUser, handlePasswords } = require('../middleware/user')

//创建路由对象
const userRouter = new koaRouter({ prefix: '/user' })

const { create } = userController

//定义路由映射
userRouter.post('/create', verifyUser, handlePasswords, create)

module.exports = userRouter