import React, { useState, useEffect } from 'react'
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


  return (
   <>
    <JobMainBody onClick={handleJobClick} jobHasBid = {jobHasBid} bidSubmitted = {bidSubmitted}>
        <ListingHeading job = {job} />
    </JobMainBody>
   </>
  )
}

export default JobListing

const JobMainBody = styled.div<{jobHasBid: boolean, bidSubmitted: boolean}>`
    width: 25%;
    height: auto;


`

