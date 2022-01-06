import React, {useState} from 'react'
import {RegisterView} from './register'
import { LoginView } from './login'

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false)
  return <div>
    {
      isRegister ? <RegisterView/> : <LoginView/>
    }
    <button onClick={() => setIsRegister(!isRegister)}>
      切换到{isRegister ? '登录': '注册'}
    </button>
  </div>
}