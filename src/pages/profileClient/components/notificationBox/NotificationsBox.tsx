import React from 'react'
import styled from 'styled-components'

const NotificationsBox: React.FC = () => {
  return (
    <NotificationsBoxStyled>
      <div className = 'notification-title'>
        <span>Notifications</span>
      </div>
      <div className = 'notification-container'>
        <span className = 'no-notify'> No Notifications.... </span>
      </div>
    </NotificationsBoxStyled>
  )
}

export default NotificationsBox

const NotificationsBoxStyled = styled.div`
    width: 280px;
    flex-shrink: 0;
    margin-left: auto;
    overflow: auto;
    background-color: #151728;
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    .notification-title {
      font-family: "DM Sans", sans-serif;
      color: #5c5e6e;
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 20px;
      padding: 20px;
      border-bottom: 1px solid #272a3a;
    }

    .no-notify {
      font-family: "DM Sans", sans-serif;
      color: ${(pr) => pr.theme.color.white};
      font-size: 10px;
      font-weight: 600;
      margin-bottom: 20px;
      padding: 20px;
    }


    @media (max-width: ${(pr) => pr.theme.media.tablet}) {
      display: none;
    }

`