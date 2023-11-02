const connection = require('../app/database')

class UserService {
  async create(user) {
    //获取用户信息
    const { name, password } = user

    //拼接statement
    const statement = 'INSERT INTO `user`(name, password) VALUES(?, ?);'

    //执行statement
    const result = await connection.execute(statement, [name, password])

    return result
  }

  async findUserByName(name) {
    //拼接statement
    const statement = 'SELECT * FROM `user` WHERE name = ?;'

    //执行statement
    const [values] = await connection.execute(statement, [name])

    return values
  }
}

module.exports = new UserService()
