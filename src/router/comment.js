const KoaRouter = require('@koa/router')
const { verifyAuto } = require('../middleware/login')
const { create, reply } = require('../controller/comment')
const { verifyPermission } = require('../middleware/permission')

const commentRouter = new KoaRouter({ prefix: '/comment' })

//增:新增评论
commentRouter.post('/create', verifyAuto, create)
//增:回复评论
commentRouter.post('/reply', verifyAuto, reply)
//查
// commentRouter.get('/list', list)
// commentRouter.get('/:momentId', detail)
// //删
// commentRouter.delete('/:momentId', verifyAuto, verifyPermission, deleteMoment)
// //改
// commentRouter.patch('/:momentId', verifyAuto, verifyPermission, update)

module.exports = commentRouter
