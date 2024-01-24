const KoaRouter = require('@koa/router')

const {
  getQuestionById,
  createQuestion,
  getQuestionList,
  editQuestion,
  duplicateQuestion,
  deleteQuestion
} = require('../controller/question')

const questionRouter = new KoaRouter({ prefix: '/question' })

questionRouter.get('/:id', getQuestionById)
questionRouter.post('/', createQuestion)
questionRouter.get('/', getQuestionList)
questionRouter.patch('/:id', editQuestion)
questionRouter.post('/duplicate/:id', duplicateQuestion)
questionRouter.delete('/', deleteQuestion)

module.exports = questionRouter
