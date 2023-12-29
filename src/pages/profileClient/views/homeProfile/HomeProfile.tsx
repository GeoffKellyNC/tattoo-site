import React, { useEffect } from 'react'
import ProfileTitles from './components/profileTitle/ProfileTitles'
import ClientUserImages from '../../sections/ClientUserImages'
import AboutMe from './components/aboutMe/AboutMe'
import InfoBox from './components/InfoBox/InfoBox'
import ArtistQuickLinks from './components/artistQuickLinks/ArtistQuickLinks'
import { connect, useDispatch } from 'react-redux'
import { RootState } from '../../../../store/root.reducer'
import { UserFullProfile } from '../../../../store/user/types/userStateTypes'
import * as notifyTypes from '../../../../store/notifications/notify.types'


import { useMobileCheck } from '../../../../hooks/isMobile'

import SideMenu from './components/sideMenu/SideMenu'

interface Props {
  accountType: string,
  userProfileDetails: UserFullProfile,
  userCurrentCords: {
    lat: number,
    lng: number
  }
}

const HomeProfile: React.FC<Props> = ({
  accountType,
  userProfileDetails,
  userCurrentCords
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if(!userProfileDetails.location_city || userProfileDetails.location_city.length < 1){
      dispatch({
        type: notifyTypes.SET_NOTIFY,
        payload: {
          type: 'warning',
          message: 'No Location Set! Please set your location in the Intro Section to show up in search results.'
        }
      })
    }

    if(!userCurrentCords || Object.keys(userCurrentCords).length < 1){
      dispatch({
        type: notifyTypes.SET_NOTIFY,
        payload: {
          type: 'warning',
          message: 'Please Enable Location Services to use all features!'
        }
      })
    }
  }, [])


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
  accountType: st.accountType,
  userProfileDetails: st.userProfileDetails,
  userCurrentCords: st.userCurrentCords
})

const ConnectedHomeProfile = connect(mapStateToProps)(HomeProfile)

export default ConnectedHomeProfile 