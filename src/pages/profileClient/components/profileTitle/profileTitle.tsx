/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../../../store/root.reducer'
import { ProfileImageType } from '../../../../store/user/types/userStateTypes'
import { UserData } from '../../../../store/user/user.reducer'

import bannerImg from '../../../../assets/profile-banner3.jpg'

interface Props {
    profileImages: ProfileImageType | null;
    userData: UserData;
}

const ProfileTitle: React.FC<Props> = ({
    profileImages,
    userData
}) => {
  return (
    <ProfileTitleStyled>
        <div className = 'profile-avatar'>
            <img src = {profileImages?.image_url} alt = 'profile avatar' className='profile-image' />
            <span className = 'profile-name'>{ userData.display_name }</span>
        </div>
        <img src = {bannerImg} alt = 'profile banner' className='profile-cover' />
        <div className="profile-menu">
          <a className="profile-menu-link active"></a>
        </div>
    </ProfileTitleStyled>
  )
}

export default connect((st: RootState) => ({
    profileImages: st.profileImages,
    userData: st.userData
}),null) (ProfileTitle)

const ProfileTitleStyled = styled.div`
    position: relative;
    height: 40vh;
    min-height: 250px;
    max-height: 350px;
    z-index: 1;

    &::after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        left: 0;
        top: 0;
        background-image: url(${bannerImg});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        filter: blur(50px);
        opacity: 0.7;
    }

    .profile-avatar {
        position: absolute;
        align-items: center;
        display: flex;
        z-index: 1;
        bottom: 16px;
        left: 24px;
    }

    .profile-image {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid #151728;
    }

    .profile-name {
        margin-left: 24px;
        margin-bottom: 24px;
        font-size: 22px;
        color: #fff;
        font-weight: 600;
        font-family: "DM Sans", sans-serif;
    }

    .profile-cover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 4px;

    }

    .profile-menu {
        position: absolute;
        bottom: 0;
        padding-left: 200px;
        background: #151728;
        width: 100%;
        display: flex;
        border-radius: 0 0 4px 4px;
    }

    .profile-menu-link {
        padding: 20px 16px;
        color: #5c5e6e;
        transition: 0.3s;
        cursor: pointer;

        &:active, &:hover {
            color: #fff;
            background-color: #1b1d2e;
            border-bottom: 3px solid #1488fa;
        }
    }

`