const userService = require('../service/user')
const { md5Password } = require('../utils/md5Password')
const { NAME_OR_PASSWORD_REQUIRED, NAME_IS_ALRADY_EXISTS } = require('../config/error')
const { queryList } = require('../service/menu')

const { findUserByName, queryById } = userService

const verifyUser = async (ctx, next) => {
  //判断是否为空
  const { name, password } = ctx.request.body
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_REQUIRED, ctx)
  }

  //判断用户名是否存在
  const isUser = await findUserByName(name)
  if (isUser.length) {
    return ctx.app.emit('error', NAME_IS_ALRADY_EXISTS, ctx)
  }

  //执行下一个中间件
  await next()
}

const handlePasswords = async (ctx, next) => {
  const { password } = ctx.request.body

  //对密码进行加密
  ctx.request.body.password = md5Password(password)

  //执行下一个中间件
  await next()
}

//映射用户菜单
const handleUserMenu = async (ctx, next) => {
  // 1.获取用户的id
  const { userId } = ctx.params
  let menu = []
  // 2.获取所有菜单
  const menuList = await queryList()
  // 3.获取角色所拥有的菜单 id
  const [user] = await queryById(userId)
  const menuIdList = user.menu.split(',')
  // 4.循环获得对应的菜单
  menuIdList.forEach((item) => {
    const val = menuList.find((i) => i.id == item)
    if (val) {
      menu.push(val)
    }
  })
  // 5.排序
  menu = menu.sort((a, b) => a.sort - b.sort)

  //6.将菜单格式化为树
  const menuTree = (list) => {
    const data = JSON.parse(JSON.stringify(list))
    return data.filter((p) => {
      const arr = data.filter((c) => c.fid_id == p.id)
      arr.length && (p.children = arr)
      return !p.fid_id
    })
  }

  user.menu = menuTree(menu)

  ctx.user = user

  //执行下一个中间件
  await next()
}

module.exports = {
  verifyUser,
  handlePasswords,
  handleUserMenu
}
