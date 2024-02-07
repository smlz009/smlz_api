const Mock = require('mockjs')

const Random = Mock.Random

class LabelController {
  //获取单个问卷信息
  async getQuestionById(ctx, next) {
    ctx.body = {
      code: 0,
      data: {
        id: Random.id(),
        title: Random.ctitle(),
        desc: Random.ctitle(),
        js: '',
        css: '',
        componentList: [
          {
            fe_id: Random.id(),
            type: 'questionInfo',
            title: '问卷标题',
            isHidden: false,
            isLocked: false,
            props: { title: '申请开发', desc: '这是一个问卷描述' }
          },
          {
            fe_id: Random.id(),
            type: 'questionTitle',
            title: '标题',
            isHidden: false,
            isLocked: false,
            props: { text: '我是标题', level: 1, isCenter: false }
          },
          {
            fe_id: Random.id(),
            type: 'questionInput',
            title: '输入框1',
            isHidden: false,
            isLocked: false,
            props: { title: '我是输入框', placeholder: '请输入啊' }
          }
        ]
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
