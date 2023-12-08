const koaRouter = require('@koa/router')
const userController = require('../controller/user')
const { verifyUser, handlePasswords, handleUserMenu } = require('../middleware/user')

//创建路由对象
const userRouter = new koaRouter({ prefix: '/user' })

const { create, detail, showAvatarImg } = userController

//定义路由映射
userRouter.post('/create', verifyUser, handlePasswords, create)

//用户信息
userRouter.get('/:userId', handleUserMenu, detail)

//头像展示
userRouter.get('/avatar/:userId', showAvatarImg)

module.exports = userRouter
