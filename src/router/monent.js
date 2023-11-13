const KoaRouter = require('@koa/router')
const { verifyAuto } = require('../middleware/login')
const { create, list } = require('../controller/monent')

const loginRouter = new KoaRouter({ prefix: '/monent' })

loginRouter.post('/create', verifyAuto, create)
loginRouter.get('/list', list)

module.exports = loginRouter
