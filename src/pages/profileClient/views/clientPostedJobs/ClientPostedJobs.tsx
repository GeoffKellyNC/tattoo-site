import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
// import * as jobActions from '../../../store/jobs/jobs.actions'
import { RootState } from '../../../../store/root.reducer'
import { UserJobType } from '../../../../store/jobs/ts-types/jobTypes'

import CreateJobForm from './CreateJobForm'
import ClientOwnJob from './ClientOwnJob'


interface Props {
  userJobs: UserJobType[]
}

const ClientPostedJobs: React.FC<Props> = ({
  userJobs
}) => {
  return (
    <StyledClientPostedJobs>
        <div className='jobs-header'>
            <div className = 'command-container'>
              <CreateJobForm />
            </div>
        </div>
        <div className='job-container'>
        {
          userJobs.length < 1 ? (
            <div className='no-job-container'>
              <span className = 'no-jobs-text'> NO JOBS POSTED </span>
            </div>
          ) : (
            userJobs.map((job: UserJobType, idx: number) => <ClientOwnJob key = {idx} job = {job} />)
          )
        }
        </div>
    </StyledClientPostedJobs>
  )
}

const mapStateToProps = (st: RootState) => ({
    userJobs: st.userJobs
})

const ConnectedClientPostedJobs = connect(mapStateToProps, null)(ClientPostedJobs)


export default ConnectedClientPostedJobs


const StyledClientPostedJobs = styled.div`
    color: white;
    font-size: 1rem;
    width: 100%;

    .command-container {
      border-bottom: 1px solid #272a3a;
      padding-bottom: 1rem;
      height: 3rem;
      width: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 1rem;
    }

    .no-job-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    .no-jobs-text {
      font-size: 1.5rem;
      color: #272a3a;
      font-weight: 500;
    }

    .job-container {
      display: flex:
      flex-direction: column;
      width: 100%;
      height: auto;
      overflow: auto;
    }


`
