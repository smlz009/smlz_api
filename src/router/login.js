const KoaRouter = require('@koa/router')
const { verifyLogin, verifyAuto } = require('../middleware/login')
const { sign, test } = require('../controller/login')

const loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, sign)
loginRouter.post('/test', verifyAuto, test)

module.exports = loginRouter
