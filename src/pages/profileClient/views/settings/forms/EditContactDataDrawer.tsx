import React, { useState } from 'react'
import { UserContactProfileType } from '../../../../../store/user/user.reducer'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Drawer } from 'antd';
import * as userActions from '../../../../../store/user/user.actions';

import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaSnapchatSquare } from "react-icons/fa";
import { IoLogoDiscord } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

interface ContactUpdateType {
    contact_phone: {
        value: string;
        public: boolean;
    };
    contact_instagram: {
        value: string;
        public: boolean;
    };
    contact_snapchat: {
        value: string;
        public: boolean;
    };
    contact_discord: {
        value: string;
        public: boolean;
    };
    contact_x: {
        value: string;
        public: boolean;
    };
}


interface Props {
    contactData: UserContactProfileType;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    updateContactInfo: (data: ContactUpdateType) => Promise<boolean>;
}


const EditContactDataDrawer: React.FC<Props> = ({
    contactData,
    isOpen,
    setIsOpen,
    updateContactInfo
  }) => {
    const [values, setValues] = useState({
        phone_number: contactData.contact_phone.value || '', 
        instagram: contactData.contact_instagram.value || '', 
        snapChat: contactData.contact_snapchat.value || '', 
        discord: contactData.contact_discord.value || '', 
        x: contactData.contact_x.value || '', 
      });
  
    const [publicStatus, setPublicStatus] = useState({
      phone_number: contactData.contact_phone.public,
      instagram: contactData.contact_instagram.public,
      snapChat: contactData.contact_snapchat.public,
      discord: contactData.contact_discord.public,
      x: contactData.contact_x.public,
    });
  
    const onChange = (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    };
  
    const onPublicChange = (e) => {
      const { name, value } = e.target;
      setPublicStatus({ ...publicStatus, [name]: value === 'true' ? true : false });
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();

      const fixedData: ContactUpdateType = {
        contact_phone: {
          value: values.phone_number,
          public: publicStatus.phone_number,
        },
        contact_instagram: {
          value: values.instagram,
          public: publicStatus.instagram,
        },
        contact_snapchat: {
          value: values.snapChat,
          public: publicStatus.snapChat,
        },
        contact_discord: {
          value: values.discord,
          public: publicStatus.discord,
        },
        contact_x: {
          value: values.x,
          public: publicStatus.x,
        },
      };

      console.log(fixedData)//!REMOVE
      await updateContactInfo(fixedData);
      setIsOpen(false);
      return;
    };
  
    return (
      <>
        <StyledDrawer
          title="Edit Contact Data"
          placement="right"
          onClose={() => setIsOpen(false)}
          open={isOpen}
          onClick={(e) => e.stopPropagation()}
        >
            <FormContainer>
                <div className="input-container">
                    <div className = 'input-title'>
                        <MdOutlinePhoneAndroid className = 'icon phone-icon' />
                        <span className = 'input-label'> Phone Number </span>
                    </div>
                    <input
                    name="phone_number"
                    value={values.phone_number}
                    onChange={onChange}
                    placeholder="Phone Number"
                    />
                    <select
                        name="phone_number"
                        value={publicStatus.phone_number ? 'true' : 'false'}
                        onChange={onPublicChange}
                        >
                        <option value={"true"}>Public</option>
                        <option value={"false"}>Private</option>
                        </select>
                </div>
                <div className="input-container">
                    <div className = 'input-title'>
                        <RiInstagramFill className = 'icon instagram-icon' />
                        <span className = 'input-label'> Instagram </span>
                    </div>
                    <input
                    name="instagram"
                    value={values.instagram}
                    onChange={onChange}
                    placeholder="Instagram"
                    />
                    <select
                        name="instagram"
                        value={publicStatus.instagram ? 'true' : 'false'}
                        onChange={onPublicChange}
                        >
                        <option value={"true"}>Public</option>
                        <option value={"false"}>Private</option>
                    </select>
                </div>
                <div className="input-container">
                    <div className = 'input-title'>
                        <FaSnapchatSquare className = 'icon snapchat-icon' />
                        <span className = 'input-label'> Snapchat </span>
                    </div>
                    <input
                    name="snapChat"
                    value={values.snapChat}
                    onChange={onChange}
                    placeholder="Snapchat"
                    />
                    <select
                        name="snapChat"
                        value={publicStatus.snapChat ? 'true' : 'false'}
                        onChange={onPublicChange}
                        >
                        <option value={"true"}>Public</option>
                        <option value={"false"}>Private</option>
                    </select>
                </div>
                <div className="input-container">
                    <div className = 'input-title'>
                        <IoLogoDiscord className = 'icon discord-icon' />
                        <span className = 'input-label'> Discord </span>
                    </div>
                    <input
                    name="discord"
                    value={values.discord}
                    onChange={onChange}
                    placeholder="Discord"
                    />
                    <select
                        name="discord"
                        value={publicStatus.discord ? 'true' : 'false'}
                        onChange={onPublicChange}
                        >
                        <option value={"true"}>Public</option>
                        <option value={"false"}>Private</option>
                    </select>
                </div>
                <div className="input-container">
                    <div className = 'input-title'>
                        <FaSquareXTwitter className = 'icon x-icon' />
                        <span className = 'input-label'> X </span>
                    </div>
                    <input
                    name="x"
                    value={values.x}
                    onChange={onChange}
                    placeholder="X"
                    />
                    <select
                        name="x"
                        value={publicStatus.x ? 'true' : 'false'}
                        onChange={onPublicChange}
                        >
                        <option value={"true"}>Public</option>
                        <option value={"false"}>Private</option>
                    </select>
                </div>
                <button onClick={onSubmit} className = 'submit-btn'>Submit</button>
            </FormContainer> 
        </StyledDrawer>
      </>
    );
  };
  

const ConnectedEditContactDataDrawer = connect(null, ({
    updateContactInfo: userActions.updateContactInfo,
}))(EditContactDataDrawer)

export default ConnectedEditContactDataDrawer


const StyledDrawer = styled(Drawer)`
.ant-drawer-header {
    background-color: ${props => props.theme.color.red};
    color: white;
    font-family: ${props => props.theme.font.family.secondary};
    font-size: 2rem; /* Adjust the font size as needed */
    font-weight: 700;
  }

  .ant-drawer-body {
    background-color: rgba(0, 0, 0, 0.9);
    padding: 20px; /* Add padding to the body */
  }
`


const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    .input-title {
        display: flex;
        align-items: center;
        gap: 10px;
        color: white;
        font-size: 1.2rem;
        font-family: ${props => props.theme.font.family.secondary};
    }

    .input-container {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .icon {
            font-size: 1.8rem;
            color: #39ffe3;
        }


        .discord-icon {
            color: #7289da;
        }

        .x-icon {
            color: #1da1f2;
        }

        .instagram-icon {
            color: #c13584;
        }

        .snapchat-icon {
            color: #fffc00;
        }

        .phone-icon {
            color: #00ff00;
        }

        label {
            font-family: ${props => props.theme.font.family.secondary};
            font-size: 1.2rem;
            color: white;
        }

        input {
            border: none;
            border-radius: 5px;
            height: 40px;
            padding-left: 10px;
            font-family: ${props => props.theme.font.family.secondary};
            font-size: 1.2rem;
        }

        select {
            border: none;
            border-radius: 5px;
            height: 40px;
            padding-left: 10px;
            font-family: ${props => props.theme.font.family.secondary};
            font-size: 1.2rem;
        }
    }

    .submit-btn {
        background-color: ${props => props.theme.color.red};
        color: white;
        border: none;
        border-radius: 5px;
        height: 40px;
        padding-left: 10px;
        font-family: ${props => props.theme.font.family.secondary};
        font-size: 1.2rem;
        transition: background-color 0.2s ease-in-out;
        cursor: pointer;

        &:hover {
            background-color: rgba(255, 0, 0, 0.5);
        }
    }

`

