import React from 'react'
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import ProtectedRoute from '../../util/ProtectedRoute'

import ArtistViewActiveJob from './views/artistsJobs/ArtistViewActiveJob'
import SideMenu from './views/homeProfile/components/sideMenu/SideMenu'
import HomeProfile from './views/homeProfile/HomeProfile'
import ClientPostedJobs from './views/clientPostedJobs/ClientPostedJobs'



const UserProfileClient: React.FC= () => {

  return (
    <UserProfileStyled className = 'MAIN-CONTAINER'>
        <SideMenu />
        <Routes>
          <Route path = '/' element = {<HomeProfile />} />
          <Route path = {`/posted-jobs`} element = {
            <ProtectedRoute requiredRoles={['client']}>
              <ClientPostedJobs />
            </ProtectedRoute>
          } />
          <Route path = {`/artists-jobs`} element = {
            <ProtectedRoute requiredRoles={['artist']}>
              <ArtistViewActiveJob />
            </ProtectedRoute>
          } />
        </Routes> 
    </UserProfileStyled>
  )
}

export default UserProfileClient


const UserProfileStyled = styled.div`
  color: ${(pr) => pr.theme.color.white};
  background-color: #151728;
  display: flex;
  max-width: 3200px;
  height: auto;

  .main-container {
    padding: 20px;
    flex-grow: 1;
    overflow: auto;
    background-color: #24273b;
  }

  .data-container {
    display: flex;
    padding-top: 20px;
    position: relative;
    z-index: 2;
  }

  .data-left {
    width: 310px;
    flex-shrink: 0;
  }

  .data-right {
    flex-grow: 1;
    padding-left: 20px;
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

  @media (max-width: ${(pr) => pr.theme.media.tablet}) {
    width: 100%;
    


    .main-container {
      padding: 10px; // reduced padding
    }

    .data-container {
      flex-direction: column; // stack data vertically
    }

    .data-left, .data-right {
      width: 100%;
      padding: 10px 0;
    }
  }
`;
