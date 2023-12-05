import React from 'react'
import { JobBidType, UserJobType } from '../../store/jobs/ts-types/jobTypes';
import { ArtistFullProfile } from '../../store/user/types/userStateTypes';
import { Drawer } from 'antd';
import * as jobActions from '../../store/jobs/jobs.actions';
import { connect } from 'react-redux';


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
    <Drawer
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
    </Drawer>
  )
}


const ConnectedClientViewBid = connect(null, {
    getArtistDataForBid: jobActions.getArtistDataForBid
})(ClientViewBid)

export default ConnectedClientViewBid