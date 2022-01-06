import { useAuth } from 'context/authContext'
import React, { FormEvent } from 'react'
// import { useArray } from 'hooks'

export const RegisterView = () => {
  const person: {name: string; age: number}[] = [{
    name: 'xixi',
    age: 120
  }]

  // 数组的管理
  // const {value, clear, removeIndex, add} = useArray(person)
  const {register} = useAuth()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // HTMLFormElement extends Element
    event.preventDefault()
    const username = (event.currentTarget.elements[0] as HTMLFormElement).value
    const password = (event.currentTarget.elements[1] as HTMLFormElement).value
    register({
      username,
      password
    })
  }

  return <>
    {
      person.map(v => <div key={v.age}>{v.name} | {v.age}</div>)
    }
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username"></label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password"></label>
        <input type="password" id="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  </>
}

