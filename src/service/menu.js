const connection = require('../app/database')

class MenuService {
  async create(name, fid_id, url, icon, sort) {
    fid_id = fid_id ?? null
    const statement = 'INSERT INTO `menu`(name, fid_id, url, icon, sort) VALUES(?,?,?,?,?);'
    const [result] = await connection.execute(statement, [name, fid_id, url, icon, sort])
    return result
  }
  async queryList() {
    const statement = 'SELECT * FROM `menu` ORDER BY sort ASC'
    const [result] = await connection.execute(statement, [])
    return result
  }
}

module.exports = new MenuService()
