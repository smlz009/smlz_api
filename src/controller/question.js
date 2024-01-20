const Mock = require('mockjs')

const Random = Mock.Random

function questionList() {
  return
}

class LabelController {
  //获取单个问卷信息
  async getQuestionById(ctx, next) {
    ctx.body = {
      code: 0,
      data: {
        id: Random.id(),
        title: Random.ctitle()
      }
    }
  }
  //创建问卷
  async createQuestion(ctx, next) {
    ctx.body = {
      code: 0,
      data: {
        id: Random.id()
      },
      msg: '创建成功'
    }
  }
  //获取问卷列表
  async getQuestionList(ctx, next) {
    const { isDetected, isStar } = ctx.query

    const list = Mock.mock({
      'data|10': [
        {
          '_id|+1': 1,
          title: '@ctitle',
          answerCount: '@natural(10, 100)',
          createTime: '@datetime',
          isPublished: '@boolean()',
          isStar: isStar || '@boolean()',
          isDetected: isDetected || '@boolean()'
        }
      ]
    })

    ctx.body = {
      code: 0,
      data: {
        list: list.data,
        total: 10
      }
    }
  }
}

module.exports = new LabelController()
