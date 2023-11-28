import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../../../../../store/root.reducer'
import { UserData, ClientProfileDetailsType } from '../../../../../../store/user/user.reducer'
import { TbCurrentLocation } from 'react-icons/tb'
import { GiTribalShield } from 'react-icons/gi'
import { BiInfoCircle } from 'react-icons/bi'
import EditProfileDrawer from '../EditProfileDrawer'

interface Props {
    userData: UserData;
    userProfileDetails: ClientProfileDetailsType;
    userCurrentLocation: {city: string, state: string}
}

const InfoBox: React.FC<Props> = ({
    userProfileDetails,
    userData,
    userCurrentLocation
}) => {
  return (
    <InfoBoxStyled>
        <div className = 'intro-title'>
            <span className='title'>Intro</span>
            <EditProfileDrawer />
        </div>
        <div className = 'info'>
            <div className = 'info-item'>
                <TbCurrentLocation />
                { userCurrentLocation ? `${userCurrentLocation.city}, ${userCurrentLocation.state}`: 'No location set' }
            </div>
            <div className = 'info-item'>
                <GiTribalShield  />
                Tattoo Count: {userProfileDetails.number_of_tattoos}
            </div>
            <div className = 'info-item'>
                <BiInfoCircle />
                { userData.first_name ? userData.first_name : 'No first name set'}  { userData.last_name ? userData.last_name : null}
            </div>
        </div>
    </InfoBoxStyled>
  )
}
const mapStateToProps = (st: RootState) => ({
    userData: st.userData,
    userProfileDetails: st.userProfileDetails,
    userCurrentLocation: st.userCurrentLocation
});

const ConnectedInfoBox = connect(mapStateToProps, null)(InfoBox);

export default ConnectedInfoBox;


const InfoBoxStyled = styled.div`
    padding: 20px;
    background-color: #151728;
    border-radius: 4px;

    .intro-title {
        font-family: "DM Sans", sans-serif;
        color: #5c5e6e;
        font-weight: 600;
        font-size: 18px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .info {
        font-size: 15px;
    }

    .info-item {
        display: flex;
        color: #c3c5d5;
        align-items: center;
        margin-bottom: 10px;
        justify-content: flex-start;
        gap: 10px;
        font-family: "DM Sans", sans-serif;
    }
    
    .info-item > svg { /* Targets direct SVG children of info-item */
        margin-right: 10px; /* Space between icon and text */
    }

    @media (max-width: ${(pr) => pr.theme.media.tablet}) {
        padding: 10px;
    
        .intro-title {
          font-size: 16px; // slightly reduce font-size
          margin-bottom: 15px;
        }
    
        .info-item {
          font-size: 14px; // slightly reduce font-size
        }
      }

`





