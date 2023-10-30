import React from 'react'
import { UserContactProfileType } from '../../../../../store/user/user.reducer'
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
  color: ${(pr) => pr.theme.color.white};
  font-family: ${(pr) => pr.theme.font.family.primary};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.15);

  .contact-details-header {
    border-bottom: 2px solid ${(pr) => pr.theme.color.primary};
    padding-bottom: 10px;
    margin-bottom: 20px;
  }

  .header-text {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .con-label {
    color: ${(pr) => pr.theme.color.text_black};
    font-size: 0.9rem;
    margin-right: 10px;
  }

  .con-text {
    font-size: 1rem;
    font-weight: 500;
  }

  .con-privacy-icon {
    margin-left: 10px;
    vertical-align: middle;
    color: ${(pr) => pr.theme.color.secondary};
    cursor: pointer;
  }

  .contact-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: center;

    @media (max-width: ${(pr) => pr.theme.media.phone}) {
      grid-template-columns: 1fr;
    }
  }

  .con-detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

