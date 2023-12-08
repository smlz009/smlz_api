const FileService = require('../service/file')
// const uploadFile = require('../utils/uploadToQiniu')

const { create, showAvatarImg } = FileService

const fs = require('fs')
const { UPLOAD_PATH } = require('../config/path')

class FileController {
  async create(ctx, next) {
    const { filename, mimetype, size } = ctx.request.file
    // const url = UPLOAD_PATH + '/' + filename
    // console.log(url)
    // console.log(filename)
    // console.log(ctx.request.file)
    // try {
    //   // 调用封装好的上传方法
    //   uploadFile(mimetype, url)
    // } catch (err) {
    //   console.log(err)
    // }

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
