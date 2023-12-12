import React from 'react'
import { ArtistFullProfile } from '../../store/user/types/userStateTypes'
import styled from 'styled-components'

import { FaBriefcase } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";
import { LuBuilding } from "react-icons/lu";
import { IoTimerOutline } from "react-icons/io5";






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
        </Header>
        <GeneralData>
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
                    {data.studio_affiliation ? (
                        <a href={data.studio_url}>{data.studio_name}</a>
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
        </GeneralData>
    </DataContainer>
  )
}

export default ArtistsProfileData


const DataContainer = styled.div`



`

const Header = styled.div`
    display: flex;
    padding: 2rem;
    gap: 2rem;
    align-items: flex-end;
    border-bottom: 1px solid #fff;


    .profile-image {
        width: 15rem;
        height: 15rem;
        border-radius: 50%;
        object-fit: cover;
    }

    .user-name {
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: 3rem;
        text-transform: capitalize;
    }

`

const GeneralData = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4rem;
    border-bottom: 1px solid yellow;
    padding: 3rem 0 0 3rem;


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

`