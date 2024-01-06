import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { connect, useDispatch } from 'react-redux'
import { RootState } from '../../../../../../store/root.reducer'
import { UserData, ClientProfileDetailsType } from '../../../../../../store/user/user.reducer'
import { UserJobType, JobBidType, ArtistAcceptedJobType } from '../../../../../../store/jobs/ts-types/jobTypes'
import EditProfileDrawer from '../EditProfileDrawer'
import { useMobileCheck } from '../../../../../../hooks/isMobile'
import * as jobActions from '../../../../../../store/jobs/jobs.actions'
import * as notifyTypes from '../../../../../../store/notifications/notify.types'


// Icons
import { GiTribalShield } from 'react-icons/gi'
import { MdOutlineWork } from "react-icons/md";
import { ImHammer2 } from "react-icons/im";
import { artistAcceptedJobs } from '../../../../../../store/jobs/jobs.reducer'



interface Props {
    userData: UserData;
    userProfileDetails: ClientProfileDetailsType;
    userJobs: UserJobType[];
    accountType: string;
    clientCurrentBids: JobBidType[];
    artistAcceptedJobs: ArtistAcceptedJobType[];
    getArtistAcceptedJobs: () => Promise<void>;
    
}

const InfoBox: React.FC<Props> = ({
    userProfileDetails,
    userData,
    userJobs,
    accountType,
    clientCurrentBids,
    getArtistAcceptedJobs,
    artistAcceptedJobs
}) => {

    const isMobile = useMobileCheck()


    //Getting Artist Accepted Jobs if userType is artists

    const dispatch = useDispatch()

    const getDataAndNotify = useCallback(async () => {
        await getArtistAcceptedJobs()
        artistAcceptedJobs.length > 1 ? dispatch({
            type: notifyTypes.SET_USER_DATA_NOTIFY,
            payload: {
                active: true,
                message: `You have ${artistAcceptedJobs.length} accepted bids!`
            }
        }) : null
    }
    , [getArtistAcceptedJobs, artistAcceptedJobs.length, dispatch])

    useEffect(() => {
        accountType === 'artist' && getDataAndNotify()
    }, [accountType, getDataAndNotify])

  return (
    <InfoBoxStyled>
        <div className = 'intro-title'>
            <span className='title'>Intro</span>
            <EditProfileDrawer />
        </div>
        <div className = 'info'>
            <div className = 'info-item'>
                <GiTribalShield className = 'icon'  />
                <span className = 'info-text'>{userProfileDetails.number_of_tattoos}</span>
                <span className = 'info-text-title'> Tattoos </span>
            </div>
            {
                accountType === 'client' && (
                    <div className = 'info-item'>
                        <MdOutlineWork className = 'icon' />
                        <span className = 'info-text'>{userJobs.length}</span>
                        <span className = 'info-text-title'> Jobs Posted </span>
                    </div>
                )
            }
            {
                accountType === 'client' && (
                    <div className = 'info-item'>
                        <ImHammer2 className = 'icon' />
                        <span className = 'info-text'>{clientCurrentBids.length} </span>
                        <span className = 'info-text-title'> Bids Posted </span>
                    </div>
                )
            }
            {
                accountType === 'artist' && (
                    <div className = 'info-item'>
                        <ImHammer2 className = 'icon' />
                        <span className = 'info-text'>{artistAcceptedJobs.length} </span>
                        <span className = 'info-text-title'> Accepted Bids </span>
                    </div>
                )
            }
            {
                accountType === 'artist' &&
                <div className = 'info-item'>
                    <span className = 'info-text rating'>. </span>
                    <span className = 'info-text rating'> No Rating </span>
                </div>
            }
        </div>
    </InfoBoxStyled>
  )
}
const mapStateToProps = (st: RootState) => ({
    userData: st.userData,
    userProfileDetails: st.userProfileDetails,
    userJobs: st.userJobs,
    accountType: st.accountType,
    clientCurrentBids: st.clientCurrentBids,
    artistAcceptedJobs: st.artistAcceptedJobs
});

const ConnectedInfoBox = connect(mapStateToProps, {
    getArtistAcceptedJobs: jobActions.getArtistAcceptedJobs,
})(InfoBox);

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
        flex-direction: column;
        align-items: flex-start;
        gap: 3rem;
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
        justify-content: flex-start;
        font-family: ${pr => pr.theme.font.family.secondary};

        @media (max-width: ${(pr) => pr.theme.media.tablet}) {
            flex-direction: column;
            align-items: center;
            font-size: 1.2rem;
        }
    }

    .info-text {
        font-size: 1.4rem;
        margin: 0 1rem;
        color: #fff;
        font-weight: 600;
        font-family: ${pr => pr.theme.font.family.secondary};
        color: ${pr => pr.theme.color.red};
    }

    .rating {
        color: #fff;
        font-size: 1.2rem;
        font-weight: 600;
        font-family: ${pr => pr.theme.font.family.secondary};
        color: ${pr => pr.theme.color.red};
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





