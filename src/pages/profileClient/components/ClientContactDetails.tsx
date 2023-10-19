import React from 'react'
import { UserContactProfileType } from '../../../store/user/user.reducer'
import styled from 'styled-components'

import { MdOutlinePublic } from 'react-icons/md'
import { MdPublicOff } from 'react-icons/md'

interface ClientContactDetailsProps {
    userContactProfile: UserContactProfileType
}

const ClientContactDetails: React.FC<ClientContactDetailsProps> = ({
    userContactProfile
}) => {
  return (
    <ContactDetails>
        <div className='contact-details-header'>
            <span className='header-text'> Contact Details </span>
        </div>
        <div className = 'contact-details'>
            <div className = 'con-detail'>
                <span className = 'con-label'> Phone: </span>
                <span className = 'con-text'>
                    {
                        userContactProfile.contact_phone.value ? userContactProfile.contact_phone.value : 'No Phone Number Set'
                    }
                </span>
                <span className = 'con-privacy-icon' title = {userContactProfile.contact_phone.public ? 'Public' : 'Not public'}>
                    {
                        userContactProfile.contact_phone.public ? <MdOutlinePublic /> : <MdPublicOff />
                    }
                </span>
            </div>
            <div className = 'con-detail'>
                <span className = 'con-label'> Instagram: </span>
                <span className = 'con-text'>
                    {
                        userContactProfile.contact_instagram.value ? userContactProfile.contact_instagram.value : 'No Instagram Set'
                    }
                </span>
                <span className = 'con-privacy-icon' title = {userContactProfile.contact_instagram.public ? 'Public' : 'Not public'}>
                    {
                        userContactProfile.contact_instagram.public ? <MdOutlinePublic /> : <MdPublicOff />
                    }
                </span>
            </div>
            <div className = 'con-detail'>
                <span className = 'con-label'> Snapchat: </span>
                <span className = 'con-text'>
                    {
                        userContactProfile.contact_snapchat.value ? userContactProfile.contact_snapchat.value : 'No Snapchat Set'
                    }
                </span>
                <span className = 'con-privacy-icon' title = {userContactProfile.contact_snapchat.public ? 'Public' : 'Not public'}>
                    {
                        userContactProfile.contact_snapchat.public ? <MdOutlinePublic /> : <MdPublicOff />
                    }
                </span>
            </div>
            <div className = 'con-detail'>
                <span className = 'con-label'> Discord: </span>
                <span className = 'con-text'>
                    {
                        userContactProfile.contact_discord.value ? userContactProfile.contact_discord.value : 'No Discord Set'
                    }
                </span>
                <span className = 'con-privacy-icon' title = {userContactProfile.contact_discord.public ? 'Public' : 'Not public'}>
                    {
                        userContactProfile.contact_discord.public ? <MdOutlinePublic /> : <MdPublicOff />
                    }
                </span>
            </div>
            <div className = 'con-detail'>
                <span className = 'con-label'> Webiste: </span>
                <span className = 'con-text'>
                    {
                        userContactProfile.contact_website.value ? userContactProfile.contact_website.value : 'No Website Set'
                    }
                </span>
                <span className = 'con-privacy-icon' title = {userContactProfile.contact_website.public ? 'Public' : 'Not public'}>
                    {
                        userContactProfile.contact_website.public ? <MdOutlinePublic /> : <MdPublicOff />
                    }
                </span>
            </div>
        </div>
    </ContactDetails>
  )
}

export default ClientContactDetails



const ContactDetails = styled.div`
    .contact-details-header {
        font-size: 2rem;
        font-weight: 700;
    }
`