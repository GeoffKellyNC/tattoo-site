import React from 'react'
import { UserData } from '../../../../store/user/user.reducer'
import styled from 'styled-components'
import { format } from 'date-fns'

import { IoPersonSharp } from "react-icons/io5";
import { LiaUserNinjaSolid } from "react-icons/lia";
import { CgWebsite } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";







interface Props {
    userData: UserData
}

const UserDataSettings: React.FC<Props> = ({
    userData
}) => {
  return (
    <>
      <Header className = 'header-container'>
        <h2 className = 'header-text'> GENERAL </h2>
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
    </>
  )
}

export default UserDataSettings

const Header = styled.div`
  font-size: 2.4rem;
  font-family: ${pr => pr.theme.font.family.secondary};
  font-weight: 200;
  margin: 0 1.2rem;

`


const UserDataContainer = styled.div`
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
    color: #ffe600;
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

  .cust-id-text {
    text-transform: uppercase;
  }




`