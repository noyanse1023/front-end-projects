import { useAuth } from 'context/authContext'
import React, { FormEvent } from 'react'
// import { useArray } from 'hooks'

interface Base {
  id: number
}
interface Advance extends Base {
  name: string
}
const test = (p: Base) => {}
const param:Advance = {id: 1, name: 's'}
test(param) // 这时候传进连个熟悉不会报错啊，因为我想要的类型已经有了

export const LoginView = () => {
  // const person: {name: string; age: number}[] = [{
  //   name: 'xixi',
  //   age: 120
  // }]

  // 数组的管理
  // const {value, clear, removeIndex, add} = useArray(person)
  const {login, user} = useAuth()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // HTMLFormElement extends Element
    event.preventDefault()
    const username = (event.currentTarget.elements[0] as HTMLFormElement).value
    const password = (event.currentTarget.elements[1] as HTMLFormElement).value
    login({
      username,
      password
    })
  }

  return <>
    <form onSubmit={handleSubmit}>
      登录成功，用户名：{user?.name}
      <div>
        <label htmlFor="username"></label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password"></label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  </>
}

