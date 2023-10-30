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

    .about-title {
        font-family: "DM Sans", sans-serif;
        color: #5c5e6e;
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 20px;
    }
    
    .user-text {
        font-family: 'Source Sans Pro', sans-serif;
        color: ${(pr) => pr.theme.color.white};
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5rem;
        margin: 0;
    }
    


`