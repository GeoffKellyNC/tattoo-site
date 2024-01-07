import React from 'react'
import { ContactInfo } from '../../store/user/types/userStateTypes'
import styled from 'styled-components'
import { useMobileCheck } from '../../hooks/isMobile';


import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaSnapchatSquare } from "react-icons/fa";
import { IoLogoDiscord } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

interface Props {
    data: ContactInfo
}

const ContactDataProfile: React.FC<Props> = ({
    data
}) => {

    const isMobile = useMobileCheck()

  return (
    <ContactData>
        <div className = 'data-container'>
            {
                data.contact_discord.public && (
                    <div className = 'contact-info'>
                        <IoLogoDiscord className = 'icon discord-icon'/>
                        {!isMobile && <span className = 'contact-text'>{data.contact_discord.value}</span>}
                    </div>
                )
            }
                    {
                data.contact_instagram.public && (
                    <div className = 'contact-info'>
                        <RiInstagramFill className = 'icon instagram-icon'/>
                        {!isMobile && <span className = 'contact-text'>{data.contact_instagram.value}</span>}
                    </div>
                )
            }
            {
                data.contact_snapchat.public && (
                    <div className = 'contact-info '>
                        <FaSnapchatSquare className = 'icon snapchat-icon'/>
                        {!isMobile && <span className = 'contact-text'>{data.contact_snapchat.value}</span>}
                    </div>
                )
            }
            {
                data.contact_x.public && (
                    <div className = 'contact-info '>
                        <FaSquareXTwitter className = 'icon twitter-icon'/>
                        {!isMobile && <span className = 'contact-text'>{data.contact_x.value}</span>}
                    </div>
                )
            }
            {
                data.contact_phone.public && (
                    <div className = 'contact-info '>
                        <MdOutlinePhoneAndroid className = 'icon phone-icon'/>
                        {!isMobile && <span className = 'contact-text'>{data.contact_phone.value}</span>}
                    </div>
                )
            }
        </div>
    </ContactData>
  )
}

export default ContactDataProfile


const ContactData = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 2rem;

    .title-container {
        padding: 2rem;
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: 4rem;
    }


    .data-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .contact-info {
        display: flex;
        align-items: center;
    }
    
    .contact-text {
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: 1.3rem;
        text-transform: uppercase;
    }
    
    .icon {
        font-size: 1.5rem;
        margin-right: 0.5rem;


        @media (max-width: ${pr => pr.theme.media.tablet}) {
            font-size: 2rem;
        }
    }

    .contact-text {
        font-size: 1.5rem;
    }

    .discord-icon {
        color: #7289da;
    }

    .instagram-icon {
        color: #c13584;
    }

    .snapchat-icon {
        color: #fffc00;
    }

    .twitter-icon {
        color: #1da1f2;
    }

    .phone-icon {
        color: #00bfa5;
    }



`