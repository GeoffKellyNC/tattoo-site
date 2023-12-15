import React, { useState, useEffect, useCallback } from 'react'
import { JobBidType, UserJobType } from '../../../../store/jobs/ts-types/jobTypes'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as jobActions from '../../../../store/jobs/jobs.actions'
import { RootState } from '../../../../store/root.reducer'
import { UserData } from '../../../../store/user/user.reducer'
import defaultImage from '../../../../assets/defaultJobImg.png'

import FullJobModal from '../../../artistsJobs/FullJobModal'

interface Props {
    bidData: JobBidType,
    getJobById: (jobId: string) => Promise<UserJobType | boolean>,
    userData: UserData,
    accountType: string

}

const ArtistBidItem: React.FC<Props> = ({
  bidData,
  getJobById,
  accountType
}) => {
const [loadingData, setLoadingData] = useState<boolean>(false);
const [jobData, setJobData] = useState(null);
const [error, setError] = useState<string | null>(null);
const [jobOpen, setJobOpen] = useState<boolean>(false)


const getJobData = useCallback(async () => {
  setLoadingData(true);
  setError(null);
  console.log('Getting job data for bid', bidData.job_id);

  try {
    const jobData = await getJobById(bidData.job_id);
    if (jobData) {
      setJobData(jobData);
    } else {
      setError('Job data not found');
    }
  } catch (err) {
    setError('Error fetching job data');
    console.error('Error fetching job data:', err);
  }

  setLoadingData(false);
}, [bidData.job_id, getJobById]);

  const handleJobClick = (event) => {
    event.stopPropagation();
    setJobOpen(true);
  };

useEffect(() => {
  getJobData();
}, [getJobData]);

return (
  <>
    {
      jobOpen && <FullJobModal accountType = {accountType} data = {jobData} setJobOpen = {setJobOpen} showButton = {false} />
    }
    <BidContainer onClick = {handleJobClick}>
      {loadingData ? (
        <BidItem>
          <span>Loading...</span>
        </BidItem>
      ) : error ? (
        <BidItem>
          <span>{error}</span>
        </BidItem>
      ) : jobData ? (
        <BidItem>
          <div className = 'header-top'>
            <img 
              src = {jobData.job_photos.length > 0 ? jobData.job_photos[0] : defaultImage} 
              alt = 'job' 
              className = 'job-image'
            />
          </div>
          <div className = 'header-bottom'>
            <div className = 'title-container'>
              <span className = 'title-text job-title'> Job: </span>
              <span className = 'user-text'> {jobData.job_title} </span>
            </div>
            <div className = 'bid-amount-container'>
              <span className = 'title-text bid-amount-title'> Your Bid: </span>
              <span className = 'user-text'> ${bidData.proposed_price} </span>
            </div>
            <div className = 'user-amount-container'>
              <span className = 'title-text user-amount-title'> Client Budget: </span>
              <span className = 'user-text'> ${jobData.job_budget} </span>
            </div>
          </div>
        </BidItem>
      ) : (
        <BidItem>
          <span>No data available</span>
        </BidItem>
      )}
    </BidContainer>
  </>
);
};

const mapStateToProps = (state: RootState) => ({
    userData: state.userData,
    accountType: state.accountType
})

const ConnectedArtisBidItem = connect(mapStateToProps, {
    getJobById: jobActions.getJobById,
})(ArtistBidItem)

export default ConnectedArtisBidItem

const BidContainer = styled.div`
  background-color: #151728;
  border: 1px solid red;
  width: 30%;
  height: 100%;
  margin: 1rem;

  &:hover {
    scale: 1.1;
  }
  
  @media (max-width: 1024px) {
    width: 60%;
    height: 100%;
  }

`

const BidItem = styled.div`

  .job-image {
    height: 50%;
    width: 100%;
  }

  .title-text {
    font-weight: bold;
    font-size: 1.2rem;
    font-family: ${props => props.theme.font.family.primary};
  }

  .user-text {
    font-size: 1.2rem;
    font-family: ${props => props.theme.font.family.secondary};
  }

  .header-top {
    height: 50%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header-bottom {
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }


`;
