import React, { useEffect, useRef, useState, useCallback } from 'react'
import { UserJobType, JobBidType, ArtistAcceptedJobType} from '../../store/jobs/ts-types/jobTypes'
import { UserFullProfile } from '../../store/user/types/userStateTypes'
import { ContactInfo } from '../../store/user/types/userStateTypes'
import styled from 'styled-components'
import { IoClose } from "react-icons/io5";
import { fetchArtistDataAcceptedJob } from '../../api/fetchArtistDataAcceptedJob';
import { getAcceptedBidData } from '../../api/getAcceptedBidData'
import  { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import * as notifyTypes from '../../store/notifications/notify.types'
import { connect } from 'react-redux'
import * as userActions from '../../store/user/user.actions'
import { RootState } from '../../store/root.reducer'


import MakeBidDrawer from '../../pages/artistsJobs/MakeBidDrawer';
import ClientViewBid from '../../pages/artistsJobs/ClientViewBid';
import AddPhotosJob from '../../pages/profileClient/views/clientPostedJobs/AddPhotosJob';

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

import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaSnapchatSquare } from "react-icons/fa";
import { IoLogoDiscord } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";







interface Props {
    data: UserJobType,
    setJobOpen: React.Dispatch<React.SetStateAction<boolean>>,
    showButton?: boolean,
    bidSubmitted?: boolean,
    accountType?: string,
    jobBids?: JobBidType[],
    jobHasBid?: boolean,
    isJobAccepted?: boolean,
    accceptedJobData?: ArtistAcceptedJobType,
    artistContactData?: ContactInfo,
    getFullUserProfileDetails: (unxid: string) => Promise<boolean>,
    clientData: UserFullProfile
}

const FullJobModal: React.FC<Props> = ({
    data,
    setJobOpen,
    showButton = true,
    bidSubmitted = false,
    accountType,
    jobBids,
    jobHasBid = false,
    isJobAccepted = false,
    accceptedJobData = null,
    artistContactData = null,
    getFullUserProfileDetails,
    clientData
}) => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
    const [addingPhoto, setAddingPhoto] = useState<boolean>(false)
    const [bidDrawerOpen, setBidDrawerOpen] = useState<boolean>(false)
    const [artistData, setArtistData] = useState(null)
    const [artistContact, setArtistContact] = useState<ContactInfo>({} as ContactInfo)
    const [acceptedBidData, setAcceptedBidData] = useState<ArtistAcceptedJobType>(null)

    const ref = useRef(null);
    const dispatch = useDispatch()

    const getArtistData = useCallback(async () => {
        if(isJobAccepted && accountType === 'client'){
            const res = await fetchArtistDataAcceptedJob(accceptedJobData.attr1.artist_id)
            const bidData: ArtistAcceptedJobType | boolean = await getAcceptedBidData(data.job_id)
            setAcceptedBidData(bidData)
            if(res){
                setArtistData(res)
                setArtistContact(res.contactInfo[0])
                console.log(artistContact)
            }
        } else {
            return
        
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [ isJobAccepted])

    const getClientData = useCallback(async () => {
        if(isJobAccepted && accountType === 'artist'){
            await getFullUserProfileDetails(data.owner_id)
            const bidData: ArtistAcceptedJobType | boolean = await getAcceptedBidData(data.job_id)
            setAcceptedBidData(bidData)
            return
        }

        return
    } , [isJobAccepted, accountType, getFullUserProfileDetails, data.owner_id, data.job_id])


    useEffect(() => {
        if(isJobAccepted){
            if(accountType === 'client'){
                getArtistData()
                return
            }
            if(accountType === 'artist'){
                getClientData()
                return
            }
            return
        } else {
            return
        }
    }, [accountType, getArtistData, getClientData, isJobAccepted])


    useEffect(() => {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target) && !drawerOpen && !bidDrawerOpen) {
            setJobOpen(false);
            setAddingPhoto(false)
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [bidDrawerOpen, drawerOpen, setJobOpen]);

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

      const checkIfArtistHasPublicContact = (): boolean => {
        for (const [key, value] of Object.entries(artistContactData)) {
          if (key.startsWith('contact_')) {
            if (value.public && value.value) {
              return true;
            }
          }
        }
        return false;
      }
      

      const handleMakeOfferClick = async () => {
           const hasPublicContact: boolean = await checkIfArtistHasPublicContact()
            if(!hasPublicContact){
                dispatch({
                    type: notifyTypes.SET_NOTIFY,
                    payload: {
                        message: 'You must have a public contact method to make an offer',
                        type: 'error'
                    }
                })
                return
            }

            setDrawerOpen(true)
            return
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
                    {!isJobAccepted && <span className = 'quick-text'> ${data.job_budget} </span>}
                    {isJobAccepted && acceptedBidData && <span className = 'quick-text'> ${acceptedBidData.attr1.proposed_price} </span>}
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
                    showButton && !bidSubmitted && accountType === 'artist' && !isJobAccepted && (
                    <div className = 'make-bid info-section'>
                        <TbPigMoney color = 'pink' size =  {'1.5rem'} className = 'icon' />
                        <button onClick = {handleMakeOfferClick} className = 'make-bid-btn quick-text'> Make an Offer </button>
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
                                    <button onClick = {() => setAddingPhoto(true)} className = 'make-bid-btn quick-text job-btn'> Add Photos </button>
                                )
                            }
                        </div>
                    )
                }
                {
                    jobHasBid && accountType === 'client' && (
                        <div className = 'bid-count info-section'>
                            <FaMoneyBillAlt color = 'green' size =  {'1.5rem'} className = 'icon' />
                            <span className = 'quick-text'> Job has {jobBids.length} bids! </span>
                            <button onClick = {() => setBidDrawerOpen(true)} className = 'make-bid-btn quick-text'> View Bids </button>
                        </div>
                    )
                }
            </div>
        </div>
        {
            isJobAccepted && accountType === 'client' && (
                <AcceptedBidContainer>
                    <div className='title-accepted'>
                        <span className = 'accepted-text'> Bid Info </span>
                    </div>
                    <div className = 'bid-data-container'>
                        {
                            artistData ? (
                            <div className = 'bid-data'>
                                <span className = 'data-title'> Artist User Name:  </span>
                                <span className = 'data-text'> {artistData.display_name} (@{artistData.user_name}) </span>
                                <NavLink to = {`/user/artist/${data.selected_artist_id}`} className = 'data-text link-artist'> View Artist Profile </NavLink>
                            </div>
                            ) : <span> Getting Data </span>
                        }
                        <div className = 'bid-data'>
                            <span className='data-title'> Accepted Price: </span> 
                            <span className='data-text'> ${accceptedJobData.attr1.proposed_price} </span>
                        </div>
                        <div className = 'bid-data comment-container'>
                            <span className = 'data-title '> Artists Comments: </span>
                            <span className = 'data-text comment-text'> {accceptedJobData.attr1.artist_comments} </span>
                        </div>
                    </div>
                </AcceptedBidContainer>
            )
        }
        {
            isJobAccepted && accountType === 'artist' && (
                <AcceptedBidContainer>
                    <div className='title-accepted'>
                        <span className = 'accepted-text'> Bid Info </span>
                    </div>
                    <div className = 'bid-data-container'>
                        {
                            clientData ? (
                                <div className = 'bid-data'>
                                    <span className='data-title'> Job owner: </span>
                                    <span className = 'data-text'>{clientData.display_name} (@{clientData.user_name})</span>
                                    <NavLink to = {`/user/view/${data.owner_id}`} className = 'data-text link-artist'> View Client Profile </NavLink>
                                </div>
                            ) : <span> Getting Data... </span>
                        }
                        <div className = 'bid-data'>
                            <span className = 'data-title'>Accepted Price: </span>
                            
                            {
                                acceptedBidData ? (
                                    <span className = 'data-text'> ${acceptedBidData.attr1.proposed_price} </span>
                                ) : <span> Getting Data... </span>
                            }
                        </div>
                        <div className = 'contact-data'>
                            {
                                Object.keys(clientData).length > 1 ? (
                                    <>
                                    <span className = 'contact-title'> {clientData.display_name}'s contact: </span>
                                    <div className = 'contact-container'>
                                         {
                                            clientData.contact_phone.public && (
                                                <div className = 'contact-info'>
                                                    <MdOutlinePhoneAndroid className = 'icon phone-icon'/>
                                                    <span className = 'contact-text'>{clientData.contact_phone.value}</span>
                                                </div>
                                            )
                                         }
                                         {
                                            clientData.contact_discord.public && (
                                                <div className = 'contact-info'>
                                                    <IoLogoDiscord className = 'icon discord-icon'/>
                                                    <span className = 'contact-text'>{clientData.contact_discord.value}</span>
                                                </div>
                                            )
                                         }
                                         {
                                            clientData.contact_instagram.public && (
                                                <div className = 'contact-info'>
                                                    <RiInstagramFill className = 'icon instagram-icon'/>
                                                    <span className = 'contact-text'>{clientData.contact_instagram.value}</span>
                                                </div>
                                            )
                                         }
                                         {
                                            clientData.contact_snapchat.public && (
                                                <div className = 'contact-info '>
                                                    <FaSnapchatSquare className = 'icon snapchat-icon'/>
                                                    <span className = 'contact-text'>{clientData.contact_snapchat.value}</span>
                                                </div>
                                            )
                                         }
                                         {
                                            clientData.contact_x.public && (
                                                <div className = 'contact-info '>
                                                    <FaSquareXTwitter className = 'icon twitter-icon'/>
                                                    <span className = 'contact-text'>{clientData.contact_x.value}</span>
                                                </div>
                                            )
                                         }
                                    </div>
                                    </>

                                ) : <span> Getting Contact Data... </span>
                            }
                        </div>
                    </div>
                </AcceptedBidContainer>
            )
        }
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
       { accountType === 'client' && <ClientViewBid
            bidDrwaerOpen = {bidDrawerOpen}
            setBidDrwaerOpen = {setBidDrawerOpen}
            jobBids = {jobBids}
            jobData={data} />}
    </JobModalContainer>
  )
}

const mapStateToProps = (st: RootState) => ({
    clientData: st.viewUserDetails
})

const ConnectedFullJobModal = connect(mapStateToProps, {
    getFullUserProfileDetails: userActions.getFullUserProfileDetails
})(FullJobModal)

export default ConnectedFullJobModal


const JobModalContainer = styled.div`
    min-width: 75%;
    max-height: 75vh; // Set a maximum height
    overflow-y: auto; // Enable vertical scrolling within the modal
    position: fixed; // Use fixed to keep the modal in place
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    color: white;
    background: rgba(2, 0, 10, 0.8);
    box-shadow: 0 8px 32px 0 rgba(31, 10, 31, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding-bottom: 20px; // Add padding to avoid content being cut off


    @media (max-width: 1024px) { // For tablets and below
        width: 100vw;
        height: 100vh;
        max-height: none; // Remove max-height for full screen view
        top: 2rem;
        left: 0;
        transform: none;

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
        font-size: 1rem;
        margin: 15px 0;
        background: ${pr => pr.theme.color.pink};
        border: none;
        border-radius: 5px;
        colro: white;
        font-family: ${pr => pr.theme.font.family.secondary};
        padding: 0.2rem;
        cursor: pointer;

        &:hover {
            background: #f55963;
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
            overflow-y: scroll;
        }

        @media (min-width: 601px) and (max-width: 1024px) {
            justify-content: center;
            flex-direction: column;
            align-items: center;
            overflow-y: scroll;
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


const AcceptedBidContainer = styled.div`

    border-bottom: 1px solid #f55963;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 2rem;


    .title-accepted {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        padding: 0 1rem;
        margin-bottom: 2rem;
    }

    .accepted-text {
        font-size: 3rem;
        font-family: ${pr => pr.theme.font.family.secondary};
        padding: 0 1rem;
    }


    .bid-data-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 0 1rem;
        gap: 1rem;
    }

    .bid-data {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
    }

    .data-title {
        font-size: 1.5rem;
        font-family: ${pr => pr.theme.font.family.secondary};
        color: #f55963;
    }

    .comment-container {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .comment-text {
        font-size: 1.25rem;
        font-family: ${pr => pr.theme.font.family.secondary};
    }

    .data-text {
        font-size: 1.25rem;
        font-family: ${pr => pr.theme.font.family.secondary};
    }

    .link-artist {
        font-size: 1.25rem;
        font-family: ${pr => pr.theme.font.family.secondary};
        color: #f55963;
        text-decoration: underline;
    }

    .contact-data {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1rem;
    }

    .contact-title {
        font-size: 1.5rem;
        font-family: ${pr => pr.theme.font.family.secondary};
        color: #f55963;
    }

    .contact-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
    }

    .contact-info {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
    }

    .contact-text {
        font-size: 1.25rem;
        font-family: ${pr => pr.theme.font.family.secondary};
    }

    .icon {
        margin-bottom: 5px;
    }

    .phone-icon {
        color: #05abff;
    }

    .discord-icon {
        color: #7289da;
    }

    .instagram-icon {
        color: #e1306c;
    }

    .snapchat-icon {
        color: #fffc00;
    }

    .twitter-icon {
        color: #1da1f2;
    }



    



`