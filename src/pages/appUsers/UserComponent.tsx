import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserFullProfile } from '../../store/user/types/userStateTypes';

import { IoLogoDiscord } from 'react-icons/io5';
import { PiInstagramLogoFill } from 'react-icons/pi';
import { FaSquareSnapchat } from 'react-icons/fa6';
import { RiTwitterXFill } from 'react-icons/ri';
import { CgWebsite } from 'react-icons/cg';


// Social Icons: 
const discordIcon = <IoLogoDiscord size = {'2rem'} />
const instagramIcon = <PiInstagramLogoFill size = {'2rem'} />
const snapchatIcon = <FaSquareSnapchat size = {'2rem'} />
const xIcon = <RiTwitterXFill size = {'2rem'} />
const webIcon = <CgWebsite size = {'2rem'} />



const DEFAULT_PROFILE_PIC = "https://storage.googleapis.com/tattoo-user-uploaded-images/profile-images/default.png";



const UserComponent: React.FC<{ user: UserFullProfile }> = ({ user }) => {
    const nav = useNavigate()

    const handleNav = () => {
        nav(`/user/view/${user.unxid}`)
        return
    }

    return (
        <UserContainer onClick = {handleNav}>
        <ProfilePic 
            src={user.profileImageUrl || DEFAULT_PROFILE_PIC}
            alt={`${user.first_name} ${user.last_name}`}
            online={user.online_status === 'online'}
        />
        <UserDetails>
            <UserName>{user.user_name}</UserName>
            <Location>{ `${user.location_city ? user.location_city : "Somewhere"}, ${user.location_state ? user.location_state : 'Earth'} ` }</Location>
            <Name>{user.first_name}</Name>
            <AccountType>{user.account_type}</AccountType>
            <ProfileTagline>{user.profile_tagline}</ProfileTagline>
            <SocialIcons>
                {user.contact_discord.public && <span className = 'icon'>{discordIcon}</span>}
                {user.contact_instagram.public && <span className = 'icon'>{instagramIcon}</span>}
                {user.contact_snapchat.public && <span className = 'icon'>{snapchatIcon}</span>}
                {user.contact_x.public && <span className = 'icon'>{xIcon}</span>}
                {user.contact_website.public && <span className = 'icon'>{webIcon}</span>}
            </SocialIcons>
        </UserDetails>
    </UserContainer>
    );
}

export default UserComponent;


const UserContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px; 
    height: 450px;
    margin: 1rem;
    padding: 1rem;
    color: ${props => props.theme.color.white};
    border: 1px solid ${props => props.theme.color.gray};
    transition: background 0.3s;
    font-family: ${props => props.theme.font.family.primary};
    &:hover {
        background: ${props => props.theme.color.lightGray};
        cursor: pointer;
    }


    &:hover {
        border: 1px solid ${props => props.theme.color.pink};
        scale: 1.1;
        border-radius: 10px;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const ProfilePic = styled.img<{ online: boolean }>`
    width: 13rem;
    height: 13rem;
    border-radius: 50%;
    border: 3px solid ${props => props.online ? 'green' : 'red'};
    margin-bottom: 1rem;
`;

const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const UserName = styled.span``;

const Name = styled.span``;

const Location = styled.span``;

const AccountType = styled.span``;

const ProfileTagline = styled.span`
    margin-bottom: 0.5rem;
`;

const SocialIcons = styled.div`
    display: flex;
    gap: 0.5rem;  // space between icons
    margin-top: auto;  // push icons to the bottom
    align-self: stretch; // ensure the container spans the full width of UserDetails
    justify-content: center; // center the icons if there are only a few

    .icon {
        height: 25px;
        width: 30px;
    }
`;