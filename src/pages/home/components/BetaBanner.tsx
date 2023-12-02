import React from 'react'
import styled from 'styled-components'

const BetaBanner: React.FC = () => {
  return (
    <StyledBetaBanner>
        <span className = 'beta-banner-text'>
            This application is currently in ALPHA. Many features are still in development and will have bugs. v0.0.6
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

    @media (max-width: 600px) {
        font-size: 0.9rem;
    }

    @media (max-width: 1240px){
        font-size: 1rem;
    }
`