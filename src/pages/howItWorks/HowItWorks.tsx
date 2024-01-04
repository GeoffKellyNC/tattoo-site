import React, { useState } from 'react'
import styled from 'styled-components'

import ClientHowItWorks from './ClientHowItWorks'
import ArtistHowItWorks from './ArtistHowItWorks'

const HowItWorks: React.FC = () => {
    const [viewToggle, setViewToggle] = useState<string>('client')

    const handleSwitch = (view: string) => {
        switch(view) {
            case 'client':
                setViewToggle('client')
                return
            case 'artist':
                setViewToggle('artist')
                return
            default:
                return
        }
    }
        


  return (
    <PageContainer>
        <Header>
            <span className = 'header-text'>
                This is how Linkd works for <span> {viewToggle === 'client' ? 'Clients' : 'Artists'} </span>
            </span>
        </Header>
        <SliderContainer viewToggle = {viewToggle}>
            <div className = 'slider client-slider' onClick = {() => handleSwitch('client')}>
                Client's
            </div>
            <div className = 'slider artist-slider' onClick = {() => handleSwitch('artist')}>
                Artist's
            </div>
        </SliderContainer>
        {
            viewToggle === 'client' ? <ClientHowItWorks /> : null
        }
        {
            viewToggle === 'artist' ? <ArtistHowItWorks /> : null
        }
    </PageContainer>
  )
}

export default HowItWorks


const PageContainer = styled.div`
    width: 80%;
    margin: 0 auto;


`

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    color: white;
    margin-top: 5rem;

    @media (max-width: 768px) {
        margin-top: 2rem;
    }

    .header-text {
        font-family: ${pr => pr.theme.font.family.secondary};
        font-size: 5rem;
        font-weight: 600;
        width: 50%;
        text-align: center;

        span {
            color: ${pr => pr.theme.color.red};
        }

        @media (max-width: 768px) {
            font-size: 2rem;
            width: 100%;
            margin-top: 0;
        }
    }



`

const SliderContainer = styled.div<{viewToggle: string}>`
    color: white;
    display: flex;
    width: 100%;
    font-family: ${pr => pr.theme.font.family.secondary};
    align-items: center;
    justify-content: center;
    margin-top: 1rem;

    @media (max-width: 768px) {
        align-items: center;
    }


    .slider {
        border: 1px solid white;
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2rem;
        font-size: 1.5rem;

        @media (max-width: 768px) {
            width: 50%;
            margin-top: 1rem;
        }
    }

    .client-slider {
        border-radius: 1rem 0 0 1rem;
        cursor: pointer;
        background-color: ${pr => pr.viewToggle === 'client' ? pr.theme.color.red : ''};


        &:hover {
            cursor: pointer;
        }
    }

    .artist-slider {
        border-radius: 0 1rem 1rem 0;
        cursor: pointer;
        background-color: ${pr => pr.viewToggle === 'artist' ? pr.theme.color.red : ''};

        &:hover {
            cursor: pointer;
        }
    }


`