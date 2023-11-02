const userService = require('../service/user')
const { md5Password } = require('../utils/md5Password')
const { NAME_OR_PASSWORD_REQUIRED, NAME_IS_ALRADY_EXISTS } = require('../config/error')

const { findUserByName } = userService

const verifyUser = async (ctx, next) => {
  //判断是否为空
  const { name, password } = ctx.request.body
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_REQUIRED, ctx)
  }

  //判断用户名是否存在
  const isUser = await findUserByName(name)
  if (isUser.length) {
    return ctx.app.emit('error', NAME_IS_ALRADY_EXISTS, ctx)
  }

  //执行下一个中间件
  await next()
}

const handlePasswords = async (ctx, next) => {
  const { password } = ctx.request.body

  //对密码进行加密
  ctx.request.body.password = md5Password(password)

  //执行下一个中间件
  await next()
}

module.exports = {
  verifyUser,
  handlePasswords
}
