import React from 'react'
import { UserJobType } from '../../store/jobs/ts-types/jobTypes'
import styled from 'styled-components'

import defaultImg from '../../assets/defaultJobImg.png'

interface Props {
    job: UserJobType
}

const ActiveJobListing: React.FC<Props> = ({job}) => {
  return (
    <JobContainer>
        <JobHeader>
          <img 
            src = { job.job_photos.length < 1 ? defaultImg : job.job_photos[0] } 
            className = 'job-img'/>
          <span className = 'job-title'>@{job.owner_user_name}</span>
        </JobHeader>
        <JobBody>
          <span className = 'job-title'> {job.job_title} </span>
          <span className = 'job-budget'> ${job.job_budget} </span>
        </JobBody>
    </JobContainer>
  )
}

export default ActiveJobListing


const JobContainer = styled.div`
    border: 1px solid white;
    width: 20%;
    border-radius: 10px;
`

const JobHeader = styled.div`

  .job-img {
    width: 100%;
    height: 80%;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
  }

`

const JobBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  font-family: sans-serif;

`
