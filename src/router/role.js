const KoaRouter = require('@koa/router')
const { verifyAuto } = require('../middleware/login')
const { create } = require('../controller/role')

const roleRouter = new KoaRouter({ prefix: '/role' })

//新增角色
roleRouter.post('/create', verifyAuto, create)

module.exports = roleRouter
