import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store/root.reducer'
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import * as userActions from '../../store/user/user.actions'

import AboutMe from './components/aboutMe/AboutMe'
import SideMenu from './components/sideMenu/SideMenu'
import InfoBox from './components/InfoBox/InfoBox'
import MessageBox from './components/messageBox/MessageBox'
import NotificationsBox from './components/notificationBox/NotificationsBox'
import ProfileTitle from './components/profileTitle/ProfileTitle'

import ClientPostedJobs from './views/ClientPostedJobs'

interface UserProfileProps {
    verifyUserAccess: () => Promise<boolean>,
    logoutUser: () => Promise<void>,
    getClientUploadedImages: () => Promise<void> 
}

const UserProfileClient: React.FC<UserProfileProps> = ({
    verifyUserAccess,
    getClientUploadedImages 
}) => {



    useEffect(() => {
        verifyUserAccess()
        getClientUploadedImages()
        
    }
    ,[getClientUploadedImages, verifyUserAccess])



  return (
    <UserProfileStyled className = 'MAIN-CONTAINER'>
        <SideMenu />
        <Routes>
          <Route path = '/' element = {
            <div className = 'main-container'>
              <ProfileTitle />
              <div className = 'data-container timeline'>
                <div className = 'data-left'>
                  <InfoBox />
                  <AboutMe />
                </div>
                <div className = 'data-right'>
                  <MessageBox />
                </div>
                <NotificationsBox />
              </div>
            </div>
          } />
          <Route path = {`/posted-jobs`} element = {
            <ClientPostedJobs />
          } />
        </Routes>
    </UserProfileStyled>
  )
}

const mapStateToProps = (st: RootState) => ({
    userData: st.userData,
    profileImages: st.profileImages
});

const ConnectedUserProfileClient = connect(mapStateToProps, {
    verifyUserAccess: userActions.verifyUserAccess,
    logoutUser: userActions.logoutUser,
    getClientUploadedImages: userActions.getClientUploadedImages
})(UserProfileClient)

export default ConnectedUserProfileClient


const UserProfileStyled = styled.div`
  color: ${(pr) => pr.theme.color.white};
  background-color: #151728;
  display: flex;
  max-width: 3200px;
  height: 100vh;
  overflow: hidden;

  .main-container {
    padding: 20px;
    flex-grow: 1;
    overflow: auto;
    background-color: #24273b;
  }

  .data-container {
    display: flex;
    padding-top: 20px;
    position: relative;
    z-index: 2;
  }

  .data-left {
    width: 310px;
    flex-shrink: 0;
  }

  .data-right {
    flex-grow: 1;
    padding-left: 20px;
  }





  .mobile-nav-icon {
    display: none;
  }

  @media (max-width: ${(pr) => pr.theme.media.tablet}) {
    .mobile-nav-icon {
      display: block;
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 1.5rem;
      cursor: pointer;
    }

    .logout-btn {
        display: none;
    }
  }

  @media (max-width: ${(pr) => pr.theme.media.tablet}) {
    width: 100%;
    


    .main-container {
      padding: 10px; // reduced padding
    }

    .data-container {
      flex-direction: column; // stack data vertically
    }

    .data-left, .data-right {
      width: 100%;
      padding: 10px 0;
    }
  }
`;
