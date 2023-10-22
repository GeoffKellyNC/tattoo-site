/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useCallback} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../store/root.reducer'
import { useNavigate } from 'react-router-dom'
import * as userActions from '../../store/user/user.actions'

interface RedirectProps {
    userData: RootState['userData'],
    getProfileImage: () => Promise<void>

}

const Redirect: React.FC<RedirectProps> = ({
    userData,
    getProfileImage
}) => {

    const nav = useNavigate()

    const handleRedirect = useCallback( async () => {
        await getProfileImage()
        if(userData.unxid.length > 0 && userData.account_type ==='client' || userData.account_type === 'artist'){
            nav(`/user/client/:${userData.unxid}`)
            return;
        }
        nav('/')
    }
    ,[getProfileImage, nav, userData.account_type, userData.unxid])

    useEffect( () => {
        handleRedirect()
    }
    ,[handleRedirect])

  return (
    <RedirectStyled>
        <span> Loading Data.... </span>
    </RedirectStyled>
  )
}

export default connect((st: RootState) => ({
    userData: st.userData
}),{
    getProfileImage: userActions.getProfileImage
}) (Redirect)

const RedirectStyled = styled.div`
    color: ${pr => pr.theme.color.white};
    font-size: 10rem;
    font-family: ${pr => pr.theme.font.family.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;

`