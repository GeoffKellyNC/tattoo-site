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
        <div className='title-container'>
            <span> Enter your email address below. If there is a match an email with a reset link will be sent. Please allow up to 15 minutes for the email to be sent. </span>
        </div>
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
    font-family: ${pr => pr.theme.font.family.secondary};
    padding: 0 1rem;

    .title-container {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        font-family: ${pr => pr.theme.font.family.secondary};
    }

    span {
        font-size: 1.5rem;
        text-align: center;
        width: 40%;
        font-family: ${pr => pr.theme.font.family.secondary};

        @media(max-width: ${pr => pr.theme.media.tablet}){
            width: 100%;
        }
    }

    input {
        width: 20%;
        height: 3rem;
        border-radius: 5px;
        border: 1px solid ${pr => pr.theme.color.red};
        padding: 0 1rem;
        font-size: 1.5rem;
        font-family: ${pr => pr.theme.font.family.secondary};
        background: ${pr => pr.theme.color.black};
        color: ${pr => pr.theme.color.white};
        cursor: pointer;


        &:focus {
            outline: none;
        }

        @media(max-width: ${pr => pr.theme.media.tablet}){
            width: 100%;
        }
    }

    button {
        width: 20%;
        height: 3rem;
        border-radius: 5px;
        border: 1px solid ${pr => pr.theme.color.red};
        padding: 0 1rem;
        font-size: 1.5rem;
        font-family: ${pr => pr.theme.font.family.secondary};
        background: ${pr => pr.theme.color.red};
        color: ${pr => pr.theme.color.black};
        cursor: pointer;

        &:focus {
            outline: none;
        }

        @media(max-width: ${pr => pr.theme.media.tablet}){
            width: 100%;
        }
    }

`