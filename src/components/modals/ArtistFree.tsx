import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import tattooPic from '../../assets/tattoo-modal.jpg'
import linkdLogo from '../../assets/linkd-logo.png'

import { MdClose } from 'react-icons/md'

interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArtistFree: React.FC<Props> = ({
    setShowModal
}) => {
  return (
    <ModalBody>
        <MdClose 
            color = {'white'} 
            size = {'2rem'} 
            className = 'close-icon'
            onClick = {() => setShowModal(false)} />
        <LeftSide>
            <div className = 'header'>
                <img src = {linkdLogo} alt = 'linkd logo' className = 'logo'/>
            </div>
            <div className = 'lines-container'>
                <div className = 'line'></div>
                <div className = 'line'></div>
            </div>
            <div className = 'text-container'>
                <h2> Artists Sign up for Free!</h2>
                <h3> Limited Time </h3>
                <p>
                    To celebrate our launch and new artists to the platform, we are offering free sign up for a limited time. It lasts for life!
                </p>
                <NavLink to = '/register' className = 'sign-up-btn'>
                    Sign Up 
                </NavLink>
            </div>

            <div className = 'lines-container-bottom'>
                <div className = 'line'></div>
                <div className = 'line'></div>
            </div>
        </LeftSide>
        <RightSide></RightSide>
    </ModalBody>
  )
}

export default ArtistFree


const ModalBody = styled.div`
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    width: 100%;
    max-width: 900px;
    height: 100%;
    max-height: 700px;
    z-index: 100000;
    font-family: ${pr => pr.theme.font.family.secondary};
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;


    .close-icon {
        position: absolute;
        top: 20px;
        left: 20px;
        cursor: pointer;
    }

`

const LeftSide = styled.div`
    background: ${pr => pr.theme.color.black};
    height: 100%;
    width: 50%;

    @media(max-width: ${pr => pr.theme.media.tablet}){
        width: 60%
    }

    .logo {
        width: 50%;
        margin: 0 auto;
        display: block;
        padding: 20px 0;
    }

    .text-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h2 {
            color: ${pr => pr.theme.color.white};
            font-size: ${pr => pr.theme.font.size.xl};
            text-align: center;

            @media(max-width: ${pr => pr.theme.media.tablet}){
                font-size: ${pr => pr.theme.font.size.l};
            }
        }

        h3 {
            color: ${pr => pr.theme.color.white};
            font-size: ${pr => pr.theme.font.size.l};
            text-align: center;

            @media(max-width: ${pr => pr.theme.media.tablet}){
                font-size: ${pr => pr.theme.font.size.m};
            }
        }

        p {
            color: ${pr => pr.theme.color.white};
            font-size: ${pr => pr.theme.font.size.m};
            text-align: center;

            @media(max-width: ${pr => pr.theme.media.tablet}){
                font-size: ${pr => pr.theme.font.size.s};
            }
        }
    }


    .lines-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: -60px;
    }

    .lines-container-bottom {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px 0;
    }

    .line {
        width: 100%;
        height: 3px;
        background: ${pr => pr.theme.color.white};
        margin: 10px 0;
    }

    .sign-up-btn {
        background: ${pr => pr.theme.color.red};
        color: ${pr => pr.theme.color.black};
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration: none;
        font-size: ${pr => pr.theme.font.size.s};
        font-family: ${pr => pr.theme.font.family.secondary};
        font-weight: 600;
        transition: all 0.3s ease-in-out;
        margin-top: 20px;

        &:hover {
            background: ${pr => pr.theme.color.black};
            color: ${pr => pr.theme.color.white};
        }
    }

`

const RightSide = styled.div`
    background-image: url(${tattooPic});
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 50%;

    @media(max-width: ${pr => pr.theme.media.tablet}){
        width: 40%
    }

`
