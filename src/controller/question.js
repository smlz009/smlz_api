const Mock = require('mockjs')

const Random = Mock.Random

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
    const { isDetected = false, isStar, pageSize } = ctx.query
    const val = `data|${pageSize}`
    const list = Mock.mock({
      [val]: [
        {
          '_id|+1': '@id',
          title: '@ctitle',
          answerCount: '@natural(10, 100)',
          createTime: '@datetime',
          isPublished: '@boolean()',
          isStar: isStar || '@boolean()',
          isDetected: !!isDetected
        }
      ]
    })
    ctx.body = {
      code: 0,
      data: {
        list: list.data,
        total: 100
      }
    }
  }
  //修改问卷
  async editQuestion(ctx, next) {
    ctx.body = {
      code: 0,
      msg: '操作成功'
    }
  }
  //复制问卷
  async duplicateQuestion(ctx, next) {
    ctx.body = {
      code: 0,
      data: {
        id: Random.id()
      },
      msg: '创建成功'
    }
  }
  //删除
  async deleteQuestion(ctx, next) {
    ctx.body = {
      code: 0,
      msg: '删除成功'
    }
  }
}

module.exports = new LabelController()
