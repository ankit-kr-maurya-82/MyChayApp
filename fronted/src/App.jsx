import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chat from './pages/Chat'
import Login from './pages/Login'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'))
  return token ? <Chat token={token} user={user} onLogout={() => {
    localStorage.clear();
    setToken(null);
    setUser(null);
  }}/>
  : <Login onAuth={(t,u) => {
    localStorage.setItem('token', t);
    localStorage.setItem('user', JSON.stringify(u));
    setToken(t);
    setUser(u);
  }}/>

 
}

export default App
