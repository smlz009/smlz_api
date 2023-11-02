const KoaRouter = require('@koa/router')
const { verifyLogin } = require('../middleware/login')
const { sign } = require('../controller/login')

const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, sign)

module.exports = loginRouter
