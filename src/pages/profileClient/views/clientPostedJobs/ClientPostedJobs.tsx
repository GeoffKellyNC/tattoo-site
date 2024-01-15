import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
// import * as jobActions from '../../../store/jobs/jobs.actions'
import { RootState } from '../../../../store/root.reducer'
import { UserJobType, JobBidType } from '../../../../store/jobs/ts-types/jobTypes'
import { UserFullProfile } from '../../../../store/user/types/userStateTypes'

import CreateJobForm from './CreateJobForm'
import ActiveJobListing from '../../../artistsJobs/ActiveJobListing'


interface Props { 
  userJobs: UserJobType[],
  clientCurrentBids: JobBidType[],
  accountType: string,
  userData: UserFullProfile
}


const ClientPostedJobs: React.FC<Props> = ({
  userJobs,
  clientCurrentBids,
  accountType,
  userData
}) => {

  // const reversedJobs = [...userJobs].reverse()

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
        <Header>
        <div className="title-container">
          <span className="title-text">{userData.display_name}'s Tattoo Requests</span>
        </div>
        <div className="desc-container">
          <span className="desc-text">
            Welcome to your tattoo request page. You can create a new job by clicking the "Create Job" button.
            View your posted jobs to check for new bids, and click on a job to add photos and view details.
          </span>
        </div>
      </Header>
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
    accountType: st.accountType,
    userData: st.userData
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
      justify-content: flex-start;
      align-items: center;
      gap: 3rem;
      width: 90%;
      margin: 1rem auto;
      height: auto;
      min-height: 80vh;  // Added min-height
    }

    @media (max-width: 1000px) {
      .command-container {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 1rem;
        padding: 0;
      }

      .bid-count-container {
        font-size: 1rem;
      }

      .job-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }
    }
`;

const Header = styled.div`
    padding: 2rem;
    background-color:  #ffb800; // Updated color for a more sleek look
    border-radius: 8px; // Added rounded corners
    box-shadow: 0 4px 8px rgba(0,0,0,0.1); // Added subtle shadow for depth
    font-family: ${pr => pr.theme.font.family.secondary};

    .title-container {
      display: flex;
      align-items: center;
      padding: 0.5rem 0;
    }

    .title-text {
      font-size: 2.5rem; // Slightly larger font for emphasis
      font-weight: 600;
      color: #272a3a;
      margin-bottom: 0.5rem; // Added margin for better spacing
    }

    .desc-container {
      display: flex;
      align-items: center;
      font-size: 1.2rem; // Adjusted font size for readability
      color: #272a3a;
      line-height: 1.5; // Improved line spacing
    }

    @media (max-width: 1000px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      margin-bottom: 1rem;

      .title-container {
        padding: 0;
      }

      .title-text {
        font-size: 2rem;
      }

      .desc-container {
        font-size: 1rem;
        text-align: center;
      }

      .desc-text {
        padding: 0 1rem;
      }

      .desc-text {
        padding: 0 1rem;
      }


    }

    @media (max-width: 600px) {
      .title-text {
        font-size: 1.5rem;
      }
    }




`;

