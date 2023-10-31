import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'  
import { UserData } from '../../store/user/user.reducer'
import { ProfileImageType } from '../../store/user/types/userStateTypes'

import createPortalSession from '../../api/userPortal'

import MobileNav from '../mobile/MobileNav'

interface Props {
    userData: UserData,
    profileImages: ProfileImageType,
    logoutUser: () => Promise<void>,
    isMobile: boolean
    userRole: string
}

const NavLoggedIn: React.FC<Props> = ({
    userData,
    profileImages,
    logoutUser,
    isMobile,
    userRole
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
                    userRole === 'artist' && <span className = 'link' onClick = {handleUserPortal}>User Portal</span>
                }
            </div>
            )
        }
        <div className = 'user-container'>
            <span className = 'user-name'>{userData.user_name}</span>
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
            font-weight: bold;
            margin-right: 1rem;
            font-family: 'Roboto', sans-serif;
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
            font-weight: 600;
            padding: 0.3rem 0.8rem;
            border-radius: 8px;
            transition: background-color 0.2s;

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }
`;
