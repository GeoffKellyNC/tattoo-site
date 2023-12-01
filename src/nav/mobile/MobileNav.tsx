import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as userActions from '../../store/user/user.actions'
import { RootState } from '../../store/root.reducer'

import { BiMenu } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'


interface Props {
    logoutUser: () => Promise<void>
    isAuthenticated: boolean
}


const MobileNav: React.FC<Props> = ({
    logoutUser,
    isAuthenticated
}) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const nav = useNavigate()

    const handleLoginClick = () => {
        nav('/login')
        setMenuOpen(false)
    }

    const handleRegisterClick = () => {
        nav('/register')
        setMenuOpen(false)
    }

    const handleHomeClick = () => {
        nav('/')
        setMenuOpen(false)
    }

    const handleLogout = () => {
        logoutUser()
    }

    const handleUserList = () => {  
        nav('/user-list')
        setMenuOpen(false)
    }

    const handlePostedJobs = () => {
        nav('/artist/all-active-jobs')
        setMenuOpen(false)
    }


  return (
    <MobileNavStyled menuOpen = {menuOpen}>
        <div className = 'nav-icon'>
            { menuOpen ? (
            <AiOutlineClose 
                className = 'close-icon'
                onClick = {() => setMenuOpen(false)}
                size = {'3rem'}/>
                ) :(
             <BiMenu 
                onClick = {() => setMenuOpen(true)}
                size = {'4rem'} />)}
        </div>
        {
            !menuOpen ? null : (
            <div className = 'nav-body'>
                <span onClick={handleHomeClick}  className = 'nav-item'>Home</span>
                {
                    !isAuthenticated ? (
                        <>
                            <span onClick={handleLoginClick} className = 'nav-item'>Login</span>
                            <span onClick={handleRegisterClick} className = 'nav-item'>Register</span>
                        </>
                    ) : (
                        <>
                            <span onClick = {handleLogout} className = 'nav-item'>Logout</span>
                            <span onClick = {handleUserList} className = 'nav-item'>View Users</span>
                            <span onClick = {handlePostedJobs} className = 'nav-item'>View Posted Jobs</span>
                        </>
                    )
                }
            </div>
            )
        }
    </MobileNavStyled>
  )
}

const mapStateToProps = ( st: RootState) => ({
    isAuthenticated: st.isAuthenticated
}) 

const ConnectedMobileNav = connect(mapStateToProps, {
    logoutUser: userActions.logoutUser
})(MobileNav)

export default ConnectedMobileNav



const MobileNavStyled = styled.div<{ menuOpen: boolean }>` 
  color: white;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  .nav-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    padding: 10px;
    z-index: 1100;
  }

  .close-icon {
    color: white;
    font-size: 2.5rem;
  }

  .nav-body {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #151728;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    transition: transform 0.3s ease-in-out;
    transform: translateX(${props => props.menuOpen ? '0' : '-100%'}); 
  }

  .nav-item {
    margin: 10px 0;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 10px 20px;
    text-align: center;
    width: 100%;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

