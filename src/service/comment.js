const connection = require('../app/database')

class CommentService {
  async create(content, momentId, userId) {
    try {
      const statement = 'INSERT INTO `comment`(content,moment_id, user_id) VALUES(?, ?, ?);'
      const [result] = await connection.execute(statement, [content, momentId, userId])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async reply(content, momentId, commentId, userId) {
    try {
      const statement =
        'INSERT INTO `comment`(content,moment_id,comment_id, user_id) VALUES(?, ?, ?, ?);'
      const [result] = await connection.execute(statement, [content, momentId, commentId, userId])
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new CommentService()
