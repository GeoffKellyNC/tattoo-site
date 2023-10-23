import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import resetUserPasswordApi from '../../api/resetPassword'
import styled from 'styled-components'

const ResetPassForm: React.FC = () => {
    const [formValues, setFormValues] = useState<{password: string, verifyPassword: string}>({
        password: '',
        verifyPassword: ''
    })

    const { token, unxid } = useParams()


    const nav = useNavigate()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(formValues.password !== formValues.verifyPassword) {
            console.log('passwords do not match')
            return
        }
        const isreset: boolean = await resetUserPasswordApi(formValues.password, token, unxid)

        if(!isreset) {
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
    margin-top: 10rem;
`