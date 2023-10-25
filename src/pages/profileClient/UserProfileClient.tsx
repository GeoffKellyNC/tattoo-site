/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store/root.reducer'
import styled from 'styled-components'
import * as userActions from '../../store/user/user.actions'

import { GiHamburgerMenu } from 'react-icons/gi'

import MobileNav from './components/MobileNav'
import SideMenu from './components/sideMenu/SideMenu'
import ProfileTitle from './components/profileTitle/ProfileTitle'
import InfoBox from './components/InfoBox/InfoBox'
import MessageBox from './components/messageBox/MessageBox'

interface UserProfileProps {
    verifyUserAccess: () => Promise<boolean>,
    logoutUser: () => Promise<void>,
    getClientUploadedImages: () => Promise<void>
}

const UserProfileClient: React.FC<UserProfileProps> = ({
    verifyUserAccess,
    logoutUser,
    getClientUploadedImages
}) => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false)


    useEffect(() => {
        verifyUserAccess()
        getClientUploadedImages()
        
    }
    ,[getClientUploadedImages, verifyUserAccess])



  return (
    <UserProfileStyled>
        <GiHamburgerMenu 
            className='mobile-nav-icon' 
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            size = {'3rem'}
        />
        {
            mobileNavOpen && <MobileNav logoutUser={ logoutUser } setMobileNavOpen = { setMobileNavOpen } />
        }
        <SideMenu />
        <div className = 'main-container'>
          <ProfileTitle />
          <div className = 'data-container timeline'>
            <div className = 'data-left'>
              <InfoBox />
            </div>
            <div className = 'data-right'>
              <MessageBox />
            </div>
          </div>
        </div>
    </UserProfileStyled>
  )
}

export default connect((st: RootState ) => ({
    userData: st.userData,
    profileImages: st.profileImages
}),{
    verifyUserAccess: userActions.verifyUserAccess,
    logoutUser: userActions.logoutUser,
    getClientUploadedImages: userActions.getClientUploadedImages
}) (UserProfileClient)


const UserProfileStyled = styled.div`
  color: ${(pr) => pr.theme.color.white};
  background-color: #151728;
  display: flex;
  max-width: 3200px;
  height: 100vh;
  overflow: hidden;
  margin: 5rem 0 0 auto;

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
`;
