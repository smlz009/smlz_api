const RoleService = require('../service/role')

const { create } = RoleService

class RoleController {
  async create(ctx, next) {
    //1.获取角色名称,菜单ids
    const { name, intro, menuIds } = ctx.request.body
    //2.保存到数据库
    const result = await create(name, intro, menuIds)
    ctx.body = {
      code: 0,
      message: '保存成功',
      data: result
    }
  }
}

module.exports = new RoleController()
