import React from 'react'
import ProfileTitles from './components/profileTitle/ProfileTitles'
import ClientUserImages from '../../sections/ClientUserImages'
import AboutMe from './components/aboutMe/AboutMe'
import InfoBox from './components/InfoBox/InfoBox'
import NotificationsBox from './components/notificationBox/NotificationsBox'
import { useMobileCheck } from '../../../../hooks/isMobile'

import SideMenu from './components/sideMenu/SideMenu'

const HomeProfile: React.FC = () => {
  const isMobile = useMobileCheck()
  return (
    <div className = 'main-container'>
    <ProfileTitles />
    {isMobile && <SideMenu />}
    <div className = 'data-container timeline'> 
      <div className = 'data-left'>
        <InfoBox />
        <AboutMe />
      </div>
      <div className = 'data-right'>
        <ClientUserImages />
      </div>
      <NotificationsBox />
    </div>
  </div>
  )
}

export default HomeProfile 