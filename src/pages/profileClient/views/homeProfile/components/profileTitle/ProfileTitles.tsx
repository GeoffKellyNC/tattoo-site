import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../../../../../store/root.reducer'
import { ProfileImageType } from '../../../../../../store/user/types/userStateTypes'
import { ClientProfileDetailsType } from '../../../../../../store/user/user.reducer'
import { UserData } from '../../../../../../store/user/user.reducer'
import { FaEdit } from "react-icons/fa";


import UploadProfileImg from '../UploadProfileImg'

interface Props {
    profileImages: ProfileImageType | null;
    userData: UserData;
    userCurrentLocation: {city: string, state: string};
    userProfileDetails: ClientProfileDetailsType;
}

const ProfileTitles: React.FC<Props> = ({
    profileImages,
    userData,
    userCurrentLocation,
    userProfileDetails
}) => {
  return (
    <ProfileTitleStyled>
        <div className = 'profile-avatar'>
            <div className = 'profile-image-container'>
                <img 
                    src = {profileImages?.image_url ? profileImages.image_url : 'https://storage.googleapis.com/tattoo-user-uploaded-images/profile-images/DALL%C2%B7E%202023-10-28%2019.20.25.png'} 
                    alt = 'profile avatar' 
                    className='profile-image' />
                    <UploadProfileImg Icon={FaEdit} />
            </div>
            <span className = 'owner-name'>{`${userData.first_name} ${userData.last_name}`}</span>
            <span className = 'profile-name'>@{ userData.display_name }</span>
            <span className = 'location-data'> {`${userCurrentLocation.city}, ${userCurrentLocation.state}`} </span>
            <span className = 'tag-line'> {userProfileDetails.profile_tagline} </span>
        </div>
    </ProfileTitleStyled>
  )
}

const mapStateToProps = (state: RootState) => ({
    profileImages: state.profileImages,
    userData: state.userData,
    userCurrentLocation: state.userCurrentLocation,
    userProfileDetails: state.userProfileDetails
})

const ConnectedProfileTitle = connect(mapStateToProps, null)(ProfileTitles)

export default ConnectedProfileTitle

const ProfileTitleStyled = styled.div`
    margin: 5rem 0 0 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    

    .profile-avatar {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
    }
 
    .owner-name {
        font-size: 2rem;
        color: #fff;
        font-weight: 600;
        font-family: ${pr => pr.theme.font.family.secondary};
    }

    .profile-image {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid ${pr => pr.theme.color.red};

        @media (max-width: ${pr => pr.theme.media.tablet}){
            width: 150px;
            height: 150px;
        }
    }

    .profile-name {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 200;
        font-family: ${pr => pr.theme.font.family.secondary};
        display: flex;
        align-items: center;
    }

    .tag-line {
        font-size: 1.8rem;
        color: #fff;
        font-weight: 200;
        font-family: ${pr => pr.theme.font.family.secondary};
        display: flex;
        align-items: center;
        color: #FEB800;

        @media (max-width: ${pr => pr.theme.media.tablet}){
            font-size: 1.2rem;
        }
    }

`