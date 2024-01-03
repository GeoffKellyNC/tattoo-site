import React, { useState, useEffect } from 'react'
import { UserJobType, JobBidType, ArtistAcceptedJobType } from '../../store/jobs/ts-types/jobTypes'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../store/root.reducer'
import { ContactInfo } from '../../store/user/types/userStateTypes'
import { UserData } from '../../store/user/user.reducer'
import * as jobActions from '../../store/jobs/jobs.actions'

import defaultImg from '../../assets/defaultJobImg.png'

// Components
import FullJobModal from '../../components/fullJobModal/FullJobModal'

//Imported Icons
import { FaBriefcaseMedical } from "react-icons/fa6";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";



interface Props {
    job: UserJobType,
    artistCurrentBids?: JobBidType[],
    clientCurrentBids?: JobBidType[],
    accountType: string,
    isJobAccepted?: boolean,
    accetpedJobData?: ArtistAcceptedJobType,
    userContactProfile: ContactInfo,
    userData: UserData,
    deleteJob: (jobId: string, ownerId: string) => Promise<void>

}

const painTolerance = (tolerance: string | number) => {
  switch(tolerance){
    case 'low':
      return <BsFillEmojiSunglassesFill title = 'LOW pain tolerance' color = 'green' />
    case 'moderate':
      return <BsFillEmojiSunglassesFill title = 'MODERATE pain tolerance' color = 'yellow' />
    case 'high':
      return <BsFillEmojiSunglassesFill title = 'HIGH pain tolerance' color = 'red' />
    default: 
      return
  }
}

const ActiveJobListing: React.FC<Props> = ({
  job,
  artistCurrentBids,
  accountType,
  clientCurrentBids,
  isJobAccepted,
  accetpedJobData,
  userContactProfile,
  userData,
  deleteJob
}) => {
  const [jobOpen, setJobOpen] = useState<boolean>(false)
  const [bidSubmitted, setBidSubmitted] = useState<boolean>(false)
  const [jobHasBid, setJobHasBid] = useState<boolean>(false)
  const [jobBids, setJobBids] = useState<JobBidType[]>([])
  const [numOfBids, setNumOfBids] = useState<number>(0)
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

  useEffect(() => {
    if(accountType === 'artist'){
      if(!isJobAccepted  && artistCurrentBids.length > 0){
        const found = artistCurrentBids.find(bid => bid.job_id === job.job_id)
        if(found){
          setBidSubmitted(true)
        }
        return
      }

      return
    }

    if(accountType === 'client'){
      if(!isJobAccepted && clientCurrentBids.length > 0){
          const newJobBids = clientCurrentBids.filter(bid => bid.job_id === job.job_id);
          setJobBids(newJobBids); 
          setNumOfBids(newJobBids.length); 
          setJobHasBid(newJobBids.length > 0); 
      }

      return
    }
  }, [accountType, artistCurrentBids, clientCurrentBids, isJobAccepted, job.job_id])


  const handleJobClick = (event) => {
    event.stopPropagation();
    if(event.target.className.baseVal === 'delete-icon') return
    if(event.target.className === 'confirm' || event.target.className === 'cancel') return
    setJobOpen(true);
  };

  const handleDeleteJob = async () => {
    if(userData.unxid !== job.owner_id) return
    await deleteJob(job.job_id, userData.unxid)
    setConfirmDelete(false)
  }

  return (
    <>
      {
        jobOpen && (
          <FullJobModal 
            data = {job} 
            setJobOpen = {setJobOpen} 
            bidSubmitted = {bidSubmitted} 
            accountType= {accountType}
            jobBids={jobBids}
            jobHasBid = {jobHasBid} 
            isJobAccepted = {isJobAccepted}
            accceptedJobData={accetpedJobData}
            artistContactData = {userContactProfile}
            /> 
            )
      }
      <JobContainer onClick = {handleJobClick} jobHasBid = {jobHasBid} bidSubmitted = {bidSubmitted}>

          <JobHeader>
            <img 
              src = { job.job_photos.length < 1 ? defaultImg : job.job_photos[0] } 
              className = 'job-img'/>
            <span className = 'job-owner'>{job.owner_user_name}</span>
          </JobHeader>
          <JobBody>
            <div className = 'icons-container'>
              <div className = 'medical icon-container'>
                {
                  job.job_characteristics.has_allergy === 'true' || job.job_characteristics.skin_condition === 'true' ? <FaBriefcaseMedical color = 'orange' title = 'Has Allergy or Skin Condition' /> : null
                }
              </div>
              <div className = 'pain icon-container'>
                {
                  job.job_characteristics.pain_tolerance ? painTolerance(job.job_characteristics.pain_tolerance) : null
                }
              </div>
            </div>
            <span className = 'job-title'> {job.job_title} </span>
            { !isJobAccepted && <span className = 'job-budget'> <span className = 'item-title'>Budget: </span> ${job.job_budget} </span>}
            { isJobAccepted && accountType === 'client' && <span className = 'job-budget'> <span className = 'item-title'>Final Price: </span> ${accetpedJobData.attr1.proposed_price} </span>} 
            <span className = 'job-location'> <span className='item-title'>Location: </span>{job.job_location} </span>
            {
              jobHasBid && accountType === 'client'  &&(
                <div className = 'bid-count-container'>
                  <FaMoneyBillAlt color = 'green' />
                  <span className = 'bid-count'> Job has {numOfBids} bids! </span>
                </div>
              )
            }
            {
              bidSubmitted && <span className = 'bid-submitted'> Bid Submitted </span>
            }
          </JobBody>
          {
              accountType === 'client' && job.owner_id === userData.unxid && !confirmDelete && (
                <MdDeleteForever 
                  color = {'red'}
                  size = {'2rem'}
                  className = 'delete-icon' 
                  onClick = {() => setConfirmDelete(true)} />
              )
            }
            {
               accountType === 'client' && job.owner_id === userData.unxid && confirmDelete && (
                <div className = 'confrim-delete-container'>
                  <button className = 'confirm' onClick = {handleDeleteJob}>
                    Confirm
                  </button>
                  <button className = 'cancel' onClick = {() => setConfirmDelete(false)}> Cancel </button>
                </div>
               )
            }
          <button className = 'view-job-btn'> View Job </button>
      </JobContainer>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  userContactProfile: state.userContactProfile,
  userData: state.userData,
})
  

const ConnectedActiveJobListing = connect(mapStateToProps, {
  deleteJob: jobActions.deleteJob
})(ActiveJobListing)

export default ConnectedActiveJobListing


const JobContainer = styled.div<{jobHasBid: boolean, bidSubmitted: boolean}>`
    width: 20%;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    background-color: #151718;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border: ${({jobHasBid}) => jobHasBid ? '1px solid gold' : 'none'};
    border: ${({bidSubmitted}) => bidSubmitted ? '1px solid #0aff0a' : 'none'};

    &:hover {
      scale: 1.1;
      border: 1px solid #f55963;
    }

    .view-job-btn {
      display: none;
    }

    .confrim-delete-container {
      display: flex;
      justify-content: center;
      gap: 1rem;

      .cancel, .confirm {
        font-family: ${pr => pr.theme.font.family.secondary};
        font-weight: bold;
        margin: 5px;
        border: none;
        outline: 1px solid ${pr => pr.theme.color.red};
        background: none;
        color: white;
        transition: all 0.3s;

        &:hover {
          background: #f55963;
          scale: 1.1;
        }
      }
    }

    @media (min-width: 601px) and (max-width: 1024px) { 
      width: 60%;

      .view-job-btn {
        display: block;
        width: 100%;
        padding: 0.5rem;
        border: none;
        background-color: #f55963;
        font-family: ${pr => pr.theme.font.family.primary};
        font-size: ${pr => pr.theme.font.size.s};
        color: white;
      }
      
    }

    @media (max-width: 600px) { 
      width: 60%;

      .view-job-btn {
        display: block;
        width: 100%;
        padding: 0.5rem;
        border: none;
        background-color: #f55963;
        font-family: ${pr => pr.theme.font.family.primary};
        font-size: ${pr => pr.theme.font.size.s};
        color: white;
      }
    }
`

const JobHeader = styled.div`

  .job-img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }

  .job-owner {
    text-transform: uppercase;
    font-size: 0.7rem;
    margin-left: 5px;
  }

`

const JobBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: sans-serif;

  .icons-container {
    display: flex;
    gap: 1rem;
    border-bottom: 1px solid ${pr => pr.theme.color.red};
    width: 100%;
    padding: 0.5rem 1rem;
  }

  .job-title {
    font-size: 1.6rem;
    font-family: ${pr => pr.theme.font.family.secondary};
    font-weight: bold;
    padding: 0.5rem;
    border-bottom: 1px solid ${pr => pr.theme.color.red};

    @media (max-width: 600px) {
      font-size: 1.2rem; /* Adjust header font size for mobile */
    }
  }

  .job-budget {
    font-size: 1.4rem;
    font-family: ${pr => pr.theme.font.family.secondary};
    padding: 0.5rem;

    @media (max-width: 600px) {
      font-size: 1.2rem; /* Adjust label font size for mobile */
    }
  }

  .job-location {
    font-size: 1.4rem;
    font-family: ${pr => pr.theme.font.family.secondary};
    padding-left: 0.5rem;

    @media (max-width: 600px) {
      font-size: 1.2rem; /* Adjust label font size for mobile */
    }
  } 

  .bid-count-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: ${pr => pr.theme.font.family.secondary};
    font-size: 1.5rem;
    padding-left: 0.5rem;

    @media (max-width: 600px) {
      font-size: 1.2rem; /* Adjust label font size for mobile */
    }
  }

  .bid-count {
    font-size: 1.4rem;
    font-family: ${pr => pr.theme.font.family.secondary};
  }

  .bid-submitted {
    font-size: 1.4rem;
    font-family: ${pr => pr.theme.font.family.secondary};
    padding: 0.5rem;
    color: #0aff0a;
  }

  .item-title {
    font-weight: bold;
    color: #FAB800;
  }


`
