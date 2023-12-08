const MenuService = require('../service/menu')

const { create } = MenuService

class MenuController {
  async create(ctx, next) {
    //1.获取数据
    const { name, fid, url, icon, sort } = ctx.request.body
    //2.保存到数据库
    const result = await create(name, fid, url, icon, sort)
    ctx.body = {
      code: 0,
      message: '保存成功',
      data: result
    }
  }

  async queryList(ctx, next) {
    const menuList = ctx.menuList
    // console.log(menuList)
    ctx.body = {
      code: 0,
      list: menuList
    }
  }
}

module.exports = new MenuController()
