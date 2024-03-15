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
    const files = await fs.promises.readdir(path.resolve(__dirname, '../static/wallpaper'))
    const folderPath = 'http://47.107.128.145:8000/wallpaper/' + files[_.random(files.length - 1)]

    ctx.body = folderPath
  }
}

module.exports = new FileController()
