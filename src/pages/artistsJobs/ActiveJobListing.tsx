import React, { useState } from 'react'
import { UserJobType } from '../../store/jobs/ts-types/jobTypes'
import styled from 'styled-components'

import defaultImg from '../../assets/defaultJobImg.png'

// Components
import FullJobModal from './FullJobModal'

//Imported Icons
import { FaBriefcaseMedical } from "react-icons/fa6";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";


interface Props {
    job: UserJobType
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

const ActiveJobListing: React.FC<Props> = ({job}) => {
  const [jobOpen, setJobOpen] = useState<boolean>(false)

  const handleJobClick = (event) => {
    event.stopPropagation();
    setJobOpen(true);
  };

  return (
    <>
            {
        jobOpen && <FullJobModal data = {job} setJobOpen = {setJobOpen} /> 
      }
      <JobContainer onClick = {handleJobClick}>

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
          </JobBody>
      </JobContainer>
    </>
  )
}

export default ActiveJobListing


const JobContainer = styled.div`
    width: 20%;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    background-color: #151718;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);

    &:hover {
      scale: 1.1;
      border: 1px solid #f55963;
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
