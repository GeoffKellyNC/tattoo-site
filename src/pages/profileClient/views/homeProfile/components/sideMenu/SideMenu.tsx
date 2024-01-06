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
import { GiArtificialIntelligence } from "react-icons/gi";




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
                {  !isMobile &&
                    <Link to = {`${url}`} className = 'menu-item'>
                        <HiOutlineHomeModern className = 'menu-icon' />
                        <span>Home</span>
                    </Link>
                }
                {
                    accountType === 'client' ? (
                        <>
                            <Link to={`${url}/posted-jobs`} className = 'menu-item client-request-btn'>
                                <TbGitPullRequest className = 'menu-icon' />
                                <span>My Requests </span>
                            </Link>
                            <Link to={`${url}/client-accepted-jobs`} className = 'menu-item client-jobs-btn'>
                                <MdOutlineWorkOutline className = 'menu-icon' />
                                <span> Accepted Jobs </span>
                            </Link>
                            <Link to={``} className = 'menu-item client-tools-btn'>
                                <GiArtificialIntelligence className = 'menu-icon' />
                                <span> Coming Soon </span>
                            </Link>
                        </>
                    ) : (


                        <>
                            <Link to = {`${url}/artists-jobs`} className = 'menu-item artist-bid-btn'>
                                <ImHammer2 className = 'menu-icon' />
                                {isMobile && <img width="20" height="20" src="https://img.icons8.com/stencil/32/000000/auction.png" alt="auction"/>}
                                <span> My Bids </span>
                            </Link>
                            <Link to = {`${url}/artist-accepted-jobs`} className = 'menu-item artist-job-btn'>
                                <FaRegMoneyBillAlt className = 'menu-icon' />
                                {isMobile && <img width="20" height="20" src="https://img.icons8.com/3d-fluency/94/work.png" alt="work"/>}
                                <span> My Jobs </span>
                            </Link>
                            <Link to={``} className = 'menu-item artist-tool-btn'>
                                <GiArtificialIntelligence className = 'menu-icon' />
                                <span> Coming Soon </span>
                            </Link>
                        </>
                    )

                }
                <Link to = {accountType === 'artist' ? `${url}/artist-settings` : `${url}/client-settings`} className='menu-item settings-btn'>
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

    @media (max-width: ${pr => pr.theme.media.tablet}) {
        background-color: transparent;
    }

    span {
        font-family: ${pr => pr.theme.font.family.secondary};
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

        @media (max-width: ${pr => pr.theme.media.tablet}) {
            flex-direction: row; /* Align icons in a row */
            flex-wrap: wrap; /* Allow wrapping if there are many icons */
            justify-content: center; /* Center the icons */
            gap: 10px; /* Adjust gap between icons */
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
        font-family: ${pr => pr.theme.font.family.secondary};
        font-weight: 600;
        cursor: pointer;

        &active, &:hover {
            color: #fff;
        }

        @media (max-width: 1000px) {
            font-size: 2rem; /* Adjust font size for mobile */
            border: none;
            padding: 5px;
            width: 47%;
            justify-content: center;
            border-radius: 5px;

            .menu-icon {
                font-size: 2rem; /* Adjust icon size for mobile */

                @media (max-width: 1000px) {
                    display: none; /* Hide icons on mobile */
                    
                }
            }

            span {
                font-size: 1rem;
            }
        }
    }

    .client-request-btn {
        @media (max-width: ${pr => pr.theme.media.tablet}) {
            background: linear-gradient(305deg, #0066CC 80%, #bdc6ff 100%);
            color: white;
        }
    }

    .client-jobs-btn {
        @media (max-width: ${pr => pr.theme.media.tablet}) {
            background: linear-gradient(305deg, #fc007e 80%, #ffffff 100%);
            color: white;
        }
    }

    .client-tools-btn {
        @media (max-width: ${pr => pr.theme.media.tablet}) {
            background: linear-gradient(305deg, #1cba07 80%, #ffffff 100%);
            color: white;
        }
    }

    .settings-btn {
        @media (max-width: ${pr => pr.theme.media.tablet}) {
            background: linear-gradient(305deg, #a907ef 80%, #ffffff 100%);
            color: white;
        }
    }

    .artist-bid-btn {
        @media (max-width: ${pr => pr.theme.media.tablet}) {
            background: linear-gradient(305deg, #0066CC 80%, #bdc6ff 100%);
            color: white;
        }
    }

    .artist-job-btn {
        @media (max-width: ${pr => pr.theme.media.tablet}) {
            background: linear-gradient(305deg, #fc007e 80%, #ffffff 100%);
            color: white;
        }
    }

    .artist-tool-btn {
        @media (max-width: ${pr => pr.theme.media.tablet}) {
            background: linear-gradient(305deg, #1cba07 80%, #ffffff 100%);
            color: white;
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



// <!--1️⃣ code CSS below -->

// <style>
// @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Koulen&family=Lato&family=Nunito&family=Playfair+Display:ital@1&family=Prata&family=Raleway:ital,wght@1,100&family=Roboto&family=Roboto+Condensed&family=Teko&display=swap');

// .btn{

// font-family: Roboto, sans-serif;
// font-weight: 0;
// font-size: 14px;
// color: #fff;
// background: linear-gradient(305deg, #0066CC 73%, #bdc6ff 100%);
// padding: 10px 30px;
// border: none;
// box-shadow: rgb(0, 0, 0) 0px 0px 0px 0px;
// border-radius: 5px;
// transition : 1000ms;
// transform: translateY(0);
// display: flex;
// flex-direction: row;
// align-items: center;
// cursor: pointer;
// }

// .btn:hover{

// transition : 1000ms;
// padding: 10px 50px;
// transform : translateY(-0px);
// background: linear-gradient(305deg, #0066CC 73%, #bdc6ff 100%);
// color: #0066cc;
// border: solid 2px #0066cc;
// }

// </style>

// <!-- 2️⃣code HTML below -->

// <button class="btn"></button>