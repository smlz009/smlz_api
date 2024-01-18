const KoaRouter = require('@koa/router')

const { test } = require('../controller/mock')

const labelRouter = new KoaRouter({ prefix: '/mock' })

//增:新增标签
labelRouter.get('/test', test)

module.exports = labelRouter
