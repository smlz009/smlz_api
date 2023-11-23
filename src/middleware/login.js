const jwt = require('jsonwebtoken')
const userService = require('../service/user')
const {
  NAME_OR_PASSWORD_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION
} = require('../config/error')
const { PUBLIC_KEY } = require('../config/screct')
const { md5Password } = require('../utils/md5Password')
const { findUserByName } = userService

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body
  //判断是否为空
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_REQUIRED, ctx)
  }

  //判断用户名是否存在
  const users = await findUserByName(name)
  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
  }

  //判断密码是否错误
  if (user.password !== md5Password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRENT, ctx)
  }

  //保存用户信息在ctx
  ctx.user = user

  //执行下一个中间件
  await next()
}

//验证token
const verifyAuto = async (ctx, next) => {
  //获取token
  const authorization = ctx.headers.authorization

  if (!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
  const token = authorization.replace('Bearer', '')
  //验证token
  try {
    //获取token信息
    const result = jwt.verify(token, PUBLIC_KEY, { algorithm: ['RS256'] })
    //保留token信息
    ctx.user = result
    //执行下一个中间件
    await next()
  } catch (error) {
    console.log(error)
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuto
}
