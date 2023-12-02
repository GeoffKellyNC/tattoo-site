/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import * as notifyActions from '../../store/notifications/notify.actions';
import * as userActions from '../../store/user/user.actions';


const linkdLogo = 'https://storage.googleapis.com/tattoo-user-uploaded-images/app-images/logo/linkd-logo.png'



const initFormValues = {
    email: '',
    password: ''
}

const connector = connect(null, {
    loginUser: userActions.loginUser,
    setNotification: notifyActions.setNotification
});

type LoginReturnType = {state: boolean, unxid: string | null};


type PropsFromRedux = ConnectedProps<typeof connector>;

const Login: React.FC<PropsFromRedux> = ({ loginUser, setNotification }) => {
    const [formValues, setFormValues] = useState(initFormValues);

    const nav = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const loggedIn = await loginUser(formValues) as LoginReturnType;
    
        if (!loggedIn.state) {
            setNotification('error', 'Invalid Username or Password');
            setFormValues(initFormValues);
            return
        }
    
        nav(`/redirect`);
    
        return;
    }
    

    return (
        <LoginBackground>
        <LoginStyled>
            <div className='login-top'>
                <TagStyled>
                    <img src={linkdLogo} alt="linkd logo" />
                </TagStyled>
                <h1> LOGIN </h1>
            </div>
            <div className='login-form'>
                <input
                    type='email'
                    name='email'
                    value={formValues.email}
                    onChange={onChange}
                    className='form-input user-name'
                    placeholder='Email'
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
                <NavLink to = '/reset-password-user' className = 'reset-password-link'> Forgot Password? </NavLink>
            </div>

        </LoginStyled>
        </LoginBackground>
    );
}
export default connector(Login);

const LoginBackground = styled.div`
    background-color: #151828;
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;


    @media (max-width: 768px) {
        background: black;
    }


`

const LoginStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${pr => pr.theme.color.white};
    border: 1px solid #888;

    input {
                
        &:focus {
            border-color: #eeff00 !important; 
            outline: none !important;
        }

        &::placeholder {
            color: white;
        }
    
    }


    .reset-password-link {
        margin-top: 10px;
        font-size: 1.2rem;
        font-weight: 500;
        color: ${pr => pr.theme.color.white};
        text-decoration: none;
        transition: color 0.3s ease;
        font-family: ${pr => pr.theme.font.family.secondary};

        &:hover {
            color: ${pr => pr.theme.color.purple};
            outline: none;
        }
    }

    .login-top {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;


        .tag {
            font-size: ${pr => pr.theme.font.size.title};
            font-weight: normal;
            margin-bottom: 10px;
            display: flex;
            align-items: center;

            .title {
                font-size: inherit;
            }

            .linked-i {
                font-size: 150%; // You can adjust this value for the desired 'I' size.
            }

            @media (max-width: 768px) {
                font-size: ${pr => pr.theme.font.size.sm};
            }
        }

        h1 {
            font-family: ${pr => pr.theme.font.family.secondary};
            font-size: 2.5rem;
            border-bottom: 1px solid #888;

            @media (max-width: 768px) {
                font-size: ${pr => pr.theme.font.size.sm};
            }
        }
    }

    .login-form {
        width: 100%;
        display: flex;
        flex-direction: column;

        label {
            margin-top: 10px;
            font-size: 14px;
            font-weight: 500;
            color: ${pr => pr.theme.color.white};
        }

        .form-input {
            background-color: rgba(2, 2, 16, 0.8);
            border: 1px solid #888;
            border-radius: 5px;
            color: white;
            font-family: ${({ theme }) => theme.font.family.secondary};
            margin-bottom: 1em;
            padding: 0.5em;
            width: 100%;

        
        }

        .form-btn {
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
        }
    }
`;


const TagStyled = styled.span`
   height: 100px;
    width: 100px;

    .linked-i {
        font-size: 150%; /* Adjust this percentage as needed for the desired 'I' size */
    }
`;
