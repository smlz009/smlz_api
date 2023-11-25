const mysql = require('mysql2')

//1.创建连接
const connectionPool = new mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'smlz_db',
  user: 'root',
  password: 'Qq314156.',
  connectionLimit: 5
})

//2.获取链接是否成功
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log('连接数据库失败', err)
    return
  }
  connection.connect((err) => {
    if (err) {
      console.log('与数据库交互失败', err)
    } else {
      console.log('连接数据库成功')
    }
  })
})

//3.创建链接对象
const connection = connectionPool.promise()

module.exports = connection
