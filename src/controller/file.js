const FileService = require('../service/file')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const { create } = FileService

class FileController {
  async create(ctx, next) {
    const { filename, mimetype, size } = ctx.request.file
    const { id } = ctx.user
    const result = await create(filename, mimetype, size, id)

    ctx.body = {
      code: 0,
      message: '上传成功',
      data: result
    }
  }
  async getWallpaer(ctx, next) {
    const folderPath = path.resolve(__dirname, '../wallpaper')
    const files = await fs.promises.readdir(folderPath)
    const file = await fs.promises.readFile(
      path.resolve(folderPath, files[_.random(files.length - 1)])
    )

    ctx.set('content-type', 'image/jpeg')
    ctx.body = file
  }
}

module.exports = new FileController()
