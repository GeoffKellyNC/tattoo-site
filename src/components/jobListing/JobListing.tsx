import React from 'react'
import styled from 'styled-components'
import { ContactInfo } from '../../store/user/types/userStateTypes'
import { UserData } from '../../store/user/user.reducer'
import { UserJobType, JobBidType, ArtistAcceptedJobType } from '../../store/jobs/ts-types/jobTypes'


import ListingHeading from './components/ListingHeading'


interface Props {
    job: UserJobType,
    artistCurrentBids?: JobBidType[],
    clientCurrentBids?: JobBidType[],
    accountType?: string,
    isJobAccepted?: boolean,
    accetpedJobData?: ArtistAcceptedJobType,
    userContactProfile?: ContactInfo,
    userData?: UserData,
    deleteJob?: (jobId: string, ownerId: string) => Promise<void>

}

const JobListing: React.FC<Props> = ({
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
  return (
   <>
    <JobMainBody>
        <ListingHeading job = {job} />
    </JobMainBody>
   </>
  )
}

export default JobListing

const JobMainBody = styled.div`
    width: 25%;
    height: 5rem;


`

