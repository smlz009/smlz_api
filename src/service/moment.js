const connection = require('../app/database')

class MonentService {
  async create(content, userId) {
    const statement = 'INSERT INTO `monent`(content, user_id) VALUES(?, ?);'
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }

  //查询动态信息
  async queryList(offset = 0, size = 10) {
    const statement = `
      SELECT m.id id,m.content content,m.createAt createTime ,m.updateAt updateTime,
      JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime','u.updateAt') user,
      (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id LIMIT ?, ?;
    `
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }

  async queryById(id) {
    try {
      const statement = `
      SELECT m.id id,m.content content,m.createAt createTime ,m.updateAt updateTime,
      JSON_OBJECT('id',u.id,'name',u.name) user,
      (JSON_ARRAYAGG(JSON_OBJECT(
        'id',c.id,'content',c.content,'commentId',c.comment_id,'createTime',c.createAt,'updateTime',c.updateAt,
        'user',JSON_OBJECT('id',cu.id,'name',cu.name)
      ))
      ) comments
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id 
      LEFT JOIN comment c ON c.moment_id = m.id
      LEFT JOIN user cu ON cu.id = c.user_id
      where m.id = ?
      GROUP BY m.id;
    `
      const [result] = await connection.execute(statement, [id])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async updateById(id, content) {
    try {
      const statement = 'UPDATE `moment` SET content = ? WHERE id = ?;'
      const [result] = await connection.execute(statement, [content, id])
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async deteleById(id) {
    try {
      const statement = 'DELETE FROM `moment`  WHERE id = ?;'
      const [result] = await connection.execute(statement, [id])
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new MonentService()
