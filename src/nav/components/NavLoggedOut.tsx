import React from 'react'
import styled from 'styled-components'

interface Props {
    handleLogin: () => void,
    handleRegister: () => void
}

const NavLoggedOut: React.FC<Props> = ({
    handleLogin,
    handleRegister
}) => {
  return (
    <LoggedOutNavContainer>
        <div className = 'link-container'>
            <span className = 'link' onClick = {handleLogin}>Login</span>
            <span className = 'link' onClick = {handleRegister}>Register</span>
        </div> 
    </LoggedOutNavContainer> 
  )
}

export default NavLoggedOut

const LoggedOutNavContainer = styled.div`
    display: flex;
    align-items: center;
    font-family: ${pr => pr.theme.font.family.primary};

    .link-container {
        display: flex;
        gap: 1.5rem; /* spacing between links */

        .link {
            cursor: pointer;
            font-weight: 500; /* slightly bold for emphasis */
            padding: 0.5rem 1rem; /* clickable area */
            border-radius: 4px; /* rounded corners */
            transition: background-color 0.25s ease, transform 0.15s ease; /* smooth transitions */

            &:hover {
                background-color: rgba(255,20,147, 0.5); /* subtle highlight on hover */
                transform: translateY(-2px); /* subtle lift on hover */
            }
        }
    }
`;
