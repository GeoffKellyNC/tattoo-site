import React, { useState } from 'react'
import styled from 'styled-components'
import { UserJobType } from '../../../../store/jobs/ts-types/jobTypes'
import AddPhotosJob from './AddPhotosJob'
import { Button, Space } from 'antd'


import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md'

interface Props {
    job: UserJobType
}



const ClientOwnJob: React.FC<Props> = ({
    job
}) => {
    const [expanded, setExpanded] = useState<boolean>(false)
    const [addPhoto, setAddPhoto] = useState<boolean>(false)

    const handleAddPhoto = () => {
        setAddPhoto(!addPhoto)
    }

  return (
    <StyledClientOwnJob>
        <div className='job-header'>
            <div className='job-title header-section'>
                <span className = 'label'>Name: </span>
                <span className='user-text title-text'>{job.job_title}</span>
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
                <span className='user-text' onClick = {() => setExpanded(prev => !prev)}>{expanded ? <MdOutlineExpandMore size = {'3rem'} /> : <MdOutlineExpandLess size = {'3rem'} />}</span>
            </div>
        </div>
        {
            expanded && (
                <div className='job-body'>
                    <div className='job-description'>
                        <span className = 'label'>Description: </span>
                        <span className='user-desc-text'>{job.job_desc}</span>
                    </div>
                    <div className='job-requirements'>
                        <span className = 'label'>Allegy: </span>
                        <span className='user-text'>{job.job_characteristics.has_allergy}</span>
                    </div>
                    <div className='job-requirements'>
                        <span className = 'label'>Size: </span>
                        <span className='user-text'>{job.job_characteristics.size}</span>
                    </div>
                    <div className='job-requirements'>
                        <span className = 'label'>Style: </span>
                        <span className='user-text'>{job.job_characteristics.style}</span>
                    </div>
                    <div className='job-requirements'>
                        <span className = 'label'>Body Placement: </span>
                        <span className='user-text'>{job.job_characteristics.body_placement}</span>
                    </div>
                    <div className='job-requirements'>
                        <span className = 'label'>Pain Tolerance: </span>
                        <span className='user-text'>{job.job_characteristics.pain_tolerance}</span>
                    </div>
                    <div className='job-requirements'>
                        <span className = 'label'>Skin Condition: </span>
                        <span className='user-text'>{job.job_characteristics.skin_condition}</span>
                    </div>
                    <div className='job-requirements'>
                        <span className = 'label'>Photos  </span>
                        <span className='user-text'>
                            {
                                job.job_photos.length < 1 ? (
                                    <span>No Photos</span>
                                ) : null
                            }
                        </span>
                    </div>
                    <div className = 'add-photo'>
                        <Space
                            direction="vertical"
                            size="middle"
                            style={{margin: '1rem'}}
                        >
                            <Button 
                                type="primary"
                                onClick={handleAddPhoto}> Add Photo </Button>
                        </Space>
                        {
                            addPhoto && <AddPhotosJob jobId = {job.job_id} />
                        }
                    </div>
                    <div className = 'photo-container'>
                        {
                            job.job_photos.length <= 0 ? (
                                <span className='no-photo'> NO PHOTOS. CLICK ADD PHOTO</span>
                            ) : (
                                job.job_photos.map((image, idx) => (
                                        <img 
                                            key = {idx}
                                            src={image}
                                            className = 'user-image'
                                            alt='Job Image'
                                        />
                                ))
                            )
                        }
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
margin: 1rem;
border-radius: 0.5rem;
border: 3px solid #272a3a;
box-shadow: 0 0 0.5rem #000;
overflow: auto;
padding: 1rem;  // General padding
transition: border 0.3s ease-in-out, transform 0.3s ease-in-out;
cursor: pointer;


.title-text {
    font-size: 0.8rem;
}

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
        text-transform: uppercase;
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

    .job-requirement {
        margin: 10px;
    }

    .photo-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 1rem;
    }

    .user-image {
        width: 100%;
        border-radius: 0.25rem;
        object-fit: cover;
        transition: transform 0.3s ease-in-out;
        &:hover {
            transform: scale(1.05);
            text-align: center;
        }
    }

    .no-photo {
        text-align: center;
        padding: 1rem;
        background-color: #272a3a;
        border-radius: 0.25rem;
    }
    

`