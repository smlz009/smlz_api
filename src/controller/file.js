const FileService = require('../service/file')

const { create, showAvatarImg } = FileService

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
}

module.exports = new FileController()
