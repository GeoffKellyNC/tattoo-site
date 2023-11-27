import React from 'react'
import { UserJobType } from '../../../../store/jobs/ts-types/jobTypes'

interface Props {
    job: UserJobType
}

const ActiveJobListing: React.FC<Props> = ({job}) => {
  return (
    <div>
        <span> {job.job_title} </span>
    </div>
  )
}

export default ActiveJobListing