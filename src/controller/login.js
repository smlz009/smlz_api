const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/screct')

class LoginController {
  sign(ctx, next) {
    //1.获取用户信息
    const { id, name } = ctx.user
    //2.派发token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 72 * 60 * 60,
      algorithm: 'RS256'
    })
    //3.返回用户信息
    ctx.body = {
      code: 0,
      data: { token, id, name }
    }
  }
  test(ctx, next) {
    ctx.body = '成功'
  }
}

module.exports = new LoginController()
