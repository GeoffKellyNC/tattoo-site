/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../store/root.reducer'
import * as notifyActions from '../../store/notifications/notify.actions'
import * as userActions from '../../store/user/user.actions'

interface LoginProps {
    loginUser: (data: unknown) => Promise<boolean>,
    setNotification: (type: string, message: string) => void
}

interface FormValues {
    user_name: string,
    password: string
}

const initFormValues = {
    user_name: '',
    password: ''
}

const Login: React.FC<LoginProps> = ({
    loginUser,
    setNotification
}) => {
    const [formValues, setFormValues] = useState<FormValues>(initFormValues)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }
    

    const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const loggedIn = loginUser(formValues);

        if(!loggedIn){ 
            setNotification('error', 'Invalid Credentials')
            return
        }
        return;

       
    }

  return (
    <LoginStyled>
        <div className = 'login-top'>
            <span className = 'tag'> From Concept to Canvas: Get LInk'd. </span>
            <h1> LOGIN </h1>
        </div>
        <div className = 'login-form'>
            <label> LOGIN </label>
            <input 
                type = 'text'
                name = 'user_name'
                value = {formValues.user_name}
                onChange = {onChange}
                className='form-input user-name'
                placeholder='Username'
            />
            <input
                type='password'
                name='password'
                value={formValues.password}
                onChange={onChange}
                className='form-input password'
                placeholder='Password'
            />
            <button onClick={onSubmit} className='form-btn'> LOGIN </button>
        </div>

    </LoginStyled>
  )
}

export default connect((st: RootState )=> ({
    appNotifications: st.appNotifications
}),{
    loginUser: userActions.loginUser,
    setNotification: notifyActions.setNotification
}) (Login)


const LoginStyled = styled.div`
    color: ${pr => pr.theme.color.white};
`