const KoaRouter = require('@koa/router')

const { getQuestionById, createQuestion, getQuestionList } = require('../controller/question')

const questionRouter = new KoaRouter({ prefix: '/question' })

questionRouter.get('/:id', getQuestionById)
questionRouter.post('/', createQuestion)
questionRouter.get('/', getQuestionList)

module.exports = questionRouter
