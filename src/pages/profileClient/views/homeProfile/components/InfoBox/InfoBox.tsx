import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../../../../../store/root.reducer'
import { UserData, ClientProfileDetailsType } from '../../../../../../store/user/user.reducer'
import { UserJobType, JobBidType } from '../../../../../../store/jobs/ts-types/jobTypes'
import EditProfileDrawer from '../EditProfileDrawer'
import { useMobileCheck } from '../../../../../../hooks/isMobile'

// Icons
import { TbCurrentLocation } from 'react-icons/tb'
import { GiTribalShield } from 'react-icons/gi'
import { BiInfoCircle } from 'react-icons/bi'
import { MdOutlineWork } from "react-icons/md";
import { ImHammer2 } from "react-icons/im";



interface Props {
    userData: UserData;
    userProfileDetails: ClientProfileDetailsType;
    userCurrentLocation: {city: string, state: string};
    userJobs: UserJobType[];
    accountType: string;
    clientCurrentBids: JobBidType[];
    
}

const InfoBox: React.FC<Props> = ({
    userProfileDetails,
    userData,
    userCurrentLocation,
    userJobs,
    accountType,
    clientCurrentBids
}) => {

    const isMobile = useMobileCheck()
  return (
    <InfoBoxStyled>
        <div className = 'intro-title'>
            <span className='title'>Intro</span>
            {/* <EditProfileDrawer /> */}
        </div>
        {
            isMobile &&
            <div className = 'info-item locaiton-data'>
                <TbCurrentLocation className = 'icon' />
                { userCurrentLocation ? `${userCurrentLocation.city}, ${userCurrentLocation.state}`: 'No location set' }
            </div>

        }
        <div className = 'info'>
            { !isMobile &&
                <div className = 'info-item'>
                    <TbCurrentLocation className = 'icon' />
                    { userCurrentLocation ? `${userCurrentLocation.city}, ${userCurrentLocation.state}`: 'No location set' }
                </div>
            }
            <div className = 'info-item'>
                <GiTribalShield className = 'icon'  />
                Tattoo Count: {userProfileDetails.number_of_tattoos}
            </div>
            {
                accountType === 'client' && (
                    <div className = 'info-item'>
                        <MdOutlineWork className = 'icon' />
                        { userJobs.length > 0 ? `${userJobs.length} Jobs Posted` : 'No jobs posted'}
                    </div>
                )
            }
            {
                accountType === 'client' && (
                    <div className = 'info-item'>
                        <ImHammer2 className = 'icon' />
                        { clientCurrentBids.length > 0 ? `${clientCurrentBids.length} Active Bids` : 'No bids'}
                    </div>
                )
            }
        </div>
    </InfoBoxStyled>
  )
}
const mapStateToProps = (st: RootState) => ({
    userData: st.userData,
    userProfileDetails: st.userProfileDetails,
    userCurrentLocation: st.userCurrentLocation,
    userJobs: st.userJobs,
    accountType: st.accountType,
    clientCurrentBids: st.clientCurrentBids
});

const ConnectedInfoBox = connect(mapStateToProps, null)(InfoBox);

export default ConnectedInfoBox;


const InfoBoxStyled = styled.div`
    margin-top: 2rem;
    padding: 20px;
    background-color: #151728;
    border-radius: 4px;

    @media (max-width: ${(pr) => pr.theme.media.tablet}) {
        margin-top: 0;
        margin-bottom: 2rem;
        background-color: transparent;
    }

    .location-data {

    }

    .intro-title {
        color: #5c5e6e;
        font-weight: 600;
        font-size: 18px;
        gap: 1rem;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        font-family: ${pr => pr.theme.font.family.secondary};

        @media (max-width: ${(pr) => pr.theme.media.tablet}) {
            align-items: center;
            font-size: 4rem;
            justify-content: center;

            .title {
                display: none;
            }
        }
    }

    .info {
        font-size: 1.6rem;
        display: flex;
        flex-direction: row;
        gap: 3rem;

        @media (max-width: ${(pr) => pr.theme.media.tablet}) {
            flex-direction: column;
            align-items: flex-start;
            margin-top: 2rem;
            flex-direction: row;
        }
    }

    .info-item {
        display: flex;
        color: #c3c5d5;
        align-items: center;
        margin-bottom: 10px;
        justify-content: flex-start;
        font-family: "DM Sans", sans-serif;

        @media (max-width: ${(pr) => pr.theme.media.tablet}) {
            flex-direction: row;
            align-items: flex-start;
            margin-bottom: 0px;
            font-size: 1.2rem;
        }
    }

    .icon {
        color: #FEB800;

        @media (max-width: ${(pr) => pr.theme.media.tablet}) {
            display: none;
        }
    }
    
    .info-item > svg { /* Targets direct SVG children of info-item */
        margin-right: 10px; /* Space between icon and text */
    }


`





