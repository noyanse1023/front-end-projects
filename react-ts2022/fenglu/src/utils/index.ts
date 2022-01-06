
// 传入0为真
export const isFalsy = (value: any) => value === 0 ? false : !value

// 在一个对象里，改变传入的对象是不好的
export const cleanObject = (obj: object) => {
  const result = {...obj}
  Object.keys(obj).forEach(key => {
    // TODO: 这里用T表示
    // @ts-ignore
    const value = obj[key]
    if (isFalsy(value)) {
       // @ts-ignore
      delete result[key]
    }
  })
  return result
}