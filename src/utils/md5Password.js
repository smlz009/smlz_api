const crypto = require('crypto')

function md5Password(password) {
  const md5 = crypto.createHash('md5')
  console.log(password)
  return md5.update(password).digest('hex')
}

module.exports = {
  md5Password
}
