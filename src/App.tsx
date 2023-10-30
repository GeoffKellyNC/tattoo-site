import './App.css'
import { Routes, Route } from 'react-router-dom'
import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import * as userAction from './store/user/user.actions'


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
import RotatingSquareLoader from './loading/RotatingSquare'


interface Props {
  verifyUserAccess: () => Promise<boolean>,
}


const App: React.FC<Props>  = ({
  verifyUserAccess
})  => {
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(true)


  const loadAppUser = useCallback(async () => {

      await verifyUserAccess()
      setLoading(false)
      
  }, [verifyUserAccess])



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

      const publicRoutes = ['/', '/register', '/login'];

      const isPublicRoute = publicRoutes.includes(window.location.pathname);
    
      if (!isPublicRoute) {
        loadAppUser()
      }

      if(isPublicRoute) {
        setLoading(false)
      }

    return () => {
      window.removeEventListener('resize', () => {
        if (window.innerWidth <= 1000) {
          setIsMobile(true)
        } else {
          setIsMobile(false)
        }
      })
    }
  }, [loadAppUser])

  return (
    <>
      <Notifications />
      <AppNav isMobile = { isMobile } />
      { !loading ?(
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path = '/register' element = { <Register />} />
        <Route path = '/login' element = { <Login />} />
        <Route path = '/reset-password-user' element = { <EmailVerify />} />
        <Route path = '/reset-password/:token/:unxid' element = { <ResetPassForm />} />
        <Route path = '/user/client/:unxid/*' element = {
          <ProtectedRoute requiredRoles = {["client", 'artist']}>
            <UserProfileClient />
          </ProtectedRoute>
        } />
        <Route path = '/user/view/:unxid' element = {
          <ProtectedRoute requiredRoles = {["client", 'artist']}>
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
      </Routes> ) : (

        <RotatingSquareLoader />
      )
      }
    </>
  )
}

const ConnectedApp = connect(null, {
  verifyUserAccess: userAction.verifyUserAccess
})(App)


export default ConnectedApp


