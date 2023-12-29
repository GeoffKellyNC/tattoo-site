import React from 'react'
import ProfileTitles from './components/profileTitle/ProfileTitles'
import ClientUserImages from '../../sections/ClientUserImages'
import AboutMe from './components/aboutMe/AboutMe'
import InfoBox from './components/InfoBox/InfoBox'
import ArtistQuickLinks from './components/artistQuickLinks/ArtistQuickLinks'
import { connect } from 'react-redux'
import { RootState } from '../../../../store/root.reducer'


import { useMobileCheck } from '../../../../hooks/isMobile'

import SideMenu from './components/sideMenu/SideMenu'

interface Props {
  accountType: string
}

const HomeProfile: React.FC<Props> = ({
  accountType
}) => {
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
        {accountType === 'artist' && <ArtistQuickLinks />}
        <ClientUserImages />
      </div>
    </div>
  </div>
  )
}


const mapStateToProps = (st: RootState) => ({
  accountType: st.accountType
})

const ConnectedHomeProfile = connect(mapStateToProps)(HomeProfile)

export default ConnectedHomeProfile 