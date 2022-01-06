import { useState, useEffect } from "react"

// custom hook 用到其他的hook，用不到的话，直接当函数用
export const useDebounce = <T>(value: T, delay?: number) => {

  const [deValue, setDeValue] = useState(value)

  useEffect(() => {
    // value变化之后设置一个定时器
    const timer = setTimeout(() => setDeValue(value), delay)
    return () => {
      // 上一次useEffect运行完后执行，清理上一次的定时器
      clearTimeout(timer)
    }
  }, [value, delay])
  return deValue
}

// function debounce () {
//   let timer
//   return () => {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(function() {
//       func()
//     }, delay)
//   }
// }

export const useArray = <T>(initState: T[]) => {
  const [value, setValue] = useState(initState)

  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const v = [...value]
      v.splice(index, 1)
      setValue(v)
    }
  }
}