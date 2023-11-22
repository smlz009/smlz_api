const monentService = require('../service/moment')

const { create, queryList, queryById, updateById, deteleById } = monentService

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

  async detail(ctx, next) {
    //获取动态 id
    const { momentId } = ctx.params

    //根据id 查询动态详情
    const result = await queryById(momentId)

    ctx.body = {
      code: 0,
      data: result[0]
    }
  }

  async update(ctx, next) {
    //获取动态 id
    const { momentId } = ctx.params
    //获取动态内容
    const { content } = ctx.query

    //根据id 修改内容
    const result = await updateById(momentId, content)

    ctx.body = {
      code: 0,
      message: '修改成功'
    }
  }

  async deleteMoment(ctx, next) {
    //获取动态 id
    const { momentId } = ctx.params
    //根据id删除内容
    const result = await deteleById(momentId)

    ctx.body = {
      code: 0,
      message: '删除成功'
    }
  }
}

module.exports = new MonentController()
