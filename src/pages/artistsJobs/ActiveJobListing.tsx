import React from 'react'
import { UserJobType } from '../../store/jobs/ts-types/jobTypes'
import styled from 'styled-components'

interface Props {
    job: UserJobType
}

const ActiveJobListing: React.FC<Props> = ({job}) => {
  return (
    <JobBody>
        <span> {job.job_title} </span>
    </JobBody>
  )
}

export default ActiveJobListing


const JobBody = styled.div`
    border: 1px solid red;
    
`