import React, { useState } from 'react'
import { UserData } from '../../../../../store/user/user.reducer'
import { Drawer } from 'antd'
import { connect } from 'react-redux'
import * as userActions from '../../../../../store/user/user.actions'
import styled from 'styled-components'


interface Props {
    userData: UserData,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    updateUserData: (data: {user_email: string | null, display_name: string | null}, type: string) => Promise<boolean>
}

const EditGeneralDrawer: React.FC<Props> = ({
    userData,
    isOpen,
    setIsOpen,
    updateUserData
}) => {
    const [values, setValues] = useState({
        user_email: userData.user_email,
        display_name: userData.display_name
    })

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const isDisplayNameChanged = userData.display_name !== values.display_name;

        const isUserEmailChanged = userData.user_email !== values.user_email;
    
        if (isDisplayNameChanged && isUserEmailChanged) {
            await updateUserData(values, 'both')
            setIsOpen(false);
            return

        } else if (isDisplayNameChanged) {
            await updateUserData(values, 'display_name')
            setIsOpen(false);
            return

        } else if (isUserEmailChanged) {
           await updateUserData(values, 'email')
           setIsOpen(false);
            return
        }

        setIsOpen(false);
        return
    };
    

  return (
    <>
        <StyledDrawer
            title = "Edit General Info"
            placement='right'
            onClose = {() => setIsOpen(false)}
            open = {isOpen}
            onClick = {(e) => e.stopPropagation()}
        >
            <FormContainer>
                <input 
                    type = 'email'
                    name = 'user_email'
                    value = {values.user_email}
                    onChange={onChange}
                    className = 'form-input'
                />
                <input 
                    type = 'text'
                    name = 'display_name'
                    value = {values.display_name}
                    onChange={onChange}
                    className = 'form-input'
                />
                <button onClick = {(e) => handleSubmit(e)}> Make Changes </button>
            </FormContainer>

        </StyledDrawer>
    </>
  )
}

const ConnectedEditGeneralDrawer = connect(null, ({
    updateUserData: userActions.updateUserData
}))(EditGeneralDrawer)

export default ConnectedEditGeneralDrawer

const StyledDrawer = styled(Drawer)`
    .ant-drawer-header {
        background-color: ${props => props.theme.color.red};
        color: white;
        font-family: ${props => props.theme.font.family.secondary};
        font-size: 4rem;
        font-weight: 700;
    }

    .ant-drawer-body {
        background-color: rgba(0,0,0,0.9);
    }

`

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .form-input {
        width: 100%;
        max-width: 400px;
        height: 40px;
        margin-bottom: 20px;
        border-radius: 5px;
        border: none;
        padding-left: 10px;
        font-size: 1.2rem;
        font-family: ${props => props.theme.font.family.secondary};
    }

    button {
        width: 100%;
        max-width: 400px;
        height: 40px;
        border-radius: 5px;
        border: none;
        background-color: ${props => props.theme.color.red};
        color: white;
        font-size: 1.2rem;
        font-family: ${props => props.theme.font.family.secondary};
        cursor: pointer;

        &:hover {
            background-color: rgba(255,0,0,0.8);
        }
    }

`