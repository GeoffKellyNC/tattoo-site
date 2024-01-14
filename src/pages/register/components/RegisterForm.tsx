/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as notifyActions from '../../../store/notifications/notify.actions'
import * as userActions from '../../../store/user/user.actions'
import { connect } from 'react-redux'
import { RootState } from '../../../store/root.reducer'
import styled from 'styled-components'
import isValidUsername from '../../../util/BannedUserNameCheck'
import ReactGA from 'react-ga'

// Helpers
import checkUserName from '../../../helpers/checkUserName'
import checkEmail from '../../../helpers/checkEmail'

// TYPES

interface FormValues {
    user_name: string,
    email: string,
    first_name: string,
    last_name: string,
    display_name: string,
    account_type: string,
    password: string
    verify_password: string
}

interface RegisterProps {
    setNotification: (type: string, message: string) => void,
    registerUser: (data: FormValues) => void
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
    password: '',
    verify_password: ''
}


const performChecks = async (data: FormValues, notifyFunc: (type: string, message: string, ) => void, setFormValues: React.Dispatch<React.SetStateAction<FormValues>> ): Promise<CheckResult> =>  {
    
    if (!data) {
        notifyFunc('error', 'Form data is missing');
        return {item: 'form', case: false};
    }

    const {
        user_name,
        email,
        first_name,
        last_name,
        display_name,
        account_type,
        password,
        verify_password
    } = data;

    const isUserNameValid = isValidUsername(user_name);

    if(!isUserNameValid) {
        notifyFunc('error', 'Cannot use this name');
        return {item: 'username', case: false};
    }

    if (user_name.trim().length < 4) {
        notifyFunc('error', 'Username must be at least 4 characters long');
        return {item: 'username', case: false};
    }

    // make sure username contains only letters and numbers and no spaces
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    if(!usernamePattern.test(user_name)){
        notifyFunc('error', 'Username can only contain letters and numbers');
        return {item: 'username', case: false};
    }

    const doesUserNameExist = await checkUserName(user_name);
    if(doesUserNameExist){
        notifyFunc('error', 'Username is already taken');
        return {item: 'username_exists', case: false};
    }

    const doesEmailExists = await checkEmail(email);
    console.log('Form Check doesEmailExists', doesEmailExists) 
    if(doesEmailExists){
        notifyFunc('error', 'Email is already taken');
        return {item: 'email_exists', case: false};
    }

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

    const displayValid = await isValidUsername(display_name);

    const displayPattern = /^[a-zA-Z0-9]+$/;
    if(!displayPattern.test(display_name)){
        notifyFunc('error', 'Display name can only contain letters and numbers');
        return {item: 'display_name', case: false};
    }

    if(!displayValid) {
        notifyFunc('error', 'Cannot use this display name');
        return {item: 'display_name', case: false};
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

    if(password !== verify_password) {
        // clear out password fields
        setFormValues(prevState => ({
            ...prevState,
            password: '',
            verify_password: ''
        }));
        notifyFunc('error', 'Passwords do not match!');
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
    const [acceptsTOS, setAcceptsTOS] = useState<boolean>(false)

    const nav = useNavigate()


    const handleTOSChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAcceptsTOS(e.target.checked)
    }

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

        ReactGA.event({
            category: 'User',
            action: 'Clicked Register Button',
            label: 'User Registered'
        })

        if(!acceptsTOS){
            setNotification('error', 'You must accept and agree to the Terms of Service to register')
            return
        }
        const checks = await performChecks(formValues, setNotification, setFormValues)

        if (checks.case && checks.item === 'success') {
            setNotification('success', 'Registration Successful! Please check your email to verify your account')
            await registerUser(formValues)
            setFormValues(initFormValues)
            if(formValues.account_type === 'client' || formValues.account_type === 'artist'){
                nav('/login')
                return
            }
            return 
        }
        return
    }


  return (
    <StyledRegisterWrapper>
    <StyledRegisterForm>
      <StyledTitle>REGISTER</StyledTitle>
            <StyledInput 
                type = 'text'
                name = 'first_name'
                onChange={onChange}
                value = {formValues.first_name}
                className = 'reg-input input-first-name'
                placeholder='First Name'
            />
            <StyledInput 
                type = 'text'
                name = 'last_name'
                onChange={onChange}
                value = {formValues.last_name}
                className = 'reg-input input-last-name'
                placeholder='Last Name'
            />
            <StyledInput 
                type = 'email'
                name = 'email'
                onChange={onChange}
                value = {formValues.email}
                className = 'reg-input input-email'
                placeholder='Email (Will be verified)'
            />
            <StyledInput 
                type = 'text'
                name = 'user_name'
                onChange={onChange}
                value = {formValues.user_name}
                className = 'reg-input input-username'
                placeholder='Username'
            />
            <StyledInput 
                type = 'text'
                name = 'display_name'
                onChange={onChange}
                value = {formValues.display_name}
                className = 'reg-input input-display-name'
                placeholder='Display Name'
            />
            <StyledInput 
                type = 'password'
                name = 'password'
                onChange={onChange}
                value = {formValues.password}
                className = 'reg-input input-password'
                placeholder='Password'
            />
            <StyledInput 
                type = 'password'
                name = 'verify_password'
                onChange={onChange}
                value = {formValues.verify_password}
                className = 'reg-input input-verify-password'
                placeholder='Verify Password'
            />
            <StyledSelect 
                name = 'account_type'
                onChange={onSelectChange}
                value = {formValues.account_type}
                className = 'reg-input input-account-type'
            >
                <option value = ''> Select Account Type </option>
                <option value = 'artist'> Artist </option>
                <option value = 'client'> Client </option>
            </StyledSelect>
            <TOSContainer>
                <input 
                    type = 'checkbox'
                    name = 'tos'
                    onChange = {handleTOSChange}
                    checked = {acceptsTOS}
                    className = 'reg-input input-tos'
                />
                <span className = 'tos-text'> I accept the <a href = '/terms-of-service' target = '_blank' rel = 'noreferrer'> Terms of Service </a> </span>
            </TOSContainer>
            <StyledButton 
                className = 'reg-input input-submit'
                onClick = {onSubmit}
            > Submit </StyledButton>
        </StyledRegisterForm>
    </StyledRegisterWrapper>
    
  )
}

export default connect((st: RootState) => ({
    appNotifications: st.appNotifications
}),{
    setNotification: notifyActions.setNotification,
    registerUser: userActions.registerUser
}) (RegisterForm)


const StyledRegisterWrapper = styled.div`
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
  padding: 2em;

  input {
    &:focus {
        border-color: #eeff00 !important;
        outline: none;
    }
  }


`;

const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.color.white};
  margin-bottom: 1em;
  text-align: center;
  font-size: 2.5rem;
  border-bottom: 1px solid #888;
  font-family: ${({ theme }) => theme.font.family.secondary};
`;

const StyledRegisterForm = styled.form`
    border-radius: 10px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    padding: 2em;
    height: auto;
    margin-top: 5rem;
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
  border: 1px solid #888;


`;

const StyledInput = styled.input`
    background-color: rgba(2, 2, 16, 0.8);
    border: 1px solid #888;
    border-radius: 5px;
    color: white;
    font-family: ${({ theme }) => theme.font.family.secondary};
    margin-bottom: 1em;
    padding: 0.5em;
    width: 100%;

    &:focus {
        border-color: #eeff00 !important; 
    }

    &&::placeholder {
        color: white;
        font-family: ${({ theme }) => theme.font.family.secondary};
    }


`;

const StyledSelect = styled.select`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid #888;
  border-radius: 5px;
  color: #fff;
  margin-bottom: 1em;
  padding: 0.5em;
  width: 100%;

  &:focus {
    border-color: #eeff00; 
  }
`;

const StyledButton = styled.button`
  background-color: rgba(2, 2, 16, 0.8); // Soft green color for the button
  border: none;
  border-radius: 5px;
  color: white;
  font-family: ${({ theme }) => theme.font.family.secondary};
    font-size: 2rem;
  cursor: pointer;
  font-weight: 500;
  padding: 0.2em;
  width: 100%;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.8;
    color: black;
    background-color: #eeff00;
  }
`;

const TOSContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    width: 100%;
    font-family: ${({ theme }) => theme.font.family.secondary};
    font-size: 1.6rem;
    color: white;
    gap: 1rem;

    a {
        color: #eeff00;
    }

`
