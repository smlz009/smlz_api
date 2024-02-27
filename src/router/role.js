const KoaRouter = require('@koa/router')
const { verifyAuto } = require('../middleware/login')
const { create, list } = require('../controller/role')

const roleRouter = new KoaRouter({ prefix: '/role' })

//新增角色
roleRouter.post('/create', verifyAuto, create)
roleRouter.post('/list', list)

module.exports = roleRouter
