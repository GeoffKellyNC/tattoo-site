import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../../../assets/tattoo-header.jpg'

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
            <div className="title-section">
                <span className='title'>L</span>
                <span className='title linked-i'>I</span>
                <span className='title'>NK'D</span>
            </div>
            <div className = 'header-top'>
                <span className = 'tag'> From Concept to Canvas: Get LInk'd. </span>
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
background-image: linear-gradient(to bottom, transparent, rgba(0,0,0,1)), url(${backgroundImg});
background-size: cover;
background-position: center;
background-repeat: no-repeat;
height: 100vh;

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
        padding-bottom: 1rem;
        margin: 0;
        color: ${pr => pr.theme.color.pink};
    }

    .tag {
        font-family: ${pr => pr.theme.font.family.primary};
        font-size: ${pr => pr.theme.font.size.l};
        color: ${pr => pr.theme.color.white};
    }

    .btn-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-top: 5rem;
    }

    .btn {
        font-family: ${pr => pr.theme.font.family.primary};
        padding: 0.5rem 1.5rem;
        border: 2px solid white;
        margin: 5% 0;
        position: relative;
        color: #fff;
        box-shadow: 0 0 20px #333;
        transition: all 0.3s ease-in-out;
        border-radius: 15px;




        &:hover {
            transform: scale(1.1);


        }
    }

    .login-btn {
        background: ${pr => pr.theme.color.red};
    }

    .register-btn {
        background: ${pr => pr.theme.color.red};
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

    @media (min-width: ${pr => pr.theme.media.laptop}) {
        .btn-container {
            flex-direction: row;
        }

        .btn {
            margin: 0 5%;
        }
    }
`;

