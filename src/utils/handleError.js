const app = require('../app')
const {
  NAME_OR_PASSWORD_REQUIRED,
  NAME_IS_ALRADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  OPERATION_IS_NOT_ALLOWED
} = require('../config/error')

app.on('error', (error, ctx) => {
  let code = 0
  let message = ''
  switch (error) {
    case NAME_OR_PASSWORD_REQUIRED:
      code = -1001
      message = '用户名或密码不能为空'
      break
    case NAME_IS_ALRADY_EXISTS:
      code = -1002
      message = '用户名已存在'
      break
    case NAME_IS_NOT_EXISTS:
      code = -1003
      message = '用户名不存在'
      break
    case PASSWORD_IS_INCORRENT:
      code = -1004
      message = '密码错误'
      break
    case UNAUTHORIZATION:
      code = -1005
      message = '未授权'
    case OPERATION_IS_NOT_ALLOWED:
      code = -1006
      message = '无权限'
  }

  ctx.body = { code, message }
})
