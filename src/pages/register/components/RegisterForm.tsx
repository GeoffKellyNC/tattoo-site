/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import * as notifyActions from '../../../store/notifications/notify.actions'
import * as userActions from '../../../store/user/user.actions'
import { connect } from 'react-redux'
import { RootState } from '../../../store/root.reducer'
import styled from 'styled-components'

// Helpers
import checkUserName from '../../../helpers/checkUserName'

// TYPES

interface RegisterProps {
    setNotification: (type: string, message: string) => void,
    registerUser: (data: unknown) => void
}

interface FormValues {
    user_name: string,
    email: string,
    first_name: string,
    last_name: string,
    display_name: string,
    account_type: string,
    password: string
}

interface CheckResult {
    item: string,
    case: boolean
}

const initFormValues: FormValues = {
    user_name: '',
    email: '',
    first_name: '',
    last_name: '',
    display_name: '',
    account_type: '',
    password: ''
}


const performChecks = async (data: FormValues, notifyFunc: (type: string, message: string) => void): Promise<CheckResult> =>  {
    console.log('Performing Checks')
    
    if (!data) {
        notifyFunc('error', 'Form data is missing');
        return {item: 'form', case: false};
    }

    const {
        user_name = '',
        email = '',
        first_name = '',
        last_name = '',
        display_name = '',
        account_type = '',
        password = ''
    } = data;

    console.log('Checking username')
    if (user_name.trim().length < 4) {
        notifyFunc('error', 'Username must be at least 4 characters long');
        console.log('Username failed check')
        return {item: 'username', case: false};
    }
    console.log('Username passed check')

    console.log('Checking if username exists')
    const doesUserNameExist = await checkUserName(user_name);
    if(doesUserNameExist){
        notifyFunc('error', 'Username is already taken');
        console.log('Username exists')
        return {item: 'username_exists', case: false};
    }
    console.log('Username does not exist')

    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!emailPattern.test(email)){
        notifyFunc('error', 'Please enter a valid email address');
        return {item: 'email', case: false};
    }

    if(first_name.trim().length < 1){
        notifyFunc('error', 'Please enter your first name');
        return {item: 'first_name', case: false};
    }

    if(last_name.trim().length < 1){
        notifyFunc('error', 'Please enter your last name');
        return {item: 'last_name', case: false};
    }

    if (display_name.trim().length < 4) {
        notifyFunc('error', 'Display name must be at least 4 characters long');
        return {item: 'display_name', case: false};
    }

    if (account_type.trim().length < 1) {
        notifyFunc('error', 'Please select an account type');
        return {item: 'account_type', case: false};
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
    if(!passwordPattern.test(password)) {
        notifyFunc('error', 'Password must be at least 8 characters long, contain at least 1 uppercase letter, and 1 number. Symbols are allowed.');
        return {item: 'password', case: false};
    }    

    return {item: 'success', case: true};
}




// COMPONENT

const RegisterForm: React.FC<RegisterProps> = ({
    setNotification,
    registerUser
}) => {
    const [formValues, setFormValues] = useState<FormValues>(initFormValues)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {{
        const { name, value } = e.target

        setFormValues({
            ...formValues,
            [name]: value
        })
    }}

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {{
        const { name, value } = e.target

        setFormValues({
            ...formValues,
            [name]: value
        })
    }}

    const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const checks = await performChecks(formValues, setNotification)

        if (checks.case && checks.item === 'success') {
            console.log('Form passed checks')
            console.log(formValues)
            registerUser(formValues)
            console.log('Form Sent!')
            setFormValues(initFormValues)
            return
        }
        console.log('Form failed checks')
        return
    }


  return (
    <>
        <RegisterTop>
            <h1 className = 'reg-title'> REGISTER </h1>
        </RegisterTop>
        <StyledRegisterForm>
            <label> First Name </label>
            <input 
                type = 'text'
                name = 'first_name'
                onChange={onChange}
                value = {formValues.first_name}
                className = 'reg-input input-first-name'
            />
            <label> Last Name </label>
            <input 
                type = 'text'
                name = 'last_name'
                onChange={onChange}
                value = {formValues.last_name}
                className = 'reg-input input-last-name'
            />
            <label> Email </label>
            <input 
                type = 'email'
                name = 'email'
                onChange={onChange}
                value = {formValues.email}
                className = 'reg-input input-email'
            />
            <label> Username </label>
            <input 
                type = 'text'
                name = 'user_name'
                onChange={onChange}
                value = {formValues.user_name}
                className = 'reg-input input-username'
            />
            <label> Display Name </label>
            <input 
                type = 'text'
                name = 'display_name'
                onChange={onChange}
                value = {formValues.display_name}
                className = 'reg-input input-display-name'
            />
            <label> Password </label>
            <input 
                type = 'password'
                name = 'password'
                onChange={onChange}
                value = {formValues.password}
                className = 'reg-input input-password'
            />
            <label> Account Type </label>
            <select 
                name = 'account_type'
                onChange={onSelectChange}
                value = {formValues.account_type}
                className = 'reg-input input-account-type'
            >
                <option value = ''> Select Account Type </option>
                <option value = 'artist'> Artist </option>
                <option value = 'client'> Client </option>
            </select>
            <button 
                className = 'reg-input input-submit'
                onClick = {onSubmit}
            > Submit </button>
        </StyledRegisterForm>
    </>
  )
}

export default connect((st: RootState) => ({
    appNotifications: st.appNotifications
}),{
    setNotification: notifyActions.setNotification,
    registerUser: userActions.registerUser
}) (RegisterForm)

const RegisterTop = styled.div`
    color: ${pr => pr.theme.color.white};
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${pr => pr.theme.font.family.primary};
    font-size: ${pr => pr.theme.font.size.md};

`;


const StyledRegisterForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    padding: 40px;
    background: rgba(25, 25, 25, 0.95);
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${pr => pr.theme.color.white};

    label {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 500;
        color: ${pr => pr.theme.color.white};
    }

    input[type="text"],
    input[type="email"],
    input[type="password"],
    select {
        width: 100%;
        padding: 8px;
        margin: 5px 0;
        border: 1px solid #888;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.1);
        color: ${pr => pr.theme.color.white};
        outline: none;
        transition: border-color 0.3s ease;

        &:focus {
            border-color: ${pr => pr.theme.color.purple};
        }
    }

    button {
        width: 100%;
        padding: 10px;
        margin-top: 15px;
        border: none;
        border-radius: 5px;
        background: linear-gradient(45deg, #8428d8, #e53a40);
        color: ${pr => pr.theme.color.white};
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: opacity 0.3s ease;

        &:hover {
            opacity: 0.9;
        }
    }

    select {
        appearance: none;
        cursor: pointer;
    }
`;
