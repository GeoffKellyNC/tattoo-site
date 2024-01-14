import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import resetUserPasswordApi from '../../api/resetPassword'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import * as notifyTypes from '../../store/notifications/notify.types'

const ResetPassForm: React.FC = () => {
    const [formValues, setFormValues] = useState<{password: string, verifyPassword: string}>({
        password: '',
        verifyPassword: ''
    })

    const { token, unxid } = useParams()


    const nav = useNavigate()
    const dispatch = useDispatch()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(formValues.password !== formValues.verifyPassword) {
            dispatch({
                type: notifyTypes.SET_NOTIFY,
                payload: {
                    type: 'error',
                    message: 'Passwords do not match.'
                }
            })
            console.log('passwords do not match')
            return
        }
        const isreset: boolean = await resetUserPasswordApi(formValues.password, token, unxid)

        if(!isreset) {
            dispatch({
                type: notifyTypes.SET_NOTIFY,
                payload: {
                    type: 'error',
                    message: 'Password reset failed. Please try again.'
                }
            })
            console.log('password reset failed')
            return
        }
        setFormValues({
            password: '',
            verifyPassword: ''
        })
        nav('/login')
        return
    }


  return (
    <ResetPassFormContainer>
        <div className='title-container'>
            <span> Enter your new password below. </span>
        </div>
        <input 
            type='password'
            name='password'
            value={formValues.password} 
            onChange={onChange} 
            placeholder='Password'/>
        <input 
            type='password' 
            name='verifyPassword'
            value={formValues.verifyPassword} 
            onChange={onChange} 
            placeholder='Verify Password'/>
        <button onClick = {onSubmit}>Submit</button>
    </ResetPassFormContainer>
  )
}

export default ResetPassForm

const ResetPassFormContainer = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    .title-container {
        margin-bottom: 2rem;

        span {
            font-size: 1.5rem;
            text-align: center;
            font-family: ${pr => pr.theme.font.family.secondary};
            
        }
    }

    input {
        margin-bottom: 1rem;
        width: 20%;
        height: 3rem;
        background-color: ${pr => pr.theme.color.black};
        color: white;
        border: none;
        padding: 0 1rem;
        font-family: ${pr => pr.theme.font.family.secondary};

        &:focus {
            outline: none;
        }

        @media(max-width: ${pr => pr.theme.media.tablet}){
            width: 80%;
        }

    }

    button {
        margin-top: 1rem;
        width: 20%;
        height: 3rem;
        background-color: ${pr => pr.theme.color.red};
        color: white;
        border: none;
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: 1.5rem;

        &:hover {
            cursor: pointer;
        }

        @media(max-width: ${pr => pr.theme.media.tablet}){
            width: 80%;
        }
    }
`