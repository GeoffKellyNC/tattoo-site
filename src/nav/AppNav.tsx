/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from '../store/root.reducer'
import styled from 'styled-components'
import { UserData } from '../store/user/user.reducer'
import { ProfileImageType } from '../store/user/types/userStateTypes'
import * as userActoins from '../store/user/user.actions'

import NavLoggedIn from './components/NavLoggedIn'
import NavLoggedOut from './components/NavLoggedOut'

interface Props {
    isAuthenticated: boolean,
    userData: UserData,
    profileImages: ProfileImageType,
    logoutUser: () => Promise<void>
}

const AppNav: React.FC<Props> = ({
    isAuthenticated,
    userData,
    profileImages,
    logoutUser
}) => {

    const nav = useNavigate()

    const handleLogin = (): void => {
        nav('/login')
        return
    }

    const handleRegister = (): void => {
        nav('/register')
        return;
    }

    const handleLogoClick = (): void => {
        if(isAuthenticated) {
            nav(`/user/client/${userData.unxid}`)
            return
        } else {
            nav('/')
            return
        }
    }


  return (
    <NavContainer>
        <div className = 'logo-container'>
            <div className = 'name-container' onClick={handleLogoClick}>
                <span className = 'app-name letters'>L</span>
                <span className = 'app-name i letters'>I</span>
                <span className = 'app-name letters'>NK'D</span>
            </div>
        </div>
        {
            isAuthenticated ? (
                <NavLoggedIn 
                userData = {userData} 
                profileImages={profileImages}
                logoutUser = {logoutUser}/>
            ) : (
                <NavLoggedOut 
                    handleLogin = {handleLogin} 
                    handleRegister = {handleRegister} />
            )
        }
    </NavContainer>
  )
}

export default connect((st: RootState) => ({
    isAuthenticated: st.isAuthenticated,
    userData: st.userData,
    profileImages: st.profileImages,
}), {
    logoutUser: userActoins.logoutUser
})  (AppNav)


const NavContainer = styled.div`
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 3rem;
    height: 4rem;
    background-color: rgba(0,0,0,0.2);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* subtle shadow for elevation */

    .logo-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem; /* spacing between logo and name */
        cursor: pointer;
    }

    .name-container {
        display: flex;
        align-items: center;
        gap: 0.25rem; /* spacing between letters */
        width: auto;
        cursor: pointer;
    }

    .app-name {
        font-size: 1.25rem;
        font-weight: bold;
        font-family: ${pr => pr.theme.font.family.logo};
    }

    .logo {
        width: 4.5rem;
        height: 4.5rem;

        img {
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
            border-radius: 50%; /* this will make the logo round if it isn't already */
        }
    }

    .i {
        font-size: 2rem;
        color: ${pr => pr.theme.color.pink};
    }
`;




