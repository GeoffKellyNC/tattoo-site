import React, { useState } from 'react'
import styled from 'styled-components'
import sendPasswordResetEmailApi from '../../api/requestResetEmail'
import { useDispatch } from 'react-redux'
import * as notifyTypes from '../../store/notifications/notify.types'

const EmailVerify: React.FC = () => {
    const [email, setEmail] = useState<string>('')

    const dispatch = useDispatch()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setEmail('')
        const hasSent = await sendPasswordResetEmailApi(email)

        if(!hasSent) {
            dispatch({
                type: notifyTypes.SET_NOTIFY,
                payload: {
                    type: 'error',
                    message: 'If an account exists with that email address, a reset link will be sent. Ensure you have entered the correct email address.' 
                }
            })

            dispatch({
                type: notifyTypes.SET_NOTIFY,
                payload: {
                    type: 'info',
                    message: 'If an account exists with that email address, a reset link will be sent.' 
                }
            })
            return
        }

        return
    }


  return (
    <EmailVerifyContainer>
        <span> Enter your email address below. If there is a match an email with a reset link will be sent. </span>
        <input 
            type='text' 
            value={email} 
            onChange={onChange} 
            placeholder='Email'/>
        <button onClick = {onSubmit}>Request Link</button>
    </EmailVerifyContainer>
  )
}

export default EmailVerify


const EmailVerifyContainer = styled.div`
    color: white;
    margin-top: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    font-family: ${pr => pr.theme.font.family.primary};

`