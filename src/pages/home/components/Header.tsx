import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const nav = useNavigate();

    const handleRegister = () => {
        nav('/register')
        return;
    }

    const handleLogin = () => {
        nav('/login')
        return;
    }

    return (
        <HeaderStyled>
            <div className = 'header-top'>
                <span className = 'tag'> From Concept to Canvas: Get LInk'd. </span>
            </div>
            <div className="title-section">
                <span className='title'>L</span>
                <span className='title linked-i'>I</span>
                <span className='title'>NK'D</span>
            </div>
            <div className = 'btn-container'>
                <button onClick={handleLogin} className = 'login-btn btn'> LOGIN </button>
                <button onClick={handleRegister}  className = 'register-btn btn'> REGISTER </button>
            </div>
        </HeaderStyled>
    );
}

export default Header;

const HeaderStyled = styled.div`
    text-align: center;
    padding: 1rem 2rem;
    color: ${pr => pr.theme.color.white};
    padding-top: 10rem;

    .title-section {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: ${pr => pr.theme.font.size.title}; 
        margin: 0; 
        font-family: ${pr => pr.theme.font.family.logo};
    }

    .linked-i {
        font-size: 15rem;
    }

    .header-top {
        padding: 0;
        margin: 0;
        color: ${pr => pr.theme.color.pink};
    }

    .tag {
        font-family: ${pr => pr.theme.font.family.primary};
        font-size: ${pr => pr.theme.font.size.xl};
    }

    .btn-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12%;
    }

    .btn {
        font-family: ${pr => pr.theme.font.family.primary};
        width: 50%;
        border: none;
        margin: 5%;
        border-radius: 15px;
        position: relative;
        overflow: hidden;
        z-index: 1;
        color: #fff;
        background-color: #333;
        box-shadow: 0 0 20px #333;
        transition: all 0.3s ease-in-out;

        &::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            bottom: -2px;
            right: -2px;
            z-index: -1;
            background-color: #fff;
            filter: blur(20px);
            opacity: 0.5;
            transition: all 0.3s ease-in-out;
        }

        &:hover {
            box-shadow: 0 0 40px #333;
            transform: scale(1.1);

            &::before {
                opacity: 1;
                filter: blur(40px);
            }
        }
    }

    .login-btn {
        background: ${pr => pr.theme.color.pink};
    }

    .register-btn {
        background: ${pr => pr.theme.color.accent};
    }
    

    @media (max-width: ${pr => pr.theme.media.laptop}) {
        .title {
            font-size: 1.75rem;
        }


        .linked-i {
            font-size: 2rem;
        }
    }

    @media (max-width: ${pr => pr.theme.media.tablet}) {
        .title {
            font-size: 1${pr => pr.theme.font.size.tablet_title};
        }

        .tag {
            font-size: ${pr => pr.theme.font.size.sm};

        }

        .linked-i {
            font-size: 1.75rem;
        }
    }

    @media (max-width: ${pr => pr.theme.media.phone}) {
        .title {
            font-size: ${pr => pr.theme.font.size.phone_title};
        }


        .linked-i {
            font-size: 3.5rem;
        }
    }


`;