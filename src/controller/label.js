const LabelService = require('../service/label')

const { create } = LabelService

class LabelController {
  async create(ctx, next) {
    console.log(ctx)
    //1.获取标签名称
    const { name } = ctx.request.body
    //2.保存到数据库
    const result = await create(name)
    ctx.body = {
      code: 0,
      message: '保存成功'
    }
  }
}

module.exports = new LabelController()
