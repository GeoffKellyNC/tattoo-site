import React from 'react'
import styled from 'styled-components'
import { RootState } from '../../../../store/root.reducer'
import { connect } from 'react-redux'
import { ContactInfo, ProfileImageType } from '../../../../store/user/types/userStateTypes'
import { UserData } from '../../../../store/user/user.reducer'

import UserDataSettings from './UserDataSettings'
import ContactDataSettings from './ContactDataSettings'


interface Props {
    userData: UserData;
    userContactProfile: ContactInfo;
    profileImages: ProfileImageType

}

const UserSettings: React.FC<Props> = ({
    userData,
    userContactProfile,
}) => {
  return (
    <StyledUserSettings>
        <Header>
            <h2 className = 'header-text'> SETTING </h2>
        </Header>
        <UserDataSettings userData={ userData } />
        <ContactDataSettings contactData={userContactProfile} />
    </StyledUserSettings>
  )
}

const mapStateToProps = ((st: RootState) => ({
    userData: st.userData,
    userContactProfile: st.userContactProfile,
    profileImages: st.profileImages
}))


const ConnectedUserSettings = connect(mapStateToProps, null)(UserSettings)

export default ConnectedUserSettings


const Header = styled.div`
    .header-text {
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: 6rem;
        margin: 0 1.2rem;
        letter-spacing: 8px;
`

const StyledUserSettings = styled.div`


`