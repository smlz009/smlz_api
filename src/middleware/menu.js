const MenuService = require('../service/menu')

const { queryList } = MenuService

const handleMneu = async (ctx, next) => {
  const menuList = await queryList()

  const treeList = menuTree(menuList)

  ctx.menuList = treeList

  await next()
}

const menuTree = (list) => {
  const data = JSON.parse(JSON.stringify(list))
  return data.filter((p) => {
    const arr = data.filter((c) => c.fid_id == p.id)
    arr.length && (p.children = arr)
    return !p.fid_id
  })
}

module.exports = {
  handleMneu
}
