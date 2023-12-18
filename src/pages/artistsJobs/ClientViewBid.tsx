import React from 'react'
import { JobBidType, UserJobType } from '../../store/jobs/ts-types/jobTypes';
import { ArtistFullProfile } from '../../store/user/types/userStateTypes';
import { Drawer } from 'antd';
import * as jobActions from '../../store/jobs/jobs.actions';
import { connect } from 'react-redux';
import styled from 'styled-components';


import Bid from './Bid'

interface Props {
    bidDrwaerOpen: boolean;
    setBidDrwaerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    jobBids: JobBidType[];
    getArtistDataForBid: (artistId: string) => Promise<ArtistFullProfile | boolean>;
    jobData: UserJobType;

}

const ClientViewBid: React.FC<Props> = ({
    bidDrwaerOpen,
    setBidDrwaerOpen,
    jobBids,
    getArtistDataForBid,
    jobData
}) => {
  return (
    <DrawerContainer
        title={`Bids for ${jobData.job_title}`}
        placement="right"
        onClose={() => setBidDrwaerOpen(false)}
        open={bidDrwaerOpen}
        width={600}
        onClick={(e) => e.stopPropagation()}
    >
        <div className = 'bids-conatiner'>
            {
                jobBids.length < 1 ? (
                    <span className = 'no-bids'> NO BIDS! </span>
                ) : (
                    jobBids.map((bid, idx) => {
                       return (
                        <Bid 
                            bidData = {bid} 
                            key = {idx} 
                            getArtistDataForBid = {getArtistDataForBid}
                            jobData = {jobData} 
                            bidDrwaerOpen = {bidDrwaerOpen}/>
                        )
                    })
                )
            }
        </div>
    </DrawerContainer>
  )
}


const ConnectedClientViewBid = connect(null, {
    getArtistDataForBid: jobActions.getArtistDataForBid
})(ClientViewBid)

export default ConnectedClientViewBid


const DrawerContainer = styled(Drawer)`
    .bids-conatiner {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        height: 100%;
    }

    .ant-drawer-body {
        background-color: rgb(21, 23, 40);
        color: white;
        font-family: ${props => props.theme.font.family.secondary};
    }

    .ant-drawer-header {
        color: white;
        font-family: ${props => props.theme.font.family.secondary};
        font-size: 4rem;
        width: 100%;
        background-color: ${props => props.theme.color.red};
    }

    .ant-drawer-header-title {
        font-size: 4rem;
        color: white;
    }

    .no-bids {
        font-size: 1.5rem;
        font-weight: 600;
        color: #000;
    }


`