import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import React, { useEffect, useState, useCallback } from 'react'
import { connect, useDispatch } from 'react-redux'
import * as userAction from './store/user/user.actions'
import * as jobActions from './store/jobs/jobs.actions'
import * as appTypes from './store/app/app.types'
import * as notifyTypes from './store/notifications/notify.types'
import { RootState } from './store/root.reducer'
import { UserFullProfile } from './store/user/types/userStateTypes'
import ReactGA from 'react-ga'



// Components
import AppNav from './nav/AppNav'
import AppUsersHome from './pages/appUsers/AppUsersHome'
import EmailVerify from './pages/resetPassword/EmailVerify'
import EmailNotVerified from './pages/helperPages/EmailNotVerified'
import FullProfileView from './pages/fullProfileViewClient/FullProfileView'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Notifications from './components/Notifications'
import ProtectedRoute from './util/ProtectedRoute'
import Redirect from './pages/redirect/Redirect'
import Register from './pages/register/Register'
import ResetPassForm from './pages/resetPassword/ResetPassForm'
import UserProfileClient from './pages/profileClient/UserProfileClient'
import RotatingSquareLoader from './loading/RotatingSquare'
import PricingPage from './pages/pricing/PricingPage'
import ArtistViewActiveJob from './pages/artistsJobs/ArtistViewActiveJob'
import UserAlertItems from './components/UserAlertItems'
import BetaBanner from './pages/home/components/BetaBanner'
import ArtistFullProfileView from './pages/fullProfileViewArtist/ArtistFullProfile'
import VerifiedEmail from './pages/emailVerify/VerifiedEmail'
import PrivacyPolicy from './pages/privacyPolicy/PrivacyPolicy'

interface Props {
  accountType: string,
  userData: UserFullProfile
  appLoading: boolean,
  isAuthenticated: boolean,
  verifyUserAccess: () => Promise<boolean>,
  getClientUploadedImages: () => Promise<void>
  getUserJobs: () => Promise<unknown>,
  getAllActiveJobs: () => Promise<void>,
  getLocationData: (lat: string, lng: string) => Promise<boolean>,
  getArtistsCurrentBids: () => Promise<void>,
  getClientsCurrentBids: () => Promise<void>,
  getArtistDetails: () => Promise<boolean>,
  getContactDetails: () => Promise<boolean>
}


const App: React.FC<Props>  = ({
  verifyUserAccess,
  getClientUploadedImages,
  getUserJobs,
  getAllActiveJobs,
  getLocationData,
  getArtistsCurrentBids,
  getClientsCurrentBids,
  appLoading,
  accountType,
  userData,
  getArtistDetails,
  getContactDetails,
  isAuthenticated
})  => {
  const [isMobile, setIsMobile] = useState(false)

  const location = useLocation()

  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_REACT_APP_GOOGLE_TRACKING_ID);
  }
  , [])
 

  useEffect(() => {
    if(import.meta.env.VITE_REACT_APP_NODE_ENV === 'production'){
      ReactGA.pageview(location.pathname + location.search);
    }

  }, [location])



  const dispatch = useDispatch()

  const setLocation = useCallback((): Promise<void> => {
    const handleSuccess = async (position) => {
        const { latitude, longitude } = position.coords;
        await getLocationData(latitude, longitude);
    };

    const handleError = (error) => {
        console.log('Geolocation Error: ', error);
        dispatch({
          type: notifyTypes.SET_NOTIFY,
          payload: {
            notificationMessage: 'Error getting location data',
            notificationType: 'error'
          }
        })
    };

    return new Promise<void>((resolve) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    await handleSuccess(position);
                    resolve();
                }, 
                (error) => {
                    handleError(error);
                    resolve(); 
                }
            );
        } else {
            console.log("GEOLOCATION NOT SUPPORTED!"); 
            dispatch({
              type: notifyTypes.SET_NOTIFY,
              payload: {
                notificationMessage: 'Geolocation not supported',
                notificationType: 'error'
              }
            })
            resolve();
        }
    });
}, [dispatch, getLocationData]);


  const loadAppUser = useCallback(async () => {

    if(!isAuthenticated) return
      await verifyUserAccess()
      await getClientUploadedImages()

      await getUserJobs()
      await getAllActiveJobs()
      await getContactDetails()
      
      //!Artist specific
      accountType === 'artist' ? await getArtistsCurrentBids() : null
      accountType === 'artist' ? await getArtistDetails() : null

      //!Client specific
      accountType === 'client' ? await getClientsCurrentBids() : null


      if(userData.unxid){
        dispatch({ 
          type: 'CONNECT_SOCKET', 
          unx_id: userData.unxid 
        });
      }

      await setLocation() //? Needs to remain last in this function
      dispatch({
        type: appTypes.SET_APP_LOADING, 
        payload: false
      })
      
  }, [verifyUserAccess, getClientUploadedImages, getUserJobs, getAllActiveJobs, getContactDetails, accountType, getArtistsCurrentBids, getArtistDetails, getClientsCurrentBids, userData.unxid, setLocation, dispatch])



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

      const publicRoutes = ['/', '/register', '/login', '/pricing', '/reset-password-user', '/reset-password/:token/:unxid'];

      const isPublicRoute = publicRoutes.includes(window.location.pathname);
    
      if (!isPublicRoute) {
        loadAppUser()
      }

      if(isPublicRoute) {
        // setLoading(false)
        dispatch({
          type: appTypes.SET_APP_LOADING,
          payload: false
        })
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
  }, [dispatch, loadAppUser])

  return (
    <>
      <UserAlertItems />
      <Notifications />
      <AppNav isMobile = { isMobile } />
      <BetaBanner />
      { !appLoading ?(
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path = '/register' element = { <Register />} />
        <Route path = '/login' element = { <Login />} />
        <Route path = '/pricing' element = { <PricingPage />} />
        <Route path = '/privacy-policy' element = { <PrivacyPolicy />} />
        <Route path = '/reset-password-user' element = { <EmailVerify />} />
        <Route path = '/reset-password/:token/:unxid' element = { <ResetPassForm />} />
        <Route path = '/verify-email/:token/:unxid' element = { <VerifiedEmail />} />
        <Route path = '/user/client/:unxid/*' element = {
          <ProtectedRoute requiredRoles = {["client", 'artist']}>
            <UserProfileClient />
          </ProtectedRoute>
        } />
        <Route path = '/artist/all-active-jobs' element = {
          <ProtectedRoute requiredRoles={["artist"]}>
            <ArtistViewActiveJob />
          </ProtectedRoute>
        } />
        <Route path = '/user/artist/:unxid' element = {
          <ProtectedRoute requiredRoles = {["client", 'artist']}>
            <ArtistFullProfileView />
          </ProtectedRoute>
        } />
        <Route path = '/user/view/:unxid' element = {
          <ProtectedRoute requiredRoles = {["client", 'artist']}>
            <FullProfileView />
          </ProtectedRoute>
        } />
        <Route path = '/user-list' element = {
          <ProtectedRoute requiredRoles={["client", "artist"]}>
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

const mapStateToProps = (st: RootState) => ({
  appLoading: st.appLoading,
  accountType: st.accountType,
  userData: st.userData,
  isAuthenticated: st.isAuthenticated
})

const ConnectedApp = connect(mapStateToProps, {
  verifyUserAccess: userAction.verifyUserAccess,
  getClientUploadedImages: userAction.getClientUploadedImages,
  getUserJobs: jobActions.getUserJobs,
  getAllActiveJobs: jobActions.getAllActiveJobs,
  getLocationData: userAction.getLocationData,
  getArtistsCurrentBids: jobActions.getArtistsCurrentBids,
  getClientsCurrentBids: jobActions.getClientsCurrentBids,
  getArtistDetails: userAction.getArtistDetails,
  getContactDetails: userAction.getContactDetails

})(App)


export default ConnectedApp


