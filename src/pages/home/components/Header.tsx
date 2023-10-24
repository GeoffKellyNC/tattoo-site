import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import headerVideo from '../../../assets/video/mobile3.mp4'
import mobileHeaderVideo from '../../../assets/video/mobile3.mp4'

const Header: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);


    useEffect(() => {
        const checkScreenWidth = () => {
            if (window.innerWidth < 1024) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
    
        // Check screen width on initial render
        checkScreenWidth();
    
        window.addEventListener('resize', checkScreenWidth);
    
        return () => {
            window.removeEventListener('resize', checkScreenWidth);
        }
    }, []);
    

    return (
        <HeaderStyled>
            {isMobile ? (
                <video     key={isMobile ? 'mobile' : 'desktop'}
                    autoPlay 
                    muted 
                    loop 
                    className="background-video"
                    playsInline
                    preload="auto">
                    <source src={mobileHeaderVideo} type="video/mp4" />
                </video>
            ) : (
                <video     key={isMobile ? 'mobile' : 'desktop'}
                    autoPlay 
                    muted 
                    loop 
                    className="background-video"
                    playsInline
                    preload="auto">
                    <source src={headerVideo} type="video/mp4" />
                </video>
            )}
            <div className="title-section">
                <span className='title'>L</span>
                <span className='title linked-i'>I</span>
                <span className='title'>NK'D</span>
            </div>
            <div className = 'header-top'>
                <span className = 'tag'> From Concept to Canvas: Get LInk'd. </span>
            </div>
        </HeaderStyled>
    );
}

export default Header;

const HeaderStyled = styled.div`
    position: relative;
    z-index: 0;
    text-align: center;
    color: ${pr => pr.theme.color.white};
    height: 100vh;
    overflow: hidden;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);  // Semi-transparent black background
        z-index: -1;
    }

    .background-video {
        position: absolute;
        top: 10%;
        left: 50%;
        width: auto;
        height: auto;
        z-index: -1;
        transform: translate(-50%, -50%);
        opacity: 0.9;
        object-fit: cover;
    }

    .title-section {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 0;
        margin-top: 5rem;
    }

    .title, .linked-i {
        font-family: ${pr => pr.theme.font.family.logo};
        margin: 0;
    }

    .title {
        font-size: ${pr => pr.theme.font.size.title}; 
    }

    .linked-i {
        font-size: 15rem;
        color: ${pr => pr.theme.color.pink};
    }

    .header-top {
        margin-top: 0rem;
    }

    .tag {
        font-family: ${pr => pr.theme.font.family.primary};
        font-size: ${pr => pr.theme.font.size.l};
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

        .background-video {
            object-fit: cover;  
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

        .background-video {
            object-fit: cover;  
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

