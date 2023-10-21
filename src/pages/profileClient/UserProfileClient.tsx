/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store/root.reducer'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as userActions from '../../store/user/user.actions'
import clientProfileBg from '../../assets/client-profile-bg.jpg'

import { GiHamburgerMenu } from 'react-icons/gi'

import ClientProfileBasic from './components/ClientProfileBasic'
import ClientProfileDetails from './components/ClientProfileDetails'
import ClientUserImages from './sections/ClientUserImages'
import MobileNav from './components/MobileNav'

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

    const nav = useNavigate()

    useEffect(() => {
        verifyUserAccess()
        getClientUploadedImages()
        
    }
    ,[getClientUploadedImages, verifyUserAccess])

    const handleLogout = () => {
        logoutUser()
    }

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
        <button className = 'view-users' onClick={() => nav('/user-list')}> View Users </button>
        <button className='logout-btn' onClick={handleLogout}> Logout </button>
        <ClientProfileBasic data={userData} profImage = {profileImages} />
        <ClientProfileDetails />
        <ClientUserImages />
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
  width: 100%;
  padding: 40px 20px;
  background-image: linear-gradient(to bottom, transparent, rgba(0,0,0,1)), url(${clientProfileBg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .logout-btn {
    background-color: ${(pr) => pr.theme.color.red};
    color: ${(pr) => pr.theme.color.white};
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 20px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${(pr) => pr.theme.color.primary};
    }
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
