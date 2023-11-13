const monentService = require('../service/monent')

const { create, queryList } = monentService

class MonentController {
  async create(ctx, next) {
    //1.获取动态内容
    const { content } = ctx.request.body
    //2.动态由谁发布
    const { id } = ctx.user
    //3.保存到数据库
    const result = await create(content, id)

    ctx.body = {
      code: 0,
      message: '发布动态成功',
      data: result
    }
  }

  async list(ctx, next) {
    //获取 offset/size
    const { offset, size } = ctx.query
    const result = await queryList(offset, size)

    ctx.body = {
      code: 0,
      data: result
    }
  }
}

module.exports = new MonentController()
