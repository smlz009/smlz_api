const Mock = require('mockjs')

const Random = Mock.Random

class LabelController {
  async question(ctx, next) {
    console.log(ctx)
    ctx.body = {
      code: 0,
      data: {
        id: Random.id()
      }
    }
  }
}

module.exports = new LabelController()
