const fs = require('fs')

function registerRouter(app) {
  //1.读取当前文件夹下的文件
  const files = fs.readdirSync(__dirname)

  //2.编辑所有文件
  for (const file of files) {
    if (file.startsWith('index.js')) continue
    const router = require(`./${file}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

module.exports = registerRouter
