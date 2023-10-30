import React from 'react';
import styled from 'styled-components';

const linkdLogo = 'https://storage.googleapis.com/tattoo-user-uploaded-images/app-images/logo/linkd-logo.png'

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <LogoContainer>
                <img src={linkdLogo} alt="linkd logo" />
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
    width: 100%;
    max-width: 800px;
    img {
        width: 100%;
        height: auto;
    }
`;

const Tagline = styled.span`
    font-family: ${({ theme }) => theme.font.family.primary};
    font-size: ${({ theme }) => theme.font.size.l};
    position: relative;
    top: -10rem;



    ${({ theme }) => theme.media.tablet} {
        font-size: ${({ theme }) => theme.font.size.md};
    }
    ${({ theme }) => theme.media.phone} {
        font-size: ${({ theme }) => theme.font.size.sm};
    }
    /* Remove or reduce margin/padding if it exists in the theme for this element */
`;
