import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../../../store/root.reducer'
import { UserData, ClientProfileDetailsType } from '../../../../store/user/user.reducer'
import { TbCurrentLocation } from 'react-icons/tb'
import { GiTribalShield } from 'react-icons/gi'

interface Props {
    userData: UserData;
    userProfileDetails: ClientProfileDetailsType;
}

const InfoBox: React.FC<Props> = ({
    userData,
    userProfileDetails
}) => {
  return (
    <InfoBoxStyled>
        <div className = 'intro-title'>
            <span className='title'>Intro</span>
        </div>
        <div className = 'info'>
            <div className = 'info-item'>
                <TbCurrentLocation />
                { userProfileDetails.location_city ? userProfileDetails.location_city : 'No location set' }, { userProfileDetails.location_state ? userProfileDetails.location_state : null}
            </div>
            <div className = 'info-item'>
                <GiTribalShield  />
                Tattoo Count: {userProfileDetails.number_of_tattoos}
            </div>
        </div>
    </InfoBoxStyled>
  )
}
const mapStateToProps = (st: RootState) => ({
    userData: st.userData,
    userProfileDetails: st.userProfileDetails
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
    }
    
    .info-item > svg { /* Targets direct SVG children of info-item */
        margin-right: 10px; /* Space between icon and text */
    }

`





