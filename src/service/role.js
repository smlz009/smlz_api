const connection = require('../app/database')

class RoleService {
  async create(name, intro, menuIds) {
    const statement = 'INSERT INTO `role`(name,intro,menuIds) VALUES(?,?,?);'
    const [result] = await connection.execute(statement, [name, intro, menuIds])
    return result
  }
}

module.exports = new RoleService()
