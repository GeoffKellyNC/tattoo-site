import React, { useState, useEffect } from 'react'
import { UserJobType, JobBidType } from '../../store/jobs/ts-types/jobTypes'
import styled from 'styled-components'

import defaultImg from '../../assets/defaultJobImg.png'

// Components
import FullJobModal from './FullJobModal'

//Imported Icons
import { FaBriefcaseMedical } from "react-icons/fa6";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";


interface Props {
    job: UserJobType,
    artistCurrentBids?: JobBidType[],
    clientCurrentBids?: JobBidType[],
    accountType: string

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
  clientCurrentBids
}) => {
  const [jobOpen, setJobOpen] = useState<boolean>(false)
  const [bidSubmitted, setBidSubmitted] = useState<boolean>(false)
  const [jobHasBid, setJobHasBid] = useState<boolean>(false)
  const [jobBids, setJobBids] = useState<JobBidType[]>([])
  const [numOfBids, setNumOfBids] = useState<number>(0)

  useEffect(() => {
    if(accountType === 'artist' && artistCurrentBids.length > 0){
      const found = artistCurrentBids.find(bid => bid.job_id === job.job_id)
      if(found){
        setBidSubmitted(true)
      }
    }

    if(accountType === 'client' && clientCurrentBids.length > 0){
        const newJobBids = clientCurrentBids.filter(bid => bid.job_id === job.job_id);
        setJobBids(newJobBids); 
        setNumOfBids(newJobBids.length); 
        setJobHasBid(newJobBids.length > 0);
    }
  }, [accountType, artistCurrentBids, clientCurrentBids, job.job_id])


  const handleJobClick = (event) => {
    event.stopPropagation();
    setJobOpen(true);
  };

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
            jobHasBid = {jobHasBid} /> 
            )
      }
      <JobContainer onClick = {handleJobClick} jobHasBid = {jobHasBid}>

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
            <span className = 'job-budget'> ${job.job_budget} </span>
            {
              jobHasBid && (
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
          <button className = 'view-job-btn'> View Job </button>
      </JobContainer>
    </>
  )
}

export default ActiveJobListing


const JobContainer = styled.div<{jobHasBid: boolean}>`
    width: 20%;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    background-color: #151718;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border: ${({jobHasBid}) => jobHasBid ? '1px solid gold' : 'none'};

    &:hover {
      scale: 1.1;
      border: 1px solid #f55963;
    }

    .view-job-btn {
      display: none;
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
    height: 80%;
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
  padding: 1rem;
  font-family: sans-serif;

  .icons-container {
    display: flex;
    gap: 1rem;
  }

  .job-title {
    font-size: ${pr => pr.theme.font.size.m};
    font-weight: bold;
  }

`
