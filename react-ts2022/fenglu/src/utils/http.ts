import qs from 'qs'
import * as auth from 'views/auth/auth-provider'

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  token?: string;
  data?: object;
}
// axios 和 fetch表现不一样的
// 后端抛出http错误，fetch不会抛出异常, 只有断网的时候会抛出异常
export const http = async (endpoint: string, {data, token, ...customConfig}:Config) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig // 会覆盖前面的值 method headers等
  }
  if (config.method.toUpperCase() === 'GET') {
    endpoint+= `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      // 未登录 或 token失效
      await auth.logout()
      window.location.reload()
      return Promise.reject({message: '重新登录'})
    }
    const data = await res.json()
    if (res.ok) {
      return data
    }
    return Promise.reject(data) // 后端抛出http错误，fetch不会抛出异常, 只有断网的时候会抛出异常
  })
}