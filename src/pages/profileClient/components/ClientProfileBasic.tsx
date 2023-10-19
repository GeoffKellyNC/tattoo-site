import React from 'react'
import { UserData } from '../../../store/user/user.reducer'
import styled from 'styled-components'


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
  return (
    <ClientProfileBasicStyled>
        <div className = 'profile-header'>
            <img className='profile-image' src={profImage ? profImage.image_url : 'https://picsum.photos/200'} alt="User Profile" />   
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

    .profile-image {
        width: 10rem;
        height: 10rem;
        overflow: hidden;
        border-radius: 50%;
        margin: 1rem;
      }


`