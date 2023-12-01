import React from 'react'
import { JobBidType } from '../../../../store/jobs/ts-types/jobTypes'

interface Props {
    bidData: JobBidType
}

const ArtistBidItem: React.FC<Props> = ({
    bidData
}) => {
  return (
    <div>
        {bidData.job_id}
    </div>
  )
}

export default ArtistBidItem