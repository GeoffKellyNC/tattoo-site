/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Matching, connect } from 'react-redux';
import { RootState } from '../../../store/root.reducer';
import styled from 'styled-components';
import { ClientProfileDetailsType, UserContactProfileType } from '../../../store/user/user.reducer';

import ClientContactDetails from './ClientContactDetails';

interface ClientProfileProps {
    userProfileDetails: ClientProfileDetailsType;
    userContactProfile: UserContactProfileType;
    userData: RootState['userData'];
}

const ClientProfileDetails: React.FC<ClientProfileProps> = ({ 
    userProfileDetails,  
    userContactProfile,
    userData

}) => {


  return (
    <ClientProfileDetailsStyled>
        <div className = 'profile-details-header'>
            <span className = 'header-text label'> Profile Details </span>
        </div>


        <div className = 'basic-info-container'>
            <div className = 'user-name'>
                <span className = 'label-text label'> User Name: </span>
                <span className = 'user-text user-text'> {userData.user_name} </span>
            </div>
            <div className = 'display-name'>
                <span className = 'label-text label'> Display Name: </span>
                <span className = 'user-text user-text'> {userData.display_name} </span>
            </div>
            <div className = 'email'>
                <span className = 'label-text label'> Email: </span>
                <span className = 'user-text user-text'> {userData.user_email} </span>
            </div>
            <div className = 'account-type'>
                <span className = 'user-text client-text'> {userData.account_type} </span>
            </div>
        </div>


        <div className = 'location-details'>
            <div className = 'city-container loc-cantainer'>
                <span className = 'loc-label label'>City: </span>
                <span className = 'loc-text user-text'>
                        {userProfileDetails.location_city ? userProfileDetails.location_city : 'No City Set' }
                </span>
            </div>
            <div className = 'state-container loc-cantainer'>
                <span className = 'loc-label label'>State: </span>
                <span className = 'loc-text user-text'>
                        {userProfileDetails.location_state ? userProfileDetails.location_state : 'No State Set' }
                </span>
            </div>
            <div className = 'zip-container loc-cantainer'>
                <span className = 'loc-label label'>ZipCode: </span>
                <span className = 'loc-text user-text'>
                        {userProfileDetails.location_zip ? userProfileDetails.location_zip : 'No Zipcode Set' }
                </span>
            </div>
        </div>

        
        <div className = 'personal-details-container'>
            <div className = 'detail-container'>
                <span className = 'detail-label label'> TagLine: </span>
                <span className = 'detail-text user-text'>
                    {userProfileDetails.profile_tagline ? userProfileDetails.profile_tagline : 'No Tagline Set' }
                </span>
            </div>
            <div className = 'detail-container'>
                <span className = 'detail-label label'> About Me: </span>
                <span className = 'detail-text user-text'>
                    {userProfileDetails.profile_description ? userProfileDetails.profile_description: 'No About Me Set' }
                </span>
            </div>
            <div className='detail-container'>
                <span className = 'detail-label label'> Number of Tats: </span>
                <span className = 'detail-text user-text'>
                    {userProfileDetails.number_of_tattoos ? userProfileDetails.number_of_tattoos : '0' }
                </span>
            </div>
            <div className='detail-container'>
                <span className = 'detail-label label'> Your Tattoo Story: </span>
                <span className = 'detail-text user-text'>
                    {userProfileDetails.personal_tattoo_story ? userProfileDetails.personal_tattoo_story : 'You have not told your story yet!' }
                </span>
            </div>
        </div>
        <ClientContactDetails userContactProfile = {userContactProfile} />
    </ClientProfileDetailsStyled>
  )
};

export default connect(
  (st: RootState) => ({
    userProfileDetails: st.userProfileDetails,
    userContactProfile: st.userContactProfile,
    userData: st.userData,
  }),
  null
)(ClientProfileDetails as React.FC<Matching<{ userProfileDetails: unknown, userContactProfile: unknown }, ClientProfileProps>>);

const ClientProfileDetailsStyled = styled.div`
  color: ${(pr) => pr.theme.color.white};
  font-family: ${(pr) => pr.theme.font.family.primary};

  .header-text {
    font-size: 2rem;
    font-weight: 700;
  }
`