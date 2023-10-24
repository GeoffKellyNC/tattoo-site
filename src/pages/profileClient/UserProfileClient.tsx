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

interface UserProfileProps {
    userData: RootState['userData'],
    profileImages: RootState['profileImages'],
    verifyUserAccess: () => Promise<boolean>,
    logoutUser: () => Promise<void>,
    getClientUploadedImages: () => Promise<void>
}

const UserProfileClient: React.FC<UserProfileProps> = ({
    userData,
    verifyUserAccess,
    logoutUser,
    profileImages,
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
