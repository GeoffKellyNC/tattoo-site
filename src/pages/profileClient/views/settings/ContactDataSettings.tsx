import React, { useState } from 'react'
import { ContactInfo } from '../../../../store/user/types/userStateTypes'
import styled from 'styled-components'

import EditContactDataDrawer from './forms/EditContactDataDrawer';

import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaSnapchatSquare } from "react-icons/fa";
import { IoLogoDiscord } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";






interface Props {
    contactData: ContactInfo;
}

const ContactDataSettings: React.FC<Props> = ({
    contactData
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
        <Header className = 'header-container'>
            <h2 className = 'header-text'> CONTACT </h2>
            <CiEdit size = {'2rem'} className = 'edit-icon' onClick = {() => setIsOpen(true)} />
        </Header>
        <ContactDataContainer>
        { Object.keys(contactData).length > 1 ?   (
            <>
            <div className = 'info-container phone-container'>
                <MdOutlinePhoneAndroid className = 'icon phone-icon' />
                <span className = 'user-text'>
                    {contactData.contact_phone.value ? contactData.contact_phone.value : 'No Phone'}  
                </span>
                <span className = 'user-text'>
                    ({contactData.contact_phone.public ? 'Public' : 'Not Public'})
                </span>
            </div>
            <div className = 'info-container snapchat-container'>
                <FaSnapchatSquare className = 'icon snapchat-icon' />
                <span className = 'user-text'>
                    {contactData.contact_snapchat.value ? contactData.contact_snapchat.value : 'No Snap'}  
                </span>
                <span className = 'user-text'>
                    ({contactData.contact_snapchat.public ? 'Public' : 'Not Public'})
                </span>
            </div>
            <div className = 'info-container discord-container'>
                <IoLogoDiscord className = 'icon discord-icon' />
                <span className = 'user-text'>
                    {contactData.contact_discord.value ? contactData.contact_discord.value : 'No Discord'}  
                </span>
                <span className = 'user-text'>
                    ({contactData.contact_snapchat.public ? 'Public' : 'Not Public'})
                </span>
            </div>
            <div className = 'info-container x-container'>
                <FaSquareXTwitter className = 'icon x-icon' />
                <span className = 'user-text'>
                    {contactData.contact_x.value ? contactData.contact_x.value : 'No Account'}  
                </span>
                <span className = 'user-text'>
                    ({contactData.contact_x.public ? 'Public' : 'Not Public'})
                </span>
            </div>
            <div className = 'info-container instagram-container'>
                <RiInstagramFill className = 'icon instagram-icon' />
                <span className = 'user-text'>
                    {contactData.contact_instagram.value ? contactData.contact_instagram.value : 'No Account'}  
                </span>
                <span className = 'user-text'>
                    ({contactData.contact_instagram.public ? 'Public' : 'Not Public'})
                </span>
            </div>
            </>) : <span className = 'loading-text'> Loding Data </span>}
        </ContactDataContainer>
        <EditContactDataDrawer
            contactData = {contactData}
            isOpen = {isOpen}
            setIsOpen = {setIsOpen}
        />
    </>
  )
}

export default ContactDataSettings

const Header = styled.div`
  font-size: 2.4rem;
  font-family: ${pr => pr.theme.font.family.secondary};
  font-weight: 200;
  margin: 0 1.2rem;
  display: flex;
  gap: 1rem;

  .edit-icon {
    margin-top: 4.7rem;
    cursor: pointer;
    color: ${pr => pr.theme.color.white};
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${pr => pr.theme.color.red};
    }
  }

`

const ContactDataContainer = styled.div`
    display: flex;
    margin: 3rem 1.2rem;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: center;


    .info-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.6rem;
    font-family: ${pr => pr.theme.font.family.secondary};
    font-weight: 400;
    color: ${pr => pr.theme.color.white};
    letter-spacing: 2px;
    margin: 0;
    }

    .icon {
    font-size: 1.8rem;
    }

    .info-label {
    font-size: 1.8rem;
    font-weight: 600;
    color: #f1637b;
    text-transform: uppercase;

    }

    .user-text {
    font-size: 1.8rem;
    font-weight: 400;
    }

    .discord-icon {
        color: #7289da;
    }

    .x-icon {
        color: #1da1f2;
    }

    .instagram-icon {
        color: #c13584;
    }

    .snapchat-icon {
        color: #fffc00;
    }

    .phone-icon {
        color: #00ff00;
    }

`