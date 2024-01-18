const Mock = require('mockjs')

const Random = Mock.Random

class LabelController {
  async test(ctx, next) {
    console.log(ctx)
    ctx.body = {
      code: 0,
      data: {
        name: Random.cname()
      }
    }
  }
}

module.exports = new LabelController()
