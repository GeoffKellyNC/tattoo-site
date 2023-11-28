import React, { useEffect, useRef } from 'react'
import { UserJobType } from '../../store/jobs/ts-types/jobTypes'
import styled from 'styled-components'

interface Props {
    data: UserJobType,
    setJobOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FullJobModal: React.FC<Props> = ({
    data,
    setJobOpen
}) => {

    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            setJobOpen(false);
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [setJobOpen]);


        

  return (
    <JobModalContainer ref = {ref}>
        <div className = 'job-modal-header'>
            <span className = 'job-owner'>{data.owner_user_name}</span>
            <span className = 'job-title'>{data.job_title}</span>
        </div>
    </JobModalContainer>
  )
}

export default FullJobModal


const JobModalContainer = styled.div`
    width: 75%;
    height: 75%;
    position: fixed; // Changed from absolute to fixed
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); // Added transform property
    z-index: 100;
    color: white;
    background: rgba( 245, 89, 63, 0.4 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
`