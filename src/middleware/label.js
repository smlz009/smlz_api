const labelService = require('../service/label')

const { queryLabelByName } = labelService

const verifyLabelExists = async (ctx, next) => {
  //1.获取所以label
  const { labels } = ctx.request.body

  //判断所有label是否存在表中
  for (const name of labels) {
    const result = await queryLabelByName(name)
    if (result) {
      //获取name对应的label的id
    } else {
      //插入name，并且获取插入之后的id
    }
  }
}

module.exports = {
  verifyLabelExists
}
