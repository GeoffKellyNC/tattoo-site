/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import * as notifyActions from '../../store/notifications/notify.actions';
import * as userActions from '../../store/user/user.actions';
import loginBG from '../../assets/login-bg.jpg'


const linkdLogo = 'https://storage.googleapis.com/tattoo-user-uploaded-images/app-images/logo/linkd-logo.png'



const initFormValues = {
    user_name: '',
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
                <label> LOGIN </label>
                <input
                    type='text'
                    name='user_name'
                    value={formValues.user_name}
                    onChange={onChange}
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
                <NavLink to = '/reset-password-user' className = 'reset-password-link'> Forgot Password? </NavLink>
            </div>

        </LoginStyled>
        </LoginBackground>
    );
}
export default connector(Login);

const LoginBackground = styled.div`
    background-image: url(${loginBG});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
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
    background: rgba(25, 25, 25, 0.95);
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${pr => pr.theme.color.white};


    .reset-password-link {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 500;
        color: ${pr => pr.theme.color.white};
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
            color: ${pr => pr.theme.color.purple};
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
            font-size: ${pr => pr.theme.font.size.md};
            font-weight: bold;

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
            width: 100%;
            padding: 8px;
            margin: 5px 0;
            border: 1px solid #888;
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.1);
            color: ${pr => pr.theme.color.white};
            outline: none;
            font-family: ${pr => pr.theme.font.family.primary};
            transition: border-color 0.3s ease;

            &:focus {
                border-color: ${pr => pr.theme.color.purple};
            }
        }

        .form-btn {
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
    }
`;


const TagStyled = styled.span`
   height: 100px;
    width: 100px;

    .linked-i {
        font-size: 150%; /* Adjust this percentage as needed for the desired 'I' size */
    }
`;
