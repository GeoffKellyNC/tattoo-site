import React, { useState } from 'react'
import { UserData } from '../../../../store/user/user.reducer'
import styled from 'styled-components'
import { format } from 'date-fns'

//COMPONENTS
import EditGeneralDrawer from './forms/EditGeneralDrawer';

//ICONS
import { IoPersonSharp } from "react-icons/io5";
import { LiaUserNinjaSolid } from "react-icons/lia";
import { CgWebsite } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";











interface Props {
    userData: UserData
}

const UserDataSettings: React.FC<Props> = ({
    userData
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)


  return (
    <>
      <Header>
        <h2 className = 'header-text'> GENERAL </h2>
        <CiEdit size = {'2rem'} className = 'edit-icon' onClick = {() => setIsOpen(true)}/>
      </Header>
      <UserDataContainer>
          <div className = 'info-container name-container'>
            <IoPersonSharp className = 'icon name-icon'/>
            <span className = 'info-label'> Name: </span>
            <span className = 'user-text'>{userData.first_name} {userData.last_name}</span>
          </div>
          <div className = 'info-container username-container'>
            <LiaUserNinjaSolid className = 'icon username-icon'/>
            <span className = 'info-label'> User Name: </span>
            <span className = 'user-text'>{userData.user_name}</span>
          </div>
          <div className = 'info-container displayname-container'>
            <CgWebsite className = 'icon displayname-icon'/>
            <span className = 'info-label'> Display Name: </span>
            <span className = 'user-text'>{userData.display_name}</span>
          </div>
          <div className = 'info-container email-container'>
            <MdEmail className = 'icon email-icon'/>
            <span className = 'info-label'> Email: </span>
            <span className = 'user-text'>{userData.user_email}</span>
          </div>
          <div className = 'info-container created-container'>
            <CiCalendarDate className = 'icon created-icon'/>
            <span className = 'info-label'> Member Since: </span>
            <span className = 'user-text'>{ format(new Date(userData.created_date), 'MMMM yyyy')}</span>
          </div>
          <div className = 'info-container custid-container'>
            <MdOutlineAdminPanelSettings className = 'icon custid-icon'/>
            <span className = 'info-label'> Client Id: </span>
            <span className = 'user-text cust-id-text'>{userData.unxid}</span>
          </div>
      </UserDataContainer>
      {
        isOpen && (
          <EditGeneralDrawer 
            userData = {userData}
            isOpen = {isOpen}
            setIsOpen = {setIsOpen}
          />
        )
      }
    </>
  )
}

export default UserDataSettings


const Header = styled.div`
  font-size: 2.4rem;
  font-family: ${pr => pr.theme.font.family.secondary};
  font-weight: 200;
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 6rem;
  margin-top: 5rem;

  .header-text {
    margin-left: 1.2rem;
  }

  .edit-icon {
    margin-top: 2.2rem;
    cursor: pointer;
    color: ${pr => pr.theme.color.white};
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${pr => pr.theme.color.red};
    }
  }

  @media (max-width: 600px) {
    font-size: 1.8rem; /* Adjust header font size for mobile */

    .edit-icon {
      margin-top: 1.2rem;
      font-size: 1.5rem; /* Adjust icon size for mobile */
    }
  }
`;

const UserDataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  margin: 3rem 1.2rem;

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

    @media (max-width: 600px) {
      font-size: 1.2rem; /* Adjust font size for mobile */
      gap: 0.5rem; /* Reduce gap between icon and text */
    }
  }

  .icon {
    font-size: 1.8rem;
    color: #ffe600;

    @media (max-width: 600px) {
      font-size: 1.4rem; /* Adjust icon size for mobile */
    }
  }

  .info-label {
    font-size: 1.8rem;
    font-weight: 600;
    color: #f1637b;
    text-transform: uppercase;

    @media (max-width: 600px) {
      font-size: 1.4rem; /* Adjust label font size for mobile */
    }
  }

  .user-text {
    font-size: 1.8rem;
    font-weight: 400;

    @media (max-width: 600px) {
      font-size: 1.4rem; /* Adjust text font size for mobile */
    }
  }

  .cust-id-text {
    text-transform: uppercase;
  }
`;

