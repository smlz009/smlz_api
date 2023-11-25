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

  async updataUserAvatar(avatarUrl, userId) {
    const statement = 'UPDATE `user` SET avatar_url = ? WHERE id = ?;'
    const result = await connection.execute(statement, [avatarUrl, userId])
    return result
  }

  async queryById(userId) {
    const statement = 'SELECT * FROM `user` WHERE id = ?;'
    const result = await connection.execute(statement, [userId])
    return result[0]
  }
}

module.exports = new UserService()
