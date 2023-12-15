import React, { useState } from 'react'
import styled from 'styled-components'
import { ArtistsUserType  } from '../../../../store/user/types/userStateTypes'

import { MdCastForEducation } from "react-icons/md";
import { LuBuilding } from "react-icons/lu";
import { TbCertificate } from "react-icons/tb";
import { FaLink } from "react-icons/fa";
import { RiProfileFill } from "react-icons/ri";
import { RiReservedLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

import EditArtistsDataDrawer from './forms/EditArtistDataDrawer';
 







interface Props {
    artistDetails: ArtistsUserType
}

const ArtistDataSettings: React.FC<Props> = ({
    artistDetails
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <Header className = 'header-container'>
        <h2 className = 'header-text'> ARTIST </h2>
        <CiEdit size = {'2rem'} className = 'edit-icon' onClick = {() => setIsOpen(true)} />
      </Header>
      <StyledArtistData>
          <div className='info-container'>
            <MdCastForEducation className='icon' />
            <span className='info-label'> Years Experince: </span>
            <span className='user-text'>
              {artistDetails.years_experience ? artistDetails.years_experience : 'N/A'}
            </span>
          </div>
          <div className='info-container'>
            <LuBuilding className='icon' />
            <span className='info-label'> Studio Affliation: </span>
            <span className='user-text'>
              {artistDetails.studio_affiliation ? artistDetails.studio_name : 'No studio affiliation'}
            </span>
          </div>
          <div className='info-container'>
            <FaLink className='icon' />
            <span className='info-label'> Studio Link: </span>
            <span className='user-text'>
              {artistDetails.studio_url ? artistDetails.studio_url : 'No studio Link'}
            </span>
          </div>
          <div className='info-container'>
            <TbCertificate className='icon' />
            <span className='info-label'> Certified: </span>
            <span className='user-text'>
              {artistDetails.is_licenced ? 'Has Licence' : 'No Licence'}
            </span>
          </div>
          <div className='info-container'>
            <RiProfileFill className='icon' />
            <span className='info-label'> Portfolio: </span>
            <span className='user-text'>
              {artistDetails.portfolio ? artistDetails.portfolio : 'No Portfolio'}
            </span>
          </div>
          <div className='info-container'>
            <RiReservedLine className='icon' />
            <span className='info-label'> Booking System: </span>
            <span className='user-text'>
              {artistDetails.uses_booking_system ? artistDetails.uses_booking_system : 'No Booking System'}
            </span>
          </div>
      </StyledArtistData>
      <EditArtistsDataDrawer 
        artistDetails = {artistDetails}
        isOpen = {isOpen}
        setIsOpen = {setIsOpen} />
    </>
  )
}

export default ArtistDataSettings

const Header = styled.div`
  font-size: 2.4rem;
  font-family: ${pr => pr.theme.font.family.secondary};
  font-weight: 200;
  margin: 0 1.2rem;
  display: flex;
  gap: 1rem;

  .edit-icon {
    margin-top: 4.7rem;
    cursor: pointer;
    color: ${pr => pr.theme.color.white};
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${pr => pr.theme.color.red};
    }
  }

`

const StyledArtistData = styled.div`
  display: flex;
  margin: 3rem 1.2rem;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;


  .info-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.6rem;
    font-family: ${pr => pr.theme.font.family.secondary};
    font-weight: 400;
    color: ${pr => pr.theme.color.white};
    letter-spacing: 2px;
    margin: 0;
  }

  .icon {
    font-size: 1.8rem;
    color: #39ffe3;
  }

  .info-label {
    font-size: 1.8rem;
    font-weight: 600;
    color: #f19263;
    text-transform: uppercase;

  }

  .user-text {
    font-size: 1.8rem;
    font-weight: 400;
  }




`