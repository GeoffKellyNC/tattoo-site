import React, { useState } from 'react'
import styled from 'styled-components'
import { UserJobType } from '../../../../store/jobs/ts-types/jobTypes'

import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md'

interface Props {
    job: UserJobType
}



const ClientOwnJob: React.FC<Props> = ({
    job
}) => {
    const [expanded, setExpanded] = useState<boolean>(false)
  return (
    <StyledClientOwnJob>
        <div className='job-header'>
            <div className='job-title header-section'>
                <span className = 'label'>Name: </span>
                <span className='user-text'>{job.job_title}</span>
            </div>
            <div className='job-location header-section'>
                <span className = 'label'>Location: </span>
                <span className='user-text'>{job.job_location}</span>
            </div>
            <div className='job-budget header-section'>
                <span className = 'label'>Budget: </span>
                <span className='user-text'>{job.job_budget}</span>
            </div>
            <div className='job-status header-section'>
                <span className = 'label'>Status: </span>
                <span className='user-text'>{job.job_status ? 'Active' : 'Removed'}</span>
            </div>
            <div className='job-date header-section'>
                <span className = 'label'>Expires: </span>
                <span className='user-text'>{job.job_expiry_date.toString()}</span>
            </div>
            <div className='job-expand header-section'>
                <span className='user-text' onClick = {() => setExpanded(prev => !prev)}>{expanded ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}</span>
            </div>
        </div>
        {
            expanded && (
                <div className='job-body'>
                    <div className='job-description'>
                        <span className = 'label'>Description: </span>
                        <span className='user-text'>{job.job_desc}</span>
                    </div>
                    <div className='job-requirements'>
                        <span className = 'label'>Allegy: </span>
                        <span className='user-text'>{job.job_characteristics.has_allergy}</span>
                    </div>
                </div>
            )
        }
    </StyledClientOwnJob>
  )
}





export default ClientOwnJob


const StyledClientOwnJob = styled.div`
background-color: #24273A;
height: auto;
margin: 1rem;
border-radius: 0.5rem;
border: 3px solid #272a3a;
box-shadow: 0 0 0.5rem #000;

&:hover {
    border: 3px solid #fff;
    scale: 1.01;
}

.job-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;  // Ensures wrapping
    align-items: center;
    padding: 1rem;

    @media (max-width: 1000px) {
        flex-direction: column;
    }
}

.header-section {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: 1000px) {
        width: 100%;
        flex-direction: column;
        margin-bottom: 0.5rem;  // Added margin for spacing
    }
}
    .label {
        font-weight: bold;
        margin-right: 0.5rem;
        font-family: 'DM Sans', sans-serif;
        color: ${pr => pr.theme.color.red};
    }

    .user-text {
        font-weight: 400;
        font-family: 'DM Sans', sans-serif;
        color: #fff;
    }

    .job-title {
        width: 20%;
    }

    .job-location {
        width: 20%;
    }

    .job-budget {
        width: 20%;
    }

    .job-status {
        width: 20%;
    }

    .job-date {
        width: 20%;
    }

    

`