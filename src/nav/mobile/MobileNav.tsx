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

  return (
    <MobileNavStyled>
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

const MobileNavStyled = styled.div`
    color: white;
    z-index: 100;
 
    height: 100vh;


    .nav-icon {
        position: absolute;
        top: -16px;
        right: 1px;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1000;
        padding: 10px;
    }

    .close-icon {
        color: white;
        z-index: 1000;
        position: absolute;
        top: 150%;
        right: 22rem;
    }




    .nav-body {
        height: 100vh;
        width: 100vw;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba( 0, 0, 0, 0.8 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        border-radius: 10px;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }

    .nav-item {
        margin-bottom: 20px;
        font-size: 3rem;
        cursor: pointer;
        font-family: "DM Sans", sans-serif;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    }

`