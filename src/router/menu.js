const KoaRouter = require('@koa/router')
const { verifyAuto } = require('../middleware/login')
const { create, queryList } = require('../controller/menu')
const { handleMneu } = require('../middleware/menu')

const menuRouter = new KoaRouter({ prefix: '/menu' })

//新增菜单
menuRouter.post('/create', verifyAuto, create)
menuRouter.get('/list', handleMneu, queryList)

module.exports = menuRouter
