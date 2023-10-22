import React, { useState } from 'react'
import { UserData } from '../../../store/user/user.reducer'
import styled from 'styled-components'

import UploadProfileImg from './UploadProfileImg'
import { LiaEditSolid } from 'react-icons/lia'


interface ProfileImageObj {
    user_unxid: string,
    user_name: string,
    image_id: string,
    image_url: string,
    image_upload_date: string,
    is_active: boolean,
    is_deleted: boolean,
    deleted_date: string,
    deleted_by: string
}

interface ClientProfileBasicProps {
    data: UserData,
    profImage: ProfileImageObj
    }

const ClientProfileBasic: React.FC<ClientProfileBasicProps> = ({ profImage }) => {
    const [wantsEdit, setWantsEdit] = useState<boolean>(false)

    const handleWantsEdit = () => {
        setWantsEdit(!wantsEdit)
    }

  return (
    <ClientProfileBasicStyled>
        <div className = 'profile-header'>
            <img className='profile-image' src={profImage ? profImage.image_url : 'https://picsum.photos/200'} alt="User Profile" />   
            <LiaEditSolid 
            onClick={handleWantsEdit}
            style={{
                fontSize: '3rem', 
                color: 'black', 
                cursor: 'pointer'
            }}
        />
        </div>

        {
            wantsEdit && <UploadProfileImg />
        }
    </ClientProfileBasicStyled>
  )
}

export default ClientProfileBasic


const ClientProfileBasicStyled = styled.div`
    display: flex;
    font-family: ${pr => pr.theme.font.family.primary};
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;

    .profile-header {
        position: relative;
        width: 10rem;
        height: 10rem;
        overflow: hidden;
        border-radius: 50%;
        margin: 1rem;
        background-color: ${pr => pr.theme.color.white};  // Background for the profile pic placeholder
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);  // Light shadow to give depth
    }

    .profile-image {
        display: block;
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    svg {
        position: absolute;
        bottom: 10px;
        right: 10px;
        border-radius: 50%;
        padding: 5px;
        background-color: ${pr => pr.theme.color.white};  // Background to enhance icon visibility
        transition: background-color 0.2s, transform 0.2s;

        &:hover {
            background-color: ${pr => pr.theme.color.primary};  // Changing to primary color on hover
            transform: scale(1.05);  // Slightly enlarging on hover for effect
        }
    }
`;



