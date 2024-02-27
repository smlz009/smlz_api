const Mock = require('mockjs')

const Random = Mock.Random

const componentList = [
  {
    fe_id: 'c1',
    type: 'questionInfo',
    title: '问卷标题',
    isHidden: false,
    isLocked: false,
    props: { title: '申请开发', desc: '这是一个问卷描述' }
  },
  {
    fe_id: 'c2',
    type: 'questionTitle',
    title: '标题',
    isHidden: false,
    isLocked: false,
    props: { text: '我是标题', level: 1, isCenter: false }
  },
  {
    fe_id: 'c3',
    type: 'questionInput',
    title: '输入框1',
    isHidden: false,
    isLocked: false,
    props: { title: '我是输入框', placeholder: '请输入啊' }
  },
  {
    fe_id: 'c4',
    type: 'questionRadio',
    title: '单选',
    isHidden: false,
    isLocked: false,
    props: {
      title: '单选标题',
      isVertical: false,
      options: [
        { value: 'item1', text: '选项1' },
        { value: 'item2', text: '选项2' },
        { value: 'item3', text: '选项3' }
      ],
      value: ''
    }
  },
  {
    fe_id: 'c5',
    type: 'questionCheckbox',
    title: '多选',
    isHidden: false,
    isLocked: false,
    props: {
      title: '多选标题',
      isVertical: false,
      list: [
        { value: 'item1', text: '选项1', checked: true },
        { value: 'item2', text: '选项2', checked: false },
        { value: 'item3', text: '选项3', checked: false }
      ]
    }
  },
  {
    fe_id: 'c6',
    type: 'questionTextarea',
    title: '输入框2',
    isHidden: false,
    isLocked: false,
    props: { title: '我是输入框', placeholder: '请输入啊' }
  }
]

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
        componentList
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
  //答卷
  statQuestion(ctx, next) {
    const { pageSize } = ctx.query
    const val = `data|${pageSize}`
    const list = Mock.mock({
      [val]: [
        {
          '_id|+1': '@id'
        }
      ]
    })
    list.data.forEach((item) => {
      componentList.forEach((c) => {
        const { fe_id, type, props } = c
        console.log()
        switch (type) {
          case 'questionInput':
            item[fe_id] = Random.ctitle()
            break
          case 'questionTextarea':
            item[fe_id] = Random.ctitle()
            break
          case 'questionRadio':
            item[fe_id] = props.options[0].text
            break
          case 'questionCheckbox':
            item[fe_id] = `${props.list[0].text},${props.list[1].text}`
            break
        }
      })
    })
    ctx.body = {
      code: 0,
      data: {
        total: 100,
        list: list.data
      }
    }
  }
  //统计答卷
  statQuestionCount(ctx, next) {
    ctx.body = {
      code: 0,
      data: {
        stat: [
          { name: '张三', count: 20 },
          { name: '李四', count: 50 },
          { name: '王五', count: 30 }
        ]
      }
    }
  }
  //新增答卷
  answer(ctx, next) {
    console.log(ctx)
    ctx.body = {
      code: 0
    }
  }
}

module.exports = new LabelController()
