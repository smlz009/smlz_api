const connection = require('../app/database')

class MonentService {
  async create(content, userId) {
    const statement = 'INSERT INTO `moment`(content, user_id) VALUES(?, ?);'
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }

  //查询动态信息
  async queryList(offset = 0, size = 10) {
    const statement = `
      SELECT m.id id,m.content content,m.createAt createTime ,m.updateAt updateTime,
      JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt,'avatar_url',u.avatar_url) user,
      (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
      (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
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
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT(
          'id',c.id,'content',c.content,'createTime',c.createAt,'commentId',c.comment_id,
          'user',JSON_OBJECT('id',cu.id,'name',cu.name,'avatar_url',cu.avatar_url)
        ))
        FROM comment c 
        LEFT JOIN user cu ON cu.id = c.user_id
        WHERE c.moment_id = m.id
      ) comments,
      (JSON_ARRAYAGG(JSON_OBJECT(
        'id',l.id,'name',l.name
      ))) labels
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id 
      LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON l.id = ml.label_id
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

  async hasLabel(momentId, labelId) {
    try {
      const statement = 'SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;'
      const [result] = await connection.execute(statement, [momentId, labelId])
      return result.length > 0
    } catch (error) {
      console.log(error)
    }
  }
  async addLabel(momentId, labelId) {
    try {
      const statement = 'INSERT INTO moment_label (moment_id ,label_id) VALUES (?, ?);'
      const [result] = await connection.execute(statement, [momentId, labelId])
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new MonentService()
