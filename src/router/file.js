const KoaRouter = require('@koa/router')
const { verifyAuto } = require('../middleware/login')
const { handleAvatar } = require('../middleware/file')
const { create, getWallpaer } = require('../controller/file')

const fileRouter = new KoaRouter({ prefix: '/file' })

fileRouter.post('/avatar', verifyAuto, handleAvatar, create)
fileRouter.get('/wallpaper', getWallpaer)

module.exports = fileRouter
