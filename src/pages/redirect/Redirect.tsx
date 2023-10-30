/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useCallback} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../store/root.reducer'
import { useNavigate } from 'react-router-dom'
import * as userActions from '../../store/user/user.actions'
import { UserData } from '../../store/user/user.reducer'
import RotatingSquareLoader from '../../loading/RotatingSquare'

interface RedirectProps {
    userData: UserData,
    getProfileImage: () => Promise<void>
    verifyUserAccess: () => Promise<boolean>

}

const Redirect: React.FC<RedirectProps> = ({
    userData,
    getProfileImage,
    verifyUserAccess
}) => {

    const nav = useNavigate()

    const handleRedirect = useCallback( async () => {
        if(!userData.email_verified){
            nav('/no-email-verify')
            return
        }
        await getProfileImage()
        if(userData.unxid.length > 0 && userData.account_type ==='client' || userData.account_type === 'artist'){
            const allowed = await verifyUserAccess()
            if(!allowed){
                nav('/pricing')
                return
            }
            nav(`/user/client/:${userData.unxid}`)
            return;
        }
        nav('/')
    }
    ,[getProfileImage, nav, userData.account_type, userData.email_verified, userData.unxid, verifyUserAccess])

    useEffect( () => {
        handleRedirect()
    }
    ,[handleRedirect])

  return (
    <RedirectStyled>
        <RotatingSquareLoader />
    </RedirectStyled>
  )
}

export default connect((st: RootState) => ({
    userData: st.userData
}),{
    getProfileImage: userActions.getProfileImage,
    verifyUserAccess: userActions.verifyUserAccess
}) (Redirect)

const RedirectStyled = styled.div`
    height: 100vh;
    width: 100vw;

`