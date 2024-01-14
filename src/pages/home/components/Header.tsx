import React, { useState } from 'react';
import styled from 'styled-components';
import Background from './Background';

import ArtistFree from '../../../components/modals/ArtistFree';

const linkdLogo = 'https://storage.googleapis.com/tattoo-user-uploaded-images/app-images/logo/linkd-logo.png'


const Header: React.FC = () => {
    const [showModal, setShowModal] = useState(true);
    return (
        <HeaderContainer>
            {showModal && <ArtistFree setShowModal={setShowModal} />}
            <Background />
            <LogoContainer>
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
    width: 100%;
`;

const LogoContainer = styled.div`
    position: relative;
    width: 100%; // Adjusted to take full width

    @media (max-width: 740px) {
        width: 100%;
    }
        
`;


const Logo = styled.img`
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10; // Ensure logo is on top
    width: 60%; // Adjust logo size as needed
    height: auto;

    @media (max-width: 740px) {
        transform: translate(-50%, -50%);
        width: 100rem;
    }
`;

const Tagline = styled.span`
    font-family: ${({ theme }) => theme.font.family.primary};
    font-size: ${({ theme }) => theme.font.size.l};
    position: relative;
    top: 32%;



    @media(max-width: 1024px) {
        font-size: 1.5rem;
        top: 13%;
        text-align: center;
        font-family: ${({ theme }) => theme.font.family.secondary};
    }
`;
