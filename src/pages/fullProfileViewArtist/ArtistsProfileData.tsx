import React from 'react'
import { ArtistFullProfile } from '../../store/user/types/userStateTypes'
import styled from 'styled-components'

import { FaBriefcase } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { LuBuilding } from "react-icons/lu";
import { IoTimerOutline } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { FaStar } from "react-icons/fa6";

import ContactDataProfile from './ContactDataProfile';
import ArtistsPhotos from './ArtistsPhotos'
import AboutSection from './AboutSection'

interface Props {
    data: ArtistFullProfile
}

const defaultProfileImg = 'https://storage.googleapis.com/tattoo-user-uploaded-images/profile-images/defaultJobImg.png-03c2d1ca-e7b8-49f5-b91f-817d15622a69'

const ArtistsProfileData: React.FC<Props> = ({
    data
}) => {

    

  return (
    <DataContainer>
        <Header>
            <img 
                src={data.profileImage ? data.profileImage.image_url : defaultProfileImg}
                alt = 'Artist Profile Image'
                className = 'profile-image'
            />
            <span className = 'user-name'> {data.user.display_name} ({data.user.account_type}) </span>
            <span className = 'app-user-name'>@{data.user.user_name}</span>
            <span className = 'user-location'> {data.userDetails.location_city ? data.userDetails.location_city : 'Somewhere'}, {data.userDetails.location_state ? data.userDetails.location_state : 'USA'} </span>
            <span className = 'user-tagline'> {data.userDetails.profile_tagline ? data.userDetails.profile_tagline : null} </span>
        </Header>
        <ContactDataProfile data = {data.contactInfo} />
        <GeneralData>
            <div className = 'general-data-container'>
                <div className = 'info-item-container experince'>
                    <FaBriefcase className = 'info-icon experince-icon' />
                    <span className = 'data-text experince-text'>
                        {data.years_experience ? `${data.years_experience} years experince` : 'Experince Not Provided'}
                    </span>
                </div>
                <div className = 'info-item-container licenced'>
                    <PiCertificateFill className = 'info-icon licenced-icon' />
                    <span className = 'data-text licenced-text'>
                        {data.is_licenced ? `Has License` : 'No License Reported'}
                    </span>
                </div>
                <div className = 'info-item-container studio'>
                    <LuBuilding className = 'info-icon studio-icon' />
                    <span className = 'data-text sutdio-text'>
                        Studio: 
                    </span>
                    <span className = 'data-text sutdio-text'>
                        {data.studio_affiliation ? (
                            <a 
                            className='studio-link'
                            href={data.studio_url}>{data.studio_name}</a>
                        ) : 'No Studio Affiliation'}
                    </span>
                </div>
                {
                    data.is_pay_hourly && (
                    <div className = 'info-item-container hourly'>
                        <IoTimerOutline className = 'info-icon hourly-icon' />
                        <span className = 'data-text hourly-text'>
                            Hourly Rate: {data.pay_hourly_rate}
                        </span>
                    </div>
                    )
                }
                <div className = 'info-item-container portfolio'>
                    <ImProfile className = 'info-icon portfolio-icon' />
                    <span className = 'data-text portfolio-text'>
                        Portfolio: 
                    </span>
                    <span className = 'data-text portfolio-text'>
                        {data.portfolio ? (
                            <a 
                            className='studio-link'
                            href={data.portfolio}>{data.portfolio}</a>
                        ) : 'No Portfolio Provided'}
                    </span>
                </div>
                <div className = 'info-item-container rating'>
                    <FaStar className = 'info-icon rating-icon' />
                    <span className = 'data-text rating-text'>
                        Rating: {data.artist_rating_total ? data.artist_rating_total : 'Coming Soon'}
                    </span>
                </div>
            </div>
        </GeneralData>
        <div className = 'line-container'>
            <div className = 'line'></div>
            <div className = 'line'></div>
            <div className = 'line'></div>
        </div>
        <AboutSection 
            aboutText = {data.userDetails.profile_description}
            storyText = {data.userDetails.personal_tattoo_story}
            displayName = {data.user.display_name}
        />
        <ArtistsPhotos photos = {data.userImages} />
    </DataContainer>
  )
}

export default ArtistsProfileData


const DataContainer = styled.div`
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
    flex-wrap: wrap;

    .app-user-name {
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: 1.2rem;
        text-transform: capitalize;

        @media (max-width: ${pr => pr.theme.media.tablet}) {
            font-size: 1rem;
        }
    }



    .user-location {
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: 1.2rem;
        text-transform: capitalize;
    }

    .user-tagline {
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: 1.2rem;
        text-transform: capitalize;
        color: ${pr => pr.theme.color.yellow};
    }


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

    .user-name {
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: 3rem;
        text-transform: capitalize;


        @media (max-width: ${pr => pr.theme.media.tablet}) {
            font-size: 2rem;
            margin-top: 1rem;
        }
    }

`

const GeneralData = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${pr => pr.theme.color.red};
    padding-bottom: 2rem;

    .general-title {
        padding: 2rem;
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: 4rem;
    }

    .general-data-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 3rem 3rem 0 3rem;

        @media (max-width: ${pr => pr.theme.media.tablet}) {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 2rem;
        }
    }


    .info-item-container {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .info-icon {
        font-size: 1.5rem;

    }

    .data-text {
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: 1.3rem;
    }

    .studio-link {
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: 1.3rem;
        text-decoration: underline;
        color: white;
    }



`