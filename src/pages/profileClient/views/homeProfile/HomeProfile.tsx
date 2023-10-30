import React from 'react'
import ProfileTitles from './components/profileTitle/ProfileTitles'
import ClientUserImages from '../../sections/ClientUserImages'
import AboutMe from './components/aboutMe/AboutMe'
import InfoBox from './components/InfoBox/InfoBox'
import MessageBox from './components/messageBox/MessageBox'
import NotificationsBox from './components/notificationBox/NotificationsBox'

const HomeProfile: React.FC = () => {
  return (
    <div className = 'main-container'>
    <ProfileTitles />
    <div className = 'data-container timeline'> 
      <div className = 'data-left'>
        <InfoBox />
        <AboutMe />
      </div>
      <div className = 'data-right'>
        <MessageBox />
        <ClientUserImages />
      </div>
      <NotificationsBox />
    </div>
  </div>
  )
}

export default HomeProfile