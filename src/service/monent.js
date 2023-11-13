const connection = require('../app/database')

class MonentService {
  async create(content, userId) {
    const statement = 'INSERT INTO `monent`(content, user_id) VALUES(?, ?);'
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }

  async queryList(offset = 0, size = 10) {
    const statement = 'SELECT * FROM `monent` LIMIT ?, ?;'
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }
}

module.exports = new MonentService()
