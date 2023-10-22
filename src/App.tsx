import './App.css'
import { Routes, Route } from 'react-router-dom'


// Components
import AppUsersHome from './pages/appUsers/AppUsersHome'
import FullProfileView from './pages/fullProfileView/FullProfileView'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Notifications from './components/Notifications'
import ProtectedRoute from './util/ProtectedRoute'
import Redirect from './pages/redirect/Redirect'
import Register from './pages/register/Register'
import UserProfileClient from './pages/profileClient/UserProfileClient'


function App() {

  return (
    <>
      <Notifications />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path = '/register' element = { <Register />} />
        <Route path = '/login' element = { <Login />} />
        <Route path = '/user/client/:unxid' element = {
          <ProtectedRoute>
            <UserProfileClient />
          </ProtectedRoute>
        } />
        <Route path = '/user/view/:unxid' element = {
          <ProtectedRoute>
            <FullProfileView />
          </ProtectedRoute>
        } />
        <Route path = '/user-list' element = {
          <ProtectedRoute>
            <AppUsersHome />
          </ProtectedRoute>
        } />
        <Route path = '/redirect' element = {
          <ProtectedRoute>
            <Redirect />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
