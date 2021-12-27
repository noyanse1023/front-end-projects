
export const flattenArray = (array) => {
  return array.reduce((pre, cur) => {
    pre[cur.id] = cur
    return pre
  }, {})
}

export const objToArray = (obj) => {
  return Object.keys(obj).map(key => obj[key])
}