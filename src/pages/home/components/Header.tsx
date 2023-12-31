import React from 'react';
import styled from 'styled-components';

import city_sky from '../../../assets/city-sky.png';
const linkdLogo = 'https://storage.googleapis.com/tattoo-user-uploaded-images/app-images/logo/linkd-logo.png'
import Background from './Background';

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <Background />
            <LogoContainer>
                <CityImage src={city_sky} alt="city sky" />
                <Logo src={linkdLogo} alt="linkd logo" />
            </LogoContainer>
            <Tagline>From Concept to Canvas: Get LINK'D.</Tagline>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.header`
    position: relative;
    color: ${({ theme }) => theme.color.white};
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
`;

const LogoContainer = styled.div`
    position: relative;
    width: 100%; // Adjusted to take full width

    @media (max-width: 740px) {
        width: 100%;
    }
        
`;

const CityImage = styled.img`
    width: 120%; // Increase the width to make the image larger
    height: auto;
    filter: brightness(30%); // Adjust brightness to make the image darker
    position: relative; // Ensure proper positioning
    left: 50%; // Horizontally center the image
    transform: translateX(-50%); // Adjust for the increased width

    @media (max-width: 740px) {
        display: none;
        
    }
`;

const Logo = styled.img`
    position: absolute;
    left: 50%;
    transform: translate(-50%, -80%);
    z-index: 10; // Ensure logo is on top
    width: 60%; // Adjust logo size as needed
    height: auto;

    @media (max-width: 740px) {
        width: 100%;
    }
`;

const Tagline = styled.span`
    font-family: ${({ theme }) => theme.font.family.primary};
    font-size: ${({ theme }) => theme.font.size.l};
    position: relative;
    top: -26%;

    @media (max-width: 740px) {
        font-size: 1.2rem;
        top: 2%;
        padding-left: 1.5rem;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.7);
    }

    @media (min-width: 601px) and (max-width: 1024px) {
        font-size: 1.5rem;
        top: -7%;
        padding-left: 2.7rem;
        text-align: center;
    }
`;
