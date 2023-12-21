import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as userActions from '../../store/user/user.actions'
import { RootState } from '../../store/root.reducer'

import { BiMenu } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'

import { BiHomeHeart } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";
import { PiUsersFourFill } from "react-icons/pi";
import { FaMoneyBill1 } from "react-icons/fa6";
import { UserData } from '../../store/user/user.reducer'




interface Props {
    logoutUser: () => Promise<void>
    isAuthenticated: boolean,
    accountType: string,
    userData: UserData
}


const MobileNav: React.FC<Props> = ({
    logoutUser,
    isAuthenticated,
    accountType,
    userData
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
        nav(`/user/client/${userData.unxid}`)
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
                <div className = 'link-container'>
                    <div className = 'nav-item-container'>
                        <BiHomeHeart size = {'2rem'} className = 'icon'  />
                        <span onClick={handleHomeClick}  className = 'nav-item'> Home </span>
                    </div>
                    {
                        !isAuthenticated ? (
                            <>
                                <span onClick={handleLoginClick} className = 'nav-item'>Login</span>
                                <span onClick={handleRegisterClick} className = 'nav-item'>Register</span>
                            </>
                        ) : (
                            <>
                                <div className = 'nav-item-container'>
                                    <TbLogout2 size = {'2rem'} className = 'icon' />
                                    <span onClick = {handleLogout} className = 'nav-item'>Logout</span>
                                </div>
                                <div className = 'nav-item-container'>
                                    <PiUsersFourFill size = {'2rem'} className = 'icon' />
                                    <span onClick = {handleUserList} className = 'nav-item'>View Users</span>
                                </div>
                                {
                                    accountType === 'artist' && (
                                    <div className = 'nav-item-container'>
                                        <FaMoneyBill1 size = {'2rem'} className = 'icon' />
                                        <span onClick = {handlePostedJobs} className = 'nav-item'>Posted Jobs</span>
                                    </div>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
            )
        }
    </MobileNavStyled>
  )
}

const mapStateToProps = ( st: RootState) => ({
    isAuthenticated: st.isAuthenticated,
    accountType: st.userData.account_type,
    userData: st.userData
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
    top: -16px;
    right: -9px;
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
    display: flex;
    background-color: #151728;
    padding: 20px;
    transition: transform 0.3s ease-in-out;
    transform: translateX(${props => props.menuOpen ? '0' : '-100%'}); 
  }


  .link-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 5rem;
    gap: 3rem;
  }

    .nav-item-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

  .nav-item {
    margin: 10px 0;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 10px 20px;
    width: 100%;
    transition: background-color 0.3s ease;
    font-family: ${pr => pr.theme.font.family.secondary};

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  .icon {
    color: ${pr => pr.theme.color.pink};
  }


`;

