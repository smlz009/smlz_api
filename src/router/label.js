const KoaRouter = require('@koa/router')
const { verifyAuto } = require('../middleware/login')
const { create } = require('../controller/label')

const labelRouter = new KoaRouter({ prefix: '/label' })

//增:新增标签
labelRouter.post('/create', verifyAuto, create)

module.exports = labelRouter
