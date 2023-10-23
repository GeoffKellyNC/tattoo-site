/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store/root.reducer'
import { UserData } from '../../store/user/user.reducer'
import styled from 'styled-components'

interface Props {
    userData: UserData
}

const EmailNotVerified: React.FC<Props> = ({
    userData
}) => {
  return (
    <NoEmailContainer>
        <span>Welcome { userData.user_name }! Your email {userData.user_email} has not been verified. Please click the link in the email that was sent to you. It may take up to 15 minutes for this email to arrive. Check your spam folder if you do not see it. </span>
    </NoEmailContainer>
  )
}

export default connect((st: RootState) => ({
    userData: st.userData
}),null) (EmailNotVerified)


const NoEmailContainer = styled.div`
    color: ${pr => pr.theme.color.white};
    font-family: ${pr => pr.theme.font.family.primary};
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;

    span {
        text-align: center;
        width: 50%;
    }


`