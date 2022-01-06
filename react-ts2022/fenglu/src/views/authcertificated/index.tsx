import React from 'react'
import { ProjectList } from 'views/project-list'
import { useAuth } from 'context/authContext'

export const AuthenticatedApp = () => {
  const {logout} = useAuth()

  return <div>
    <button onClick={logout}>退出</button>
    <ProjectList/>
  </div>
}