import React from 'react'
import { User } from './SearchPannel'

interface Project {
  id: string;
  name: string;
  personId: string;
  pin?: boolean;
  origanization: string
}
interface IList {
  list: Project[];
  users: User[]
}
export const List = ({list, users}: IList) => {
  return <>
    <ul>
        {list.map(item => (
          <li key={item.id}>
            {item.name} |
            {users.find(v => v.id === item.personId)?.name || '-'}
          </li>
        ))}
    </ul>
  </>
}