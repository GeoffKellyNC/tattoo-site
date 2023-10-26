import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'


// Components
import AppNav from './nav/AppNav'
import AppUsersHome from './pages/appUsers/AppUsersHome'
import EmailVerify from './pages/resetPassword/EmailVerify'
import EmailNotVerified from './pages/helperPages/EmailNotVerified'
import FullProfileView from './pages/fullProfileView/FullProfileView'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Notifications from './components/Notifications'
import ProtectedRoute from './util/ProtectedRoute'
import Redirect from './pages/redirect/Redirect'
import Register from './pages/register/Register'
import ResetPassForm from './pages/resetPassword/ResetPassForm'
import UserProfileClient from './pages/profileClient/UserProfileClient'


function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (window.innerWidth <= 1000){
      setIsMobile(true)
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth <= 1000) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    })

    return () => {
      window.removeEventListener('resize', () => {
        if (window.innerWidth <= 1000) {
          setIsMobile(true)
        } else {
          setIsMobile(false)
        }
      })
    }
  }, [])

  return (
    <>
      <Notifications />
      <AppNav isMobile = { isMobile } />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path = '/register' element = { <Register />} />
        <Route path = '/login' element = { <Login />} />
        <Route path = '/reset-password-user' element = { <EmailVerify />} />
        <Route path = '/reset-password/:token/:unxid' element = { <ResetPassForm />} />
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
        <Route path = '/no-email-verify' element = {
          <ProtectedRoute>
            <EmailNotVerified />
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
