/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Matching, connect } from 'react-redux';
import { RootState } from '../../../store/root.reducer';
import styled from 'styled-components';
import { ClientProfileDetailsType, UserContactProfileType } from '../../../store/user/user.reducer';

import ClientContactDetails from './ClientContactDetails';
import EditProfileDrawer from './EditProfileDrawer';

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
            <span className = 'header-text'> Profile Details </span>
            <EditProfileDrawer />
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
  background-color: rgba(20, 20, 20, 0.7);
  color: ${(pr) => pr.theme.color.white};
  font-family: ${(pr) => pr.theme.font.family.primary};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;

  .profile-details-header,
  .contact-details-header {
    border-bottom: 2px solid ${(pr) => pr.theme.color.primary};
    padding-bottom: 10px;
    margin-bottom: 20px;
  }

  .header-text {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .label {
    color: ${(pr) => pr.theme.color.text_black};
    font-size: 1rem;
    margin-right: 10px;
  }

  .user-text, .loc-text, .detail-text, .con-text {
    font-size: 1rem;
    font-weight: 500;
    display: inline-block;
  }

  .con-privacy-icon {
    margin-left: 10px;
    vertical-align: middle;
    color: ${(pr) => pr.theme.color.secondary};
    cursor: pointer;
  }

  .basic-info-container,
  .location-details,
  .personal-details-container,
  .contact-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;

    @media (max-width: ${(pr) => pr.theme.media.phone}) {
      grid-template-columns: 1fr;
    }
  }

  .loc-cantainer,
  .detail-container,
  .con-detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .account-type {
    text-align: center;
    font-size: 1.2rem;
    color: ${(pr) => pr.theme.color.accent};
    font-weight: 700;
    grid-column: span 2;
    border-top: 1px solid ${(pr) => pr.theme.color.secondary};
    padding-top: 20px;
  }
`;
