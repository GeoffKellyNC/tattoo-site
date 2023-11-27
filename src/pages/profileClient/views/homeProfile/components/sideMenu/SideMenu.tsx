import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../../../../../store/root.reducer'
import { UserData } from '../../../../../../store/user/user.reducer'
import { Link, useResolvedPath } from 'react-router-dom'

import {HiOutlineHomeModern} from 'react-icons/hi2'
import {TbGitPullRequest} from 'react-icons/tb'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { RiUserSettingsLine } from 'react-icons/ri'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { SiNginxproxymanager } from 'react-icons/si'

interface Props {
    userData: UserData,
    accountType: string,
    userRole: string
}

const SideMenu: React.FC<Props> = ({
    userData,
    accountType,
    userRole
}) => {

    const url = useResolvedPath("").pathname;

  return (
    <SideMenuStyled className = 'LOOKHERE'>
        <span className = 'logo'>
            {
                accountType
            }
        </span>
        <div className = 'menu-container'>
            <span className = 'menu-title'>{userData.user_name}</span>
            <div className = 'link-container'>
                <Link to = {`${url}`} className = 'menu-item'>
                    <HiOutlineHomeModern />
                    <span>Home</span>
                </Link>

                {
                    accountType === 'client' ? (
                        <Link to={`${url}/posted-jobs`} className = 'menu-item'>
                            <TbGitPullRequest />
                            <span>My Requests </span>
                        </Link>
                    ) : (
                        <Link to = {`${url}/artists-jobs`} className = 'menu-item'>
                            <FaRegMoneyBillAlt />
                            <span>Tattoo Requests</span>
                        </Link>
                    )
                }

                <span className = 'menu-item'>
                    <RiUserSettingsLine />
                    <span>Settings</span>
                </span>
                {
                    userRole === 'admin' && (
                        <span className = 'menu-item'>
                            <MdOutlineAdminPanelSettings />
                            <span>Admin</span>
                        </span>
                    )
                }
                {
                    userRole === 'mod' || userRole === 'admin' && (
                        <span className = 'menu-item'>
                            <SiNginxproxymanager />
                            <span>Moderate</span>
                        </span>
                    )
                }
            </div>
        </div>
    </SideMenuStyled>
  )
}

const mapStateToProps = (st: RootState) => ({
    userData: st.userData,
    accountType: st.accountType,
    userRole: st.userRole
});

const ConnectedSideMenu = connect(mapStateToProps, null)(SideMenu);

export default ConnectedSideMenu;


const SideMenuStyled = styled.div`
    width: 260px;
    border-right: 1px solid #272a3a;
    display: flex;
    flex-direction: column;
    transition: 0.3s;
    background-color: #151728;
    overflow: auto;
    flex-shrink: 0;

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

        @media (max-width: ${(pr) => pr.theme.media.tablet}) {
            margin-top: 100px;
        }

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
        cursor: pointer;
        flex-shrink: 0;  // Prevents the menu items from shrinking.

        &active, &:hover {
            color: #fff;
        }

        @media (max-width: ${(pr) => pr.theme.media.tablet}) {
            justify-content: center;
            z-index: 1;
            font-size: 2rem;
        }
    }

    @media (max-width: ${(pr) => pr.theme.media.tablet}) {
        width: 70px;  // Slightly increased the width

        .logo {
            display: none;  // Hide the logo
        }

        .menu-title {
            display: none;  // Hide the username
        }

        .menu-item span:last-child {
            display: none;  // Hide the text of each menu item
        }
    }
`;
