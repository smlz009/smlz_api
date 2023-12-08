const userService = require('../service/user')
const { queryAvatarWithId } = require('../service/file')
const fs = require('fs')
const { UPLOAD_PATH } = require('../config/path')

const { create, queryById } = userService

class UserController {
  async create(ctx, next) {
    //获取用户传递的信息
    const user = ctx.request.body

    //将用户信息存储到数据库
    const result = await create(user)

    //通知用户创建成功
    ctx.body = {
      code: 0,
      message: '创建用户成功',
      data: result
    }
  }
  async showAvatarImg(ctx, next) {
    const { userId } = ctx.params

    const avatarInfo = await queryAvatarWithId(userId)
    const { filename, mimetype } = avatarInfo
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }

  async detail(ctx, next) {
    const user = ctx.user

    ctx.body = {
      code: 0,
      data: user
    }
  }
}

module.exports = new UserController()
