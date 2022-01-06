import React from 'react'
export interface User {
  id: string;
  name: string;
  email?: string;
  title?: string;
  origanization?: string;
  token?: string;
}

interface IQueryParam {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param:IQueryParam['param']) => void;
}
export const SearchPannel = ({param, setParam, users}: IQueryParam) => {
  return <form>
    <div>
      <input type="text" value={param.name} onChange={ev => setParam({
        ...param,
        name: ev.target.value
      })}></input>
      <select value={param.personId} onChange={ev => setParam({
        ...param,
        personId: ev.target.value
      })}>
        <option value={''}>负责人</option>
        {
          users.map(user => <option key={user.id} value={user.id}></option>)
        }
      </select>
    </div>
  </form>
}