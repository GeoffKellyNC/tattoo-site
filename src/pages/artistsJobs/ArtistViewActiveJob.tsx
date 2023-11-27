import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../store/root.reducer'
import { UserJobType } from '../../store/jobs/ts-types/jobTypes'

import ActiveJobListing from './ActiveJobListing'

interface Props {
  allActiveJobs: UserJobType[]
}

const ArtistViewActiveJob: React.FC<Props> = ({
  allActiveJobs
}) => {
  return (
    <StyledActiveJobs>
      {
        allActiveJobs.length < 1 ? (
          <div> No Active Jobs </div>
        ) : (
          allActiveJobs.map((jobObj: UserJobType) => {
           return <ActiveJobListing key = {jobObj.job_id} job = {jobObj} />
          })
        )
      }
    </StyledActiveJobs>
  )
}

const mapStateToProps = (st: RootState) => ({
  allActiveJobs: st.allActiveJobs
})

const ConnectedArtistViewActiveJob = connect(mapStateToProps, null)(ArtistViewActiveJob)

export default ConnectedArtistViewActiveJob

const StyledActiveJobs = styled.div`
  color: white;

`