/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store/root.reducer'
import styled from 'styled-components'
import * as userActions from '../../store/user/user.actions'

interface UserProfileProps {
    userData: RootState['userData'],
    verifyUserAccess: () => Promise<boolean>,
    logoutUser: () => Promise<void>
}

// interface LoadingState {
//     loading: boolean
// }

const UserProfile: React.FC<UserProfileProps> = ({
    userData,
    verifyUserAccess,
    logoutUser
}) => {
    // const [loading, setLoading] = useState<LoadingState['loading']>(false)


    useEffect(() => {
        verifyUserAccess()
    }
    ,[verifyUserAccess])

    const handleLogout = () => {
        logoutUser()
    }

  return (
    <UserProfileStyled>
        <span> Welcome {userData.user_name} </span>
        <button onClick={handleLogout}> Logout </button>
    </UserProfileStyled>
  )
}

export default connect((st: RootState ) => ({
    userData: st.userData
}),{
    verifyUserAccess: userActions.verifyUserAccess,
    logoutUser: userActions.logoutUser
}) (UserProfile)


const UserProfileStyled = styled.div`
    color: ${pr => pr.theme.color.white};   

`