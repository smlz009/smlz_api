const connection = require('../app/database')

class FileService {
  async create(filename, mimetype, size, userId) {
    const statement = 'INSERT INTO `avatar` (filename,mimetype,size,user_id) VALUES(?,?,?,?);'
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
    return result
  }
  async queryAvatarWithId(userId) {
    const statement = 'SELECT * FROM `avatar` WHERE user_id = ?'
    const [result] = await connection.execute(statement, [userId])
    return result.pop() //最后一条数据
  }
}

module.exports = new FileService()
