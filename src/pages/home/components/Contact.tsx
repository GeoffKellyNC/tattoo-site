import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';


import linkdLogo from '../../../assets/linkd-logo.png'

const Contact: React.FC = () => {
  return (
    <StyledContact>
        <LeftContainer>
            <img src={linkdLogo} alt='linkd logo' />
        </LeftContainer>
        <RightContainer>
            <ContactTitle>Contact Us</ContactTitle>
            <SupportEmail>
                <a href='mailto:support@getlinkd.ink'>support@getlinkd.ink</a>
            </SupportEmail>
        </RightContainer>
        <div className = 'quick-links'>
            <NavLink to = '/privacy-policy'>Privacy Policy</NavLink>
            <NavLink to = '/terms-of-service'>Terms of Service</NavLink>
        </div>
    </StyledContact>
  )
}

export default Contact

const StyledContact = styled.div`
    width: 100%;
    padding: 50px 10%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffa04e;
    color: white;
    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
    }

    .quick-links {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        a {
            color: white;
            text-decoration: none;
            font-size: 1.4rem;
            font-family: ${({ theme }) => theme.font.family.secondary};
            &:hover {
                text-decoration: underline;
            }
        }
    }
`;

const LeftContainer = styled.div`
    flex: 1;
    img {
        width: 400px; // Adjust as needed
    }
`;

const RightContainer = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 5rem;

`;

const ContactTitle = styled.h1`
    font-size: 4rem;
    margin-bottom: 10px;
    font-family: ${({ theme }) => theme.font.family.secondary};
`;

const SupportEmail = styled.span`
    font-size: 2rem;
    font-family: ${({ theme }) => theme.font.family.secondary};
    a {
        color: black;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;
