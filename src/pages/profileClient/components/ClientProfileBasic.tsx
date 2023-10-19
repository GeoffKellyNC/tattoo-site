import React from 'react'
import { UserData } from '../../../store/user/user.reducer'
import styled from 'styled-components'

import UploadProfileImg from './UploadProfileImg'

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

const ClientProfileBasic: React.FC<ClientProfileBasicProps> = ({ data, profImage }) => {
  return (
    <ClientProfileBasicStyled>
            <img className='profile-image' src={profImage ? profImage.image_url : 'https://picsum.photos/200'} alt="User Profile" />
        <div className = 'profile-header'>
            <div className = 'user-name'>
                <span className = 'label-text'> User Name: </span>
                <span className = 'user-text'> {data.user_name} </span>
            </div>
            <div className = 'display-name'>
                <span className = 'label-text'> Display Name: </span>
                <span className = 'user-text'> {data.display_name} </span>
            </div>
            <div className = 'email'>
                <span className = 'label-text'> Email: </span>
                <span className = 'user-text'> {data.user_email} </span>
            </div>
            <div className = 'account-type'>
                <span className = 'user-text client-text'> {data.account_type} </span>
            </div>
            <div className = 'upload-image'>
                <UploadProfileImg />
            </div>
        </div>

    </ClientProfileBasicStyled>
  )
}

export default ClientProfileBasic


const ClientProfileBasicStyled = styled.div`
    display: flex;
    font-family: ${pr => pr.theme.font.family.primary};
    flex-direction: column;
    align-items: center;


    .profile-header {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-evenly;
        align-items: center;
    }

    .label-text {
        font-size: 1.2rem;
        color: ${pr => pr.theme.color.pink};
    }

    .client-text {
        font-size: 1.5rem;
        color: ${pr => pr.theme.color.yellow};
        text-transform: uppercase;
    }


    .profile-image {
        width: 10rem;
        height: 10rem;
        overflow: hidden;
        border-radius: 50%;
        margin: 1rem;
      }


`