const userService = require('../service/user')

const { create } = userService

class UserController {
  async create(ctx, next) {
    //获取用户传递的信息
    const user = ctx.request.body

    //将用户信息存储到数据库
    const result = await create(user)

    //通知用户创建成功
    ctx.body = {
      message: '创建用户成功',
      data: result
    }
  }
}

module.exports = new UserController()
