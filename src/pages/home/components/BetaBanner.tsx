import React from 'react'
import styled from 'styled-components'

const BetaBanner: React.FC = () => {
  return (
    <StyledBetaBanner>
        <span className = 'beta-banner-text'>
            This application is currently in BETA. Many features are still in development and will have bugs. v0.1.4. For any questions or bugs please email: <a href = 'mailto:support@getlinkd.ink'> support@getlinkd.ink </a>
        </span>
    </StyledBetaBanner>
  )
}

export default BetaBanner


const StyledBetaBanner = styled.div`
    width: 100%;
    background-color: #ff234b;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    font-size: 1.2rem;
    color: white;
    font-family: ${pr => pr.theme.font.family.secondary};

    a {
        color: white;
        text-decoration: none;
        font-weight: 500;
        border-bottom: 1px solid white;
    }

    @media (max-width: 600px) {
        font-size: 0.6rem;
    }

    @media (max-width: 1240px){
        font-size: 0.7rem;
        height: 25px;
    }
`