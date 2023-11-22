const CommentService = require('../service/comment')

const { create, reply } = CommentService

class CommentController {
  async create(ctx, next) {
    //1.获取动态内容
    const { content, momentId } = ctx.request.body
    //2.动态由谁发布
    const { id } = ctx.user
    //3.保存到数据库
    const result = await create(content, momentId, id)
    ctx.body = {
      code: 0,
      message: '发布评论成功'
    }
  }

  async reply(ctx, next) {
    //1.获取动态内容
    const { content, momentId, commentId } = ctx.request.body
    //2.动态由谁发布
    const { id } = ctx.user
    //3.保存到数据库
    const result = await reply(content, momentId, commentId, id)
    ctx.body = {
      code: 0,
      message: '回复评论成功'
    }
  }
}

module.exports = new CommentController()
