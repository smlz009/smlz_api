const PermissionService = require('../service/permission')
const { OPERATION_IS_NOT_ALLOWED } = require('../config/error')

const { checkResource } = PermissionService

async function verifyPermission(ctx, next) {
  //1.获取登录用户的id
  const { id: user_id } = ctx.user
  //2.获取资源id
  const keyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[keyName]
  const resourceNmae = keyName.replace('Id', '')
  //2.查询user的id是否有修改momentId的权限
  const isPermission = await checkResource(resourceNmae, resourceId, user_id)
  if (!isPermission) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  } else {
    await next()
  }
}

module.exports = {
  verifyPermission
}
