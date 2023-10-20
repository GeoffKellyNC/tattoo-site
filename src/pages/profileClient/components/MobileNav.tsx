import React from 'react';
import styled from 'styled-components';

interface MobileNavProps {
    logoutUser: () => Promise<void>;
    setMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav: React.FC<MobileNavProps> = ({ logoutUser, setMobileNavOpen }) => {
    const handleCloseNav = () => {
        setMobileNavOpen(false);
    };

    return (
        <NavContainer className="open"> {/* Remove className "open" for closed state */}
            <CloseButton onClick={handleCloseNav}>&times;</CloseButton>
            <NavList>
                <NavItem>
                    <a href="#" onClick={() => logoutUser()}>Logout</a>
                </NavItem>
                {/* Add more links as required */}
            </NavList>
        </NavContainer>
    );
}

const NavContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0; /* Adjusted to start from the right side */
    width: 300px; /* Increased width */
    height: 100%;
    background-color: #ffae00;
    padding: 20px;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    transform: translateX(100%); /* Adjusted for right side */
    transition: transform 0.3s ease-out;
    z-index: 10;

    &.open {
        transform: translateX(0);
    }
`;

const NavList = styled.ul`
    list-style-type: none;
    padding: 0;
    font-family: ${pr => pr.theme.font.family.primary}; /* Using theme's font family */
`;

const NavItem = styled.li`
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 600;

    a {
        text-decoration: none;
        color: black;
        padding: 5px 10px;
        border-radius: 5px;
        transition: background-color 0.3s;

        &:hover {
            background-color: white;
            color: #ffae00;
        }
    }
`;

const CloseButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 24px;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    color: white;
    transition: color 0.3s;

    &:hover {
        color: black;
    }
`;

export default MobileNav;
