import React from 'react'
import defaultImg from '../../../assets/defaultJobImg.png'
import styled from 'styled-components'
import { UserJobType } from '../../../store/jobs/ts-types/jobTypes'


interface Props {
  job: UserJobType
}

const ListingHeading: React.FC<Props> = ({
    job
}) => {
  return (
    <StyledListingHeading>
        <img 
            src = { job.job_photos.length < 1 ? defaultImg : job.job_photos[0] } 
            className = 'job-img'/>
        <span className = 'job-owner'>{job.owner_user_name}</span>
    </StyledListingHeading>
  )
}

export default ListingHeading

const StyledListingHeading = styled.div`

    .job-img {
        width: 100%;
        height: 10%;
        object-fit: cover;
        border-radius: 5px;
    }

`