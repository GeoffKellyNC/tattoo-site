import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../../../../../store/root.reducer'
import { UserData } from '../../../../../../store/user/user.reducer'
import { Link, useResolvedPath } from 'react-router-dom'
import { useMobileCheck } from '../../../../../../hooks/isMobile'

import {HiOutlineHomeModern} from 'react-icons/hi2'
import {TbGitPullRequest} from 'react-icons/tb'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { RiUserSettingsLine } from 'react-icons/ri'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { SiNginxproxymanager } from 'react-icons/si'
import { ImHammer2 } from "react-icons/im";
import { MdOutlineWorkOutline } from "react-icons/md";



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

    const isMobile = useMobileCheck()


  return (
    <SideMenuStyled className = 'LOOKHERE' id = {isMobile ? 'is-mobile' : null}>
        <span className = 'logo'>
            {
                accountType
            }
        </span>
        <div className = 'menu-container'>
            <span className = 'menu-title'>{userData.user_name}</span>
            <div className = 'link-container'>
                <Link to = {`${url}`} className = 'menu-item'>
                    <HiOutlineHomeModern className = 'menu-icon' />
                    <span>Home</span>
                </Link>

                {
                    accountType === 'client' ? (
                        <>
                            <Link to={`${url}/posted-jobs`} className = 'menu-item'>
                                <TbGitPullRequest className = 'menu-icon' />
                                <span>My Requests </span>
                            </Link>
                            <Link to={`${url}/client-accepted-jobs`} className = 'menu-item'>
                                <MdOutlineWorkOutline className = 'menu-icon' />
                                <span> Accepted Jobs </span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to = {`${url}/artists-jobs`} className = 'menu-item'>
                                <ImHammer2 className = 'menu-icon' />
                                <span> Bids </span>
                            </Link>
                            <Link to = {`${url}/artist-accepted-jobs`} className = 'menu-item'>
                                <FaRegMoneyBillAlt className = 'menu-icon' />
                                <span> My Jobs </span>
                            </Link>
                        </>
                    )
                }
                <Link to = {accountType === 'artist' ? `${url}/artist-settings` : `${url}/client-settings`} className='menu-item'>
                    <RiUserSettingsLine className = 'menu-icon'  />
                    <span> Settings </span>
                </Link>
                {
                    userRole === 'admin' && (
                        <Link to={`${url}/admin-panel`} className = 'menu-item'>
                            <MdOutlineAdminPanelSettings className = 'menu-icon'  />
                            <span>Admin</span>
                        </Link>
                    )
                }
                {
                    userRole === 'mod' || userRole === 'admin' && (
                        <span className = 'menu-item'>
                            <SiNginxproxymanager className = 'menu-icon'  />
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

    span {
        font-family: ${pr => pr.theme.font.family.primary};
    }

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

        @media (max-width: 1000px) {
            flex-direction: row; /* Align icons in a row */
            flex-wrap: wrap; /* Allow wrapping if there are many icons */
            justify-content: center; /* Center the icons */
            gap: 30px; /* Adjust gap between icons */
            padding-top: 0; /* Adjust padding as needed */
            border: none; /* Remove border */
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

        &active, &:hover {
            color: #fff;
        }

        @media (max-width: 1000px) {
            font-size: 2rem; /* Adjust font size for mobile */
            border: 1px solid white;
            padding: 5px;
            width: 10rem;
            justify-content: center;
            border-radius: 5px;
            background-color: #24273b;

            .menu-icon {
                font-size: 2rem; /* Adjust icon size for mobile */

                @media (max-width: 1000px) {
                    color: #efcb03; /* Adjust icon color for mobile */
                }
            }

            span {
                font-size: 1rem;
            }
        }
    }

    @media (max-width: 1000px) {
        width: 100%; /* Adjust the width for mobile view */
        border-right: none; /* Optional: Remove border for mobile view */

        .logo, .menu-title {
            display: none; /* Hide logo and menu title on mobile */
        }
    }
`;
