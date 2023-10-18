import './App.css'
import { Routes, Route } from 'react-router-dom'


// Components
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Notifications from './components/Notifications'
import Register from './pages/register/Register'

function App() {

  return (
    <>
      <Notifications />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path = '/register' element = { <Register />} />
        <Route path = '/login' element = { <Login />} />
      </Routes>
    </>
  )
}

export default App
