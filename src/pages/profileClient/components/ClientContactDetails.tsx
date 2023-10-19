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
                <span className = 'con-privacy'>
                    {
                        userContactProfile.contact_phone.public ? <MdOutlinePublic /> : <MdPublicOff />
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