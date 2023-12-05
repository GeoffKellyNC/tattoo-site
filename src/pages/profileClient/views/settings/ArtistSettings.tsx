import React from 'react'
import styled from 'styled-components'
import { RootState } from '../../../../store/root.reducer'
import { connect } from 'react-redux'
import { ArtistsUserType, ContactInfo, ProfileImageType } from '../../../../store/user/types/userStateTypes'
import { UserData } from '../../../../store/user/user.reducer'

import UserDataSettings from './UserDataSettings'
import ArtistDataSettings from './ArtistDataSettings'
import ContactDataSettings from './ContactDataSettings'

interface Props {
    userData: UserData;
    artistDetails: ArtistsUserType;
    userContactProfile: ContactInfo;
    profileImages: ProfileImageType

}



const ArtistSettings: React.FC<Props> = ({
    userData,
    artistDetails,
    userContactProfile,
}) => {
  console.log('UserData: ', userData)

  return (
    <StyledArtistSettings>
        <Header>
            <h2 className = 'header-text'> SETTINGS </h2>
        </Header>
        <UserDataSettings userData = { userData } />
        <ArtistDataSettings artistDetails = {artistDetails} />
        <ContactDataSettings contactData = {userContactProfile} />
    </StyledArtistSettings>
  )
}

const mapStateToProps = ((st: RootState) => ({
    userData: st.userData,
    artistDetails: st.artistDetails,
    userContactProfile: st.userContactProfile,
    profileImages: st.profileImages
}))

const ConnectedArtistSettings = connect(mapStateToProps, null)(ArtistSettings)

export default ConnectedArtistSettings



const StyledArtistSettings = styled.div`


`


const Header = styled.div`
    .header-text {
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: 6rem;
        margin: 0 1.2rem;
        letter-spacing: 8px;
    }

`