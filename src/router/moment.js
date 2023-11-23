const KoaRouter = require('@koa/router')
const { verifyAuto } = require('../middleware/login')
const { create, list, detail, update, deleteMoment, addLabels } = require('../controller/moment')
const { verifyPermission } = require('../middleware/permission')
const { verifyLabelExists } = require('../middleware/label')

const monentRouter = new KoaRouter({ prefix: '/monent' })

//增
monentRouter.post('/create', verifyAuto, create)
//查
monentRouter.get('/list', list)
monentRouter.get('/:momentId', detail)
//删
monentRouter.delete('/:momentId', verifyAuto, verifyPermission, deleteMoment)
//改
monentRouter.patch('/:momentId', verifyAuto, verifyPermission, update)
//添加标签
monentRouter.post('/:momentId/labels', verifyAuto, verifyPermission, verifyLabelExists, addLabels)

module.exports = monentRouter
