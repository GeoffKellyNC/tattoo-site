import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../../../../../store/root.reducer'
import { ProfileImageType } from '../../../../../../store/user/types/userStateTypes'

interface Props {
    profileImage: ProfileImageType | null
}


const MessageBox: React.FC<Props> = ({
    profileImage
}) => {
  return (
    <MessageBoxStyled>
        <div className = 'message-menu'>
            <span className = 'message-menu-item'> Inbox </span>
            <span className = 'message-menu-item'> Sent </span>
            <span className = 'message-menu-item'> Compose </span>
        </div>
        <div className = 'message-main'>
            <img src={profileImage?.image_url} className="message-img" />
            <textarea className="message-textarea" placeholder="This Feature is coming soon!"></textarea>
        </div>
    </MessageBoxStyled>
  )
}

const mapStateToProps = (st: RootState) => ({
    profileImage: st.profileImages
})


const ConnectedMessageBox = connect(mapStateToProps, null)(MessageBox)

export default ConnectedMessageBox


const MessageBoxStyled = styled.div`
    background-color: #151728;
    border-radius: 4px;

    .message-menu {
        padding: 20px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #272a3a;
        gap: 20px;
        font-family: "Source Sans Pro", sans-serif;
    }

    .message-menu-item {
        color: #fff;

        &:hover {
            cursor: pointer;
            color: #3c3f52;
        }

        &.active {
            color: #3c3f52;
        }
    }

    .message-main {
        padding: 0 20px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #272a3a;
        padding-bottom: 20px;
        flex-wrap: wrap;
    }

    .message-img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 20px;
    }

    .message-textarea {
        flex-grow: 1;
        background-color: transparent;
        border: none;
        resize: none;
        margin-top: 15px;
        color: #fff;
        max-width: calc(100% - 70px);
    }
`