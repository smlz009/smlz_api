const KoaRouter = require('@koa/router')

const { question } = require('../controller/question')

const labelRouter = new KoaRouter({ prefix: '/question' })

//增:新增标签
labelRouter.get('/question', question)

module.exports = labelRouter
