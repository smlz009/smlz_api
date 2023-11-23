const labelService = require('../service/label')

const { queryLabelByName, create } = labelService

const verifyLabelExists = async (ctx, next) => {
  //1.获取所以label
  const { labels } = ctx.request.body

  //判断所有label是否存在表中
  const newLabels = []

  for (const name of labels) {
    const result = await queryLabelByName(name)
    const labelObj = { name }
    if (result) {
      //获取name对应的label的id
      labelObj.id = result.id
    } else {
      //插入name，并且获取插入之后的id
      const inserResult = await create(name)
      labelObj.id = inserResult.insertId
    }
    newLabels.push(labelObj)
  }

  ctx.labels = newLabels

  await next()
}

module.exports = {
  verifyLabelExists
}
