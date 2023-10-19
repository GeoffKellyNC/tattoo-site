/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store/root.reducer'
import styled from 'styled-components'
import * as userActions from '../../store/user/user.actions'

import ClientProfileBasic from './components/ClientProfileBasic'
import ClientProfileDetails from './components/ClientProfileDetails'

interface UserProfileProps {
    userData: RootState['userData'],
    profileImages: RootState['profileImages'],
    verifyUserAccess: () => Promise<boolean>,
    logoutUser: () => Promise<void>,
}

const UserProfileClient: React.FC<UserProfileProps> = ({
    userData,
    verifyUserAccess,
    logoutUser,
    profileImages
}) => {


    useEffect(() => {
        verifyUserAccess()
        
    }
    ,[ verifyUserAccess])

    const handleLogout = () => {
        logoutUser()
    }

  return (
    <UserProfileStyled>
        <button onClick={handleLogout}> Logout </button>
        <ClientProfileBasic data={userData} profImage = {profileImages} />
        <ClientProfileDetails />
    </UserProfileStyled>
  )
}

export default connect((st: RootState ) => ({
    userData: st.userData,
    profileImages: st.profileImages
}),{
    verifyUserAccess: userActions.verifyUserAccess,
    logoutUser: userActions.logoutUser,
}) (UserProfileClient)


const UserProfileStyled = styled.div`
    color: ${pr => pr.theme.color.white};   
    width: 100%;

`