import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
// import * as jobActions from '../../../store/jobs/jobs.actions'
import { RootState } from '../../../../store/root.reducer'
import { UserJobType, JobBidType } from '../../../../store/jobs/ts-types/jobTypes'

import CreateJobForm from './CreateJobForm'
import ActiveJobListing from '../../../artistsJobs/ActiveJobListing'


interface Props { 
  userJobs: UserJobType[],
  clientCurrentBids: JobBidType[],
  accountType: string
}


const ClientPostedJobs: React.FC<Props> = ({
  userJobs,
  clientCurrentBids,
  accountType
}) => {
  return (
    <StyledClientPostedJobs>
        <div className='jobs-header'>
            <div className = 'command-container'>
              <CreateJobForm />
             <div className = 'bid-count-container'>
              <span className = 'bid-count-text'> Bids: </span>
              <span className = 'bid-count'> {clientCurrentBids.length} </span>
             </div>
            </div>
        </div>
        <div className='job-container'>
        {
          userJobs.length < 1 ? (
            <div className='no-job-container'>
              <span className = 'no-jobs-text'> NO JOBS POSTED </span>
            </div>
          ) : (
            userJobs.map((job: UserJobType, idx: number) => <ActiveJobListing key = {idx} job = {job} accountType= {accountType} clientCurrentBids = {clientCurrentBids} />)
          )
        }
        </div>
    </StyledClientPostedJobs>
  )
}

const mapStateToProps = (st: RootState) => ({
    userJobs: st.userJobs,
    clientCurrentBids: st.clientCurrentBids,
    accountType: st.accountType
})

const ConnectedClientPostedJobs = connect(mapStateToProps, null)(ClientPostedJobs)


export default ConnectedClientPostedJobs


const StyledClientPostedJobs = styled.div`
    color: white;
    font-size: 1rem;
    width: 100%;

    .command-container {
      border-bottom: 1px solid #272a3a;
      padding-bottom: 1rem;
      height: 3rem;
      width: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 1rem;
      gap: 5rem;
      margin-top: 1rem;
    }

    .bid-count-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: ${pr => pr.theme.font.family.secondary};
      font-size: 1.5rem;
    }

    .no-job-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    .no-jobs-text {
      font-size: 1.5rem;
      color: #272a3a;
      font-weight: 500;
    }

    .job-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      width: 90%;
      margin: 0 auto;
      height: auto;
      min-height: 100vh;  // Added min-height
    }

    @media (max-width: 1000px) {
      // Additional styles for mobile view can go here if needed
    }
`;

