import React, {useState, ReactNode} from "react";
import * as auth from 'views/auth/auth-provider'
import {User} from 'views/project-list/SearchPannel'
// 实现全局的状态 auth
interface AuthForm {
  username: string;
  password: string;
}
const AuthContext = React.createContext<{
  user: User | null | void,
  register: (form: AuthForm) => Promise<void>,
  login: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>,
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null | void>(null)
  const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
  const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
  const logout = () => auth.logout().then(() => setUser(null))

  return <AuthContext.Provider value={{user, login, register, logout}}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error ('useAuth必须在authProvider中')
  }
  return context
}