import React from 'react'
import { useState, useEffect } from 'react'
import { SearchPannel } from "./SearchPannel"
import { List } from "./List"
import { cleanObject } from 'utils'
import qs from 'qs'
import { useDebounce } from 'hooks'

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectList = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debounceParam = useDebounce(param, 2000)
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])

  useEffect(() => {
    // qs 可以帮处理这种路径上的参数
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async res => {
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        setList(data)
      }
    })
  }, [debounceParam]) // param变化同步请求列表
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        setUsers(data)
      }
    })
  }, []) // 只初始化执行
  return <>
    <SearchPannel
      param={param}
      setParam={setParam}
      users={users} />
    <List
      list={list}
      users={users} />
  </>
}