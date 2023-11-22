const connection = require('../app/database')

class PermissionService {
  async checkResource(resourceName, resourceId, userId) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?`
    const [result] = await connection.execute(statement, [resourceId, userId])
    return result.length > 0
  }
}

module.exports = new PermissionService()
