/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import { RootState } from '../../store/root.reducer'
import * as userActions from '../../store/user/user.actions'
import { UserFullProfile } from '../../store/user/types/userStateTypes'
import styled from 'styled-components';

import ContactDataProfile from '../fullProfileViewArtist/ContactDataProfile';
import AboutSection from '../fullProfileViewArtist/AboutSection';
import ArtistsPhotos from '../fullProfileViewArtist/ArtistsPhotos';

interface Props {
    viewUserDetails: UserFullProfile,
    getFullUserProfileDetails: (unxid: string) => Promise<boolean>
}

const defaultProfileImg = 'https://storage.googleapis.com/tattoo-user-uploaded-images/profile-images/defaultJobImg.png-03c2d1ca-e7b8-49f5-b91f-817d15622a69'


const FullProfileView: React.FC<Props> = ({
    viewUserDetails,
    getFullUserProfileDetails
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { unxid } = useParams()

    const setUp = useCallback(async () => {
        setIsLoading(true)
        await getFullUserProfileDetails(unxid as string)
        setIsLoading(false)

    },[getFullUserProfileDetails, setIsLoading, unxid])

    useEffect(() => {
        setUp()
    }, [setUp])

  return (
    <ViewFull>
        {
            isLoading || Object.keys(viewUserDetails).length < 1 ? (
                <div className = 'loading'>
                    <span className = 'loading-text'> Loading Profile...</span>
                </div>
            ) : (
                <>
                    <Header>
                        <img 
                            src={viewUserDetails.profileImageUrl ? viewUserDetails.profileImageUrl : defaultProfileImg}
                            alt = 'Artist Profile Image'
                            className = 'profile-image'
                        />
                        <span className = 'display-name'>{viewUserDetails.display_name}</span>
                        <span className = 'user-name'>@{viewUserDetails.user_name}</span>
                        <span className = 'user-location'> {viewUserDetails.location_city ? viewUserDetails.location_city : 'Somewhere'}, {viewUserDetails.location_state ? viewUserDetails.location_state : 'USA'} </span>
                        <span className = 'user-tagline'> {viewUserDetails.profile_tagline ? viewUserDetails.profile_tagline : null} </span>
                    </Header>
                    <ContactDataProfile data = {{
                        contact_discord: viewUserDetails.contact_discord,
                        contact_instagram: viewUserDetails.contact_instagram,
                        contact_snapchat: viewUserDetails.contact_snapchat,
                        contact_x: viewUserDetails.contact_x,
                        contact_phone: viewUserDetails.contact_phone,
                        other_1: null,
                        other_2: null,
                        contact_website: null,
                        user_unxid: viewUserDetails.user_unxid
                    }} />
                    <div className = 'line-container'>
                        <div className = 'line'></div>
                        <div className = 'line'></div>
                        <div className = 'line'></div>
                    </div>
                    <AboutSection 
                        aboutText = {viewUserDetails.profile_description} 
                        storyText = {viewUserDetails.personal_tattoo_story}
                        displayName={viewUserDetails.display_name}
                        />
                    <ArtistsPhotos photos = {viewUserDetails.userImages} />
                </>
            )
        } 
    </ViewFull>
  )
}

export default connect((st: RootState) => ({
    viewUserDetails: st.viewUserDetails
}),{
    getFullUserProfileDetails: userActions.getFullUserProfileDetails
}) (FullProfileView)


const ViewFull = styled.div`
    color: ${pr => pr.theme.color.white};
    font-family: ${pr => pr.theme.font.family.secondary};
    font-size: 2rem;
    display: flex;
    flex-direction: column;

    .line-container {
        display: none;

        @media (max-width: ${(pr) => pr.theme.media.tablet}) {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            width: 100%;
        }
    }

    .line {
    display: none;

        @media (max-width: ${(pr) => pr.theme.media.tablet}) {
            display: block;
            width: 100%;
            height: 1px;
            background-color: ${pr => pr.theme.color.red};

            &:nth-child(1) {
                width: 80%;
            }

            &:nth-child(2) {
                width: 60%;
                background: linear-gradient(305deg, #0066CC 80%, #bdc6ff 100%);
            }

            &:nth-child(3) {
                width: 40%;
                background: linear-gradient(305deg, #a907ef 80%, #ffffff 100%);

            }
        }
    }
`

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;

    .profile-image {
        width: 15rem;
        height: 15rem;
        border-radius: 50%;
        object-fit: cover;

        @media (max-width: ${pr => pr.theme.media.tablet}) {
            width: 10rem;
            height: 10rem;
            border: 3px solid ${pr => pr.theme.color.red};
        }
    }

    .display-name {
        font-size: 3rem;
        text-transform: capitalize;

        @media (max-width: ${pr => pr.theme.media.tablet}) {
            font-size: 2rem;
        }
    }

    .user-name {
        font-size: 2rem;
        text-transform: capitalize;
        margin-bottom: 0.5rem;

        @media (max-width: ${pr => pr.theme.media.tablet}) {
            font-size: 1.3rem;
        }
    }

    .user-location {
        font-size: 1.5rem;
        text-transform: capitalize;
        margin-bottom: 0.5rem;

        @media (max-width: ${pr => pr.theme.media.tablet}) {
            font-size: 1.2rem;
        }
    }

    .user-tagline {
        font-size: 1.5rem;
        text-transform: capitalize;
        color: ${pr => pr.theme.color.yellow};

        @media (max-width: ${pr => pr.theme.media.tablet}) {
            font-size: 1.2rem;
        }
    }


`