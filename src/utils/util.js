/**
 * 根据key复制对象
 * @param {}} src
 * @param {*} dest
 */
export const copy = function(src, dest) {
  const res = {}
  Object.keys(dest).forEach(key => {
    res[key] = src[key]
  })
  return res
}
/**
 * 获取菜单树
 * @param {} nodes id/parentId格式数据
 */
export const getTree = (nodes) => {
  var root = []
  for (var i = 0; i < nodes.length; i++) {
    if (Number(nodes[i]['parentId']) <= 0) {
      root.push(nodes[i])
    }
  }
  return buildTree(nodes, root)
}
/**
 * 构建菜单树
 * @param {*} nodes id/parentId格式数据
 * @param {*} root 树节点
 */
export const buildTree = (nodes, root) => {
  for (var i = 0; i < root.length; i++) {
    root[i].title = root[i].name
    var children = []
    for (var k = 0; k < nodes.length; k++) {
      if (nodes[k]['parentId'] === root[i]['id']) {
        children.push(nodes[k])
      }
    }
    if (children.length !== 0) {
      root[i]['children'] = children
      buildTree(nodes, children)
    }
  }
  return root
}
/**
 * 先序遍历树
 * @param {*} tree 标准树结构
 * @param {*} level 层级
 */
export const preorder = (tree, level) => {
  var array = []
  for (var i = 0; i < tree.length; i++) {
    tree[i].level = level
    if (level === 1) {
      // tree[i].expand = true
    }
    if (tree[i]['children'] != null) {
      tree[i].leaf = false
      array.push(tree[i])
      array = array.concat(preorder(tree[i]['children'], level + 1))
    } else {
      tree[i].leaf = true
      array.push(tree[i])
    }
    tree[i]['children'] = []
  }
  return array
}
/**
 * 树型结构先序遍历转列表
 * @param {*} datas 标准树结构数据
 */
export const tranDataTreeToTable = (datas) => {
  return preorder(getTree(datas), 1)
}
export const getNode = (datas, id) => {
  const res = datas.filter(item => {
    return item.id === id
  })
  if (res.length) {
    return res[0]
  } else {
    return 0
  }
}
/**
 * 获取所有父级
 * @param {} datas
 * @param {*} id
 */
export const getParents = (datas, id) => {
  const res = []
  const node = getNode(datas, id)
  if (node) {
    res.push(node)
  }
  for (let i = 0, len = datas.length; i < len; i++) {
    const item = datas[i]
    if (item.id === node.parentId) {
      res.push(item)
      res.push(...getParents(datas, item.id))
      break
    }
  }
  return res
}
/**
 * 获取所有子元素
 * @param {*} datas
 * @param {*} id
 * @param {*} containParent 是否包含父id
 */
export const getChildren = (datas, id, containParent) => {
  const res = []
  if (containParent === undefined) {
    containParent = true
  }
  const node = getNode(datas, id)
  if (node) {
    if (containParent) {
      res.push(node)
    }
  } else {
    return res
  }
  for (let i = 0, len = datas.length; i < len; i++) {
    const item = datas[i]
    if (item.parentId === id) {
      res.push(item)
      res.push(...getChildren(datas, item.id, false))
    }
  }
  return res
}
