/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../../../store/root.reducer'
import { UserData } from '../../../../store/user/user.reducer'

import {HiOutlineHomeModern} from 'react-icons/hi2'
import {TbGitPullRequest} from 'react-icons/tb'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { TbPhotoShare } from 'react-icons/tb'
import { RiUserSettingsLine } from 'react-icons/ri'

interface Props {
    userData: UserData
}

const SideMenu: React.FC<Props> = ({
    userData
}) => {
  return (
    <SideMenuStyled>
        <span className = 'logo'>
            {
                userData.isClient ? 'Client' : 'Artist'
            }
        </span>
        <div className = 'menu-container'>
            <span className = 'menu-title'>{userData.user_name}</span>
            <div className = 'link-container'>
                <span className = 'menu-item'>
                    <HiOutlineHomeModern />
                    <span>Home</span>
                </span>
                <span className = 'menu-item'>
                    {
                        userData.isClient ? (
                            <span className = 'menu-item'>
                                <TbGitPullRequest />
                                <span>My Requests </span>
                            </span>
                        ) : (
                            <span className = 'menu-item'>
                                <FaRegMoneyBillAlt />
                                <span>Tattoo Requests</span>
                            </span>
                        )
                    }
                </span>
                <span className = 'menu-item'>
                    <TbPhotoShare />
                    <span>Photos</span>
                </span>
                <span className = 'menu-item'>
                    <RiUserSettingsLine />
                    <span>Settings</span>
                </span>
            </div>
        </div>
    </SideMenuStyled>
  )
}

export default connect((st: RootState) => ({
    userData: st.userData
}), null) (SideMenu)

const SideMenuStyled = styled.div`
    width: 260px;
    border-right: 1px solid #272a3a;
    display: flex;
    flex-direction: column;
    transition: 0.3s;
    background-color: #151728;
    overflow: auto;
    flex-shrink: 0;
    margin-top: 5rem;

    .logo {
        font-family: "DM Sans", sans-serif;
        font-size: 15px;
        color: #fff;
        font-weight: 600;
        text-align: center;
        height: 68px;
        line-height: 68px;
        letter-spacing: 4px;
        position: sticky;
        top: 0;
        background: linear-gradient(to bottom, #151728 0%, #151728 76%, rgba(21, 23, 40, 0) 100%);
    }

    .menu-container {
        padding: 30px;
    }

    .menu-title {
        font-family: "DM Sans", sans-serif;
        color: #5c5e6e;
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 20px;
        text-transform: uppercase;
    }

    .link-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        gap: 20px;
        font-size: 15px;
        white-space: nowrap;
        padding-top: 10px;
        border-bottom: 1px solid #272a3a;

    }

    .menu-item {
        text-decoration: none;
        color: #9c9cab;
        display: flex;
        align-items: center;
        gap: 10px;
        text-transform: capitalize;
        font-size: 1rem;
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 600;
    }

`