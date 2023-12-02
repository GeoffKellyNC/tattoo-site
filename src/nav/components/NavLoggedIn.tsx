import React from 'react'
import styled from 'styled-components'
import { useNavigate, NavLink } from 'react-router-dom'  
import { UserData } from '../../store/user/user.reducer'
import { ProfileImageType } from '../../store/user/types/userStateTypes'

import createPortalSession from '../../api/userPortal'

import MobileNav from '../mobile/MobileNav'

interface Props {
    userData: UserData,
    profileImages: ProfileImageType,
    logoutUser: () => Promise<void>,
    isMobile: boolean
    accountType: string
}

const NavLoggedIn: React.FC<Props> = ({
    userData,
    profileImages,
    logoutUser,
    isMobile,
    accountType
}) => {

    const nav = useNavigate()

    const profileImage = profileImages ? profileImages.image_url : 'https://storage.googleapis.com/tattoo-user-uploaded-images/profile-images/default.png'

    const handleProfileClick = () => {
        nav(`/user/client/${userData.unxid}`)
        return
    }

    const handleViewUsersClick = () => {
        nav('/user-list')
        return
    }

    const handleUserPortal = async () => {
        await createPortalSession()
        return 
    }
    

  return (
    <LoggedInNavContainer>
        {
            isMobile ? null : (
                <div className = 'link-container'>
                {
                    !userData.email_verified ? null : <span className = 'link' onClick = {handleViewUsersClick}>View Users</span>
                    
                }
                <span className = 'link' onClick = {logoutUser}>Logout</span>
                {
                    accountType === 'artist' && <span className = 'link' onClick = {handleUserPortal}>User Portal</span>
                }
                {
                    accountType === 'artist' && (
                    <NavLink className = 'link' to = '/artist/all-active-jobs'> Posted Jobs </NavLink>)
                }
            </div>
            )
        }
        <div className = 'user-container'>
            <span onClick = {handleProfileClick} className = 'user-name'>{userData.user_name}</span>
            {
                profileImages && (
                <div className = 'profile-image-container' onClick = {handleProfileClick}>
                    <img className='profile-img' src = {profileImage } alt = {userData.user_name} />
                </div>
                )
            }
        </div>
        {
            isMobile && <MobileNav/>
        }
    </LoggedInNavContainer>
  )
}

export default NavLoggedIn


const LoggedInNavContainer = styled.div`
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    font-family: ${pr => pr.theme.font.family.primary};

    .user-container {
        display: flex;
        align-items: center;
        gap: 2rem;

        .user-name {
            font-size: 1rem;
            margin-right: 1rem;
            font-family: 'Roboto', sans-serif;
            cursor: pointer;
            transition: scale 0.2s;
            transition: color 0.2s;
            

            &:hover {
                scale: 1.1;
                color: ${pr => pr.theme.color.red};
            }
        }

        .profile-image-container {
            cursor: pointer;
            position: relative;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            overflow: hidden;
            img.profile-img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    .link-container {
        display: flex;
        align-items: center;
        gap: 1rem;

        .link {
            cursor: pointer;
            font-size: 0.9rem;
            padding: 0.3rem 0.8rem;
            border-radius: 8px;
            color: white;
            transition: background-color 0.2s;
            text-decoration: none;

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }
`;
