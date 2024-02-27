const connection = require('../app/database')

class RoleService {
  async create(name, intro, menuIds) {
    const statement = 'INSERT INTO `role`(name,intro,menuIds) VALUES(?,?,?);'
    const [result] = await connection.execute(statement, [name, intro, menuIds])
    return result
  }
  async list(offset, size) {
    try {
      const statement = `SELECT * FROM role LIMIT ${size};`
      const [result] = await connection.execute(statement)
      return result
    } catch (error) {
      console.log(error)
    }
  }
  async count() {
    const statement = 'SELECT COUNT(*) AS total FROM role'
    const [result] = await connection.execute(statement)
    return result[0].total
  }
}

module.exports = new RoleService()
