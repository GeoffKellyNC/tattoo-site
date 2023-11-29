import React, { useEffect, useRef } from 'react'
import { UserJobType } from '../../store/jobs/ts-types/jobTypes'
import styled from 'styled-components'

//Icons
import { IoLocationSharp } from "react-icons/io5";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdStyle } from "react-icons/md";



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
            <span className = 'job-title'>{data.job_title}</span>
            <div className = 'quick-info-section'>
                <div className = 'location info-section'>
                    <IoLocationSharp color = '#ff54e2'  size = {'1.5rem'} className = 'icon' />
                    <span className = 'quick-text'> {data.job_location}, {data.job_zipcode} </span>
                </div>
                <div className = 'budget info-section'>
                    <GiTakeMyMoney color = '#3aff6b' size =  {'1.5rem'} className = 'icon' />
                    <span className = 'quick-text'> ${data.job_budget} </span>
                </div>
                <div className = 'style info-section'>
                    <MdStyle color = '#ff8d14' size =  {'1.5rem'} className = 'icon' />
                    <span className = 'quick-text'> {data.job_characteristics.style} </span>
                </div>
            </div>
        </div>
        <ModalBody>
            <div className = 'desc body-section'>
                <p className = 'desc-text'> {data.job_desc}  </p>
            </div>
        </ModalBody>
    </JobModalContainer>
  )
}

export default FullJobModal


const JobModalContainer = styled.div`
    min-width: 75%;
    height: 75%;
    position: fixed; // Changed from absolute to fixed
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); // Added transform property
    z-index: 100;
    color: white;
    background: rgba( 2, 0, 10, 0.8 );
    box-shadow: 0 8px 32px 0 rgba( 31, 10, 31, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );

    .job-modal-header {
        width: 100%;
        height: 20%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 1px solid #f55963;
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: ${pr => pr.theme.font.size.xxl};
        padding: 0 1rem;
    }

    .quick-info-section{
        display: flex;
        width: 100%;
        gap: 5rem;
        
    }

    .icon {
        margin-bottom: 5px;
    }

    .quick-text {
        font-size: 1.5rem;
    }

    .info-section {
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }
`

const ModalBody = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-bottom: 1px solid #f55963;

    .desc-text {
        font-size: 1.25rem;
        font-family: ${pr => pr.theme.font.family.secondary};
    }

    .desc {
        width: 80%;
        padding: 0 1rem;
        margin-bottom: 2rem;
    }

`