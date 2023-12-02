import React, { useEffect, useRef, useState } from 'react'
import { UserJobType, JobBidType} from '../../store/jobs/ts-types/jobTypes'
import styled from 'styled-components'
import { IoClose } from "react-icons/io5";


import MakeBidDrawer from './MakeBidDrawer';
import AddPhotosJob from '../profileClient/views/clientPostedJobs/AddPhotosJob';

//Icons
import { IoLocationSharp } from "react-icons/io5";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdStyle } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { IoBody } from "react-icons/io5";
import { FaBriefcaseMedical } from "react-icons/fa6";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";
import { TbPigMoney } from "react-icons/tb";
import { IoMdPhotos } from "react-icons/io";
import { FaMoneyBillAlt } from "react-icons/fa";







interface Props {
    data: UserJobType,
    setJobOpen: React.Dispatch<React.SetStateAction<boolean>>,
    showButton?: boolean,
    bidSubmitted?: boolean,
    accountType?: string,
    jobBids?: JobBidType[],
    jobHasBid?: boolean,
}

const FullJobModal: React.FC<Props> = ({
    data,
    setJobOpen,
    showButton = true,
    bidSubmitted = false,
    accountType,
    jobBids,
    jobHasBid = false
}) => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
    const [addingPhoto, setAddingPhoto] = useState<boolean>(false)

    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target) && !drawerOpen) {
            setJobOpen(false);
            setAddingPhoto(false)
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [drawerOpen, setJobOpen]);

      const painTolerance = (tolerance: string | number) => {
        switch(tolerance){
          case 'low':
            return (
                <>
                    <BsFillEmojiSunglassesFill size = {'1.4rem'} title = 'LOW pain tolerance' color = 'green' />
                    <span className = 'quick-text'> Low Pain Tolerance </span>
                </>
                )
          case 'moderate':
            return (
                <>
                    <BsFillEmojiSunglassesFill size = {'1.4rem'} title = 'MODERATE pain tolerance' color = 'yellow' />
                    <span className = 'quick-text'> Moderate Pain Tolerance </span>
                </>
            )
          case 'high':
            return (
                <>
                    <BsFillEmojiSunglassesFill size = {'1.4rem'} title = 'HIGH pain tolerance' color = 'red' />
                    <span className = 'quick-text'> High Pain Tolerance </span>
                </>
            )
          default: 
            return
        }
      }

      const determineMedical = (allergy: string | number, skin_condition: string | number): string => {


        if (allergy === 'true' && skin_condition === 'true'){
            return 'Has Allergy and Skin Condition'
        } else if(skin_condition === 'true'){
            return 'Has Skin Condition'
        } else if(allergy === 'true'){
            return 'Has Allergy'
        } else {
            return 'No Medical Conditions'
        }
      }


        

  return (
    <JobModalContainer ref = {ref} className = 'MODAL-CONTAINER'>
            {showButton && (
            <button 
                onClick={() => setJobOpen(false)} 
                className='close-modal-btn'
            >
                <IoClose size={'2rem'}/>
            </button>
        )}
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
                <div className = 'size info-section'>
                    <TbRulerMeasure color = '#ff1421' size =  {'1.5rem'} className = 'icon' />
                    <span className = 'quick-text'> {data.job_characteristics.size} </span>
                </div>
                <div className = 'body-placement info-section'>
                    <IoBody color = '#05abff' size =  {'1.5rem'} className = 'icon' />
                    <span className = 'quick-text'> {data.job_characteristics.body_placement} </span>
                </div>
                {
                    data.job_characteristics.has_allergy === 'true' || data.job_characteristics.skin_condition === 'true' ? (
                        <div className = 'medical info-section'>
                            <FaBriefcaseMedical color = '#05abff' size =  {'1.5rem'} className = 'icon' />
                            <span className = 'quick-text'> {
                                determineMedical(data.job_characteristics.has_allergy, data.job_characteristics.skin_condition)
                            } </span>
                        </div>
                    ) : null
                }
                <div className = 'pain info-section'>
                    {
                        data.job_characteristics.pain_tolerance ? painTolerance(data.job_characteristics.pain_tolerance) : null
                    }
                </div>
                {
                    showButton && !bidSubmitted && accountType === 'artist' && (
                    <div className = 'make-bid info-section'>
                        <TbPigMoney color = 'pink' size =  {'1.5rem'} className = 'icon' />
                        <button onClick = {() => setDrawerOpen(true)} className = 'make-bid-btn quick-text'> Make an Offer </button>
                    </div>
                    )
                }
                {
                    bidSubmitted && (
                        <div className = 'bid-submitted info-section'>
                            <TbPigMoney color = 'pink' size =  {'1.5rem'} className = 'icon' />
                            <span className = 'quick-text'> Bid Submitted </span>
                        </div>
                    )
                }
                {
                    accountType === 'client' && (
                        <div className = 'add-photos info-section'>
                            <IoMdPhotos color = 'pink' size =  {'1.5rem'} className = 'icon' />

                            {
                                addingPhoto ? <AddPhotosJob setAddingPhoto={setAddingPhoto} jobId = {data.job_id} /> : (
                                    <button onClick = {() => setAddingPhoto(true)} className = 'make-bid-btn quick-text'> Add Photos </button>
                                )
                            }
                        </div>
                    )
                }
                {
                    jobHasBid && (
                        <div className = 'bid-count info-section'>
                            <FaMoneyBillAlt color = 'green' size =  {'1.5rem'} className = 'icon' />
                            <span className = 'quick-text'> Job has {jobBids.length} bids! </span>
                        </div>
                    )
                }
            </div>
        </div>
        <ModalBody>
            <div className = 'desc body-section'>
                <p className = 'desc-text'> {data.job_desc}  </p>
            </div>
        </ModalBody>
        <ModalPhotosSection>
            <div className = 'photos body-section'>
                <p className = 'photos-text'> Photos </p>
            </div>
            <div className = 'photos-container'>
                {
                   data.job_photos.length < 1 ? <span className = 'no-image'> No Images Uploaded </span> : data.job_photos.map((photo, index) => {
                        return <img key = {index} src = {photo} alt = 'job' className = 'photo' />
                    })
                }
            </div>
        </ModalPhotosSection>
        <MakeBidDrawer 
            drawerOpen = {drawerOpen} 
            setDrawerOpen = {setDrawerOpen}
            jobData = {data} />
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


    @media (max-width: 1024px) { // For tablets and below
        position: fixed; 
        top: 56%;
        left: 50%;
        right: 0;
        bottom: 0; 
        width: 100vw;
        height: 100vh; // Ensure the modal takes full viewport height
        overflow-y: auto; // Enable scrolling on the y-axis
        z-index: 1000; 
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        justify-content: center; 

        .close-modal-btn {
            position: absolute;
            top: 1rem; // Adjust to the desired space from the top
            right: 1rem; // Adjust to the desired space from the right
            z-index: 1001; // Above the modal backdrop
        }
    }

    .job-modal-header {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 1px solid #f55963;
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: ${pr => pr.theme.font.size.xxl};
        padding: 0 1rem;
    }

    .quick-info-section {
        display: flex;
        width: 100%;
        gap: 2rem;
        flex-wrap: wrap;

        @media (min-width: 601px) and (max-width: 1024px) {
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }

        @media (max-width: 600px) {
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }

    }
    

    .icon {
        margin-bottom: 5px;
    }

    .style {
        text-transform: uppercase;
    }

    .size {
        text-transform: uppercase;
    }

    .body-placement {
        text-transform: uppercase;
    }

    .quick-text {
        font-size: 1.3rem;
    }


    .info-section {
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }

    .make-bid-btn {
        height: auto;
        padding: 0.5rem;
        border: none;
        background-color: #f55963;
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: ${pr => pr.theme.font.size.s};
        color: white;
        cursor: pointer;
        margin-bottom: 5px;
        transition: all 0.2s ease-in-out;

        &:hover {
            background-color: white;
            color: #f55963;
            scale: 1.1;
        }
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

        @media (max-width: 600px) {
            font-size: 1rem;
        }

        @media (min-width: 601px) and (max-width: 1024px) {
            font-size: 1rem;
        }

    }

    .desc {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        padding: 0 1rem;
        margin-bottom: 2rem;
    }


`

const ModalPhotosSection = styled.div`
    max-height: 48%;
    overflow-y: scroll; // Make it scrollable

    .no-image {
        font-size: 1.25rem;
        font-family: ${pr => pr.theme.font.family.secondary};
        padding: 0 1rem;
        margin-bottom: 2rem;
        color: yellow;
    }

    .photos-text {
        font-size: 3rem;
        font-family: ${pr => pr.theme.font.family.secondary};
        padding: 0 1rem;
        margin-bottom: 2rem;

    }

    ::-webkit-scrollbar {
        width: 10px;
    }
    
    ::-webkit-scrollbar-track {
        background-color: #f55963; 
    }
     
    ::-webkit-scrollbar-thumb {
        background: #f55963; 
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #f55963; 
    }

    .photos-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 0 1rem;
        gap: 2rem;

        @media (max-width: 600px) {
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }

        @media (min-width: 601px) and (max-width: 1024px) {
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }
    }

    .photo {
        flex: 0 0 auto;
        margin: 0.5rem;
        width: 100%; /* Make the width responsive */
        max-width: 200px; /* Adjust max-width as per your design */
        height: auto; /* This will maintain the aspect ratio of the photo */
    }
    }
`;