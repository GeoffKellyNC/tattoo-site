import React from 'react'
import { JobBidType, UserJobType } from '../../store/jobs/ts-types/jobTypes';
import { Drawer } from 'antd';
import styled from 'styled-components';


import Bid from './Bid'

interface Props {
    bidDrwaerOpen: boolean;
    setBidDrwaerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    jobBids: JobBidType[];
    jobData: UserJobType;

}

const ClientViewBid: React.FC<Props> = ({
    bidDrwaerOpen,
    setBidDrwaerOpen,
    jobBids,
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



export default ClientViewBid


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