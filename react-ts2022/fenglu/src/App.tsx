import { AuthenticatedApp } from 'views/authcertificated';
import { useAuth } from 'context/authContext';
import React from 'react';
import { UnauthenticatedApp } from 'views/unauthcertificated';
// import logo from './logo.svg';
import './App.css';
// import { ProjectList } from 'views/project-list';

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {/* <ProjectList/> */}
      {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
    </div>
  );
}

export default App;
