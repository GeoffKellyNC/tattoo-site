/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store/root.reducer'
import { UserData } from '../../store/user/user.reducer'
import * as userActions from '../../store/user/user.actions'
import styled from 'styled-components'

interface Props {
    userData: UserData;
    updateVerificationEmail: (email: string) => Promise<boolean>
}

const EmailNotVerified: React.FC<Props> = ({
    userData,
    updateVerificationEmail
}) => {
    const [needsUpdate, setNeedsUpate] = useState<boolean>(false)
    const [newEmail, setNewEmail] = useState<string>('')
    const [currentEmail, setCurrentEmail] = useState<string | null>(userData.user_email)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        setCurrentEmail(newEmail)
        updateVerificationEmail(newEmail)
        setNeedsUpate(false)
        setNewEmail('')
        return
    }


  return (


    <NoEmailContainer>
        <span>Welcome { userData.user_name }! Your email {currentEmail} has not been verified. Please click the link in the email that was sent to you. It may take up to 15 minutes for this email to arrive. Check your spam folder if you do not see it. </span>
        <button onClick={() => setNeedsUpate(!needsUpdate)}>Update Email</button>
        {
            needsUpdate && (
                <div>
                    <input 
                        type='text' 
                        value={newEmail} 
                        onChange={onChange} 
                        placeholder='New Email'/>
                    <button onClick = {handleSubmit}>Update</button>
                </div>
            )
        }
    </NoEmailContainer>
  )
}

export default connect((st: RootState) => ({
    userData: st.userData
}),{
    updateVerificationEmail: userActions.updateVerificationEmail
}) (EmailNotVerified)


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