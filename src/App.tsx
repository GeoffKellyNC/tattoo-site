import './App.css'
import { Routes, Route } from 'react-router-dom'


// Components
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Notifications from './components/Notifications'
import ProtectedRoute from './util/ProtectedRoute'
import Register from './pages/register/Register'
import UserProfile from './pages/profile/UserProfile'


function App() {

  return (
    <>
      <Notifications />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path = '/register' element = { <Register />} />
        <Route path = '/login' element = { <Login />} />
        <Route path = '/user/:unxid' element = {
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
