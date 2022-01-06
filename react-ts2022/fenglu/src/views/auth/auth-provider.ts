// 操控jwt 的 token
// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发

// 模拟第三方服务的 auth provider
import {User} from 'views/project-list/SearchPannel'
const apiUrl = process.env.REACT_APP_API_URL

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({user}: {user: User}) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
}

export const login = (data: {username: string, password: string}) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(data)
  }).then(async (res: Response) => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    } else {
      return Promise.reject(data)
    }
  })
}

export const register = (data: {username: string, password: string}) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async (res: Response) => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    } else {
      return Promise.reject(data)
    }
  })
}

// 加个async 返回的promise
export const logout = async () => window.localStorage.removeItem(localStorageKey)