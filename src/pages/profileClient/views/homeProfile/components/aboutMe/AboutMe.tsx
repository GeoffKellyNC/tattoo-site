import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../../../../store/root.reducer'
import styled from 'styled-components'
import { ClientProfileDetailsType } from '../../../../../../store/user/user.reducer'

interface Props {
    details: ClientProfileDetailsType
}


const AboutMe: React.FC<Props> = ({
    details
}) => {
    return (
        <AboutMeStyled>
            <div className = 'lines-container'>
                <div className = 'line'></div>
                <div className = 'line'></div>
                <div className = 'line'></div>
            </div>
            <div className = 'about-title'>
                <span> About Me </span>
            </div>
            <div className = 'text-section'>
                <p className = 'user-text'> {details.profile_description} </p>
            </div>
        </AboutMeStyled>
    )
}

const mapStateToProps = ((st: RootState) => ({
        details: st.userProfileDetails
}));

const ConnectedAboutMe = connect(mapStateToProps, null)(AboutMe)

export default  ConnectedAboutMe


const AboutMeStyled = styled.div`
    padding: 20px;
    background-color: #151728;
    border-radius: 4px;
    margin: 2rem 0;
    height: auto;
    font-family: ${pr => pr.theme.font.family.secondary};

    @media (max-width: ${(pr) => pr.theme.media.tablet}) {
        margin-top: 0;
        background-color: transparent;
    }

    .about-title {
        font-family: "DM Sans", sans-serif;
        color: #5c5e6e;
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 20px;

        @media (max-width: ${(pr) => pr.theme.media.tablet}) {
            color: white;
            font-size: 2rem;
            font-family: ${pr => pr.theme.font.family.secondary};
            width: 30%;
            font-weight: 100;
        }
    }

    .lines-container {
        display: none;

        @media (max-width: ${(pr) => pr.theme.media.tablet}) {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            width: 100%;
        }
    }

    .line {
       display: none;

        @media (max-width: ${(pr) => pr.theme.media.tablet}) {
            display: block;
            width: 100%;
            height: 1px;
            background-color: ${pr => pr.theme.color.red};

            &:nth-child(1) {
                width: 80%;
            }

            &:nth-child(2) {
                width: 60%;
                background: linear-gradient(305deg, #0066CC 80%, #bdc6ff 100%);
            }

            &:nth-child(3) {
                width: 40%;
                background: linear-gradient(305deg, #a907ef 80%, #ffffff 100%);

            }
        }
    }
    
    .user-text {
        font-family: 'Source Sans Pro', sans-serif;
        color: ${(pr) => pr.theme.color.white};
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5rem;
        margin: 0;
        font-family: ${pr => pr.theme.font.family.secondary};

        @media (max-width: ${(pr) => pr.theme.media.tablet}) {
            font-size: 1.2rem;
            font-family: ${pr => pr.theme.font.family.secondary};
            width: 100%;
            font-weight: 100;
        }
    }
    


`