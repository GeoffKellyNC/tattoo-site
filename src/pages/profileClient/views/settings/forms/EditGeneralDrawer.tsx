import React, { useState } from 'react'
import { UserData } from '../../../../../store/user/user.reducer'
import { Drawer } from 'antd'
import { connect } from 'react-redux'
import * as userActions from '../../../../../store/user/user.actions'


interface Props {
    userData: UserData,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditGeneralDrawer: React.FC<Props> = ({
    userData,
    isOpen,
    setIsOpen
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
            console.log('Updating both username and email'); 
            return
        } else if (isDisplayNameChanged) {
            console.log('Updating UserName'); //!REMOVE
            return
        } else if (isUserEmailChanged) {
            console.log('Updating User Email'); //!REMOVE
            return
        }
        console.log('Nothing Changed!') //!REMOVE
        setIsOpen(false);
    };
    

  return (
    <>
        <Drawer
            title = "Edit General Info"
            placement='right'
            onClose = {() => setIsOpen(false)}
            size = 'large'
            open = {isOpen}
            onClick = {(e) => e.stopPropagation()}
        >
            <div className = 'form-continer'>
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
            </div>

        </Drawer>
    </>
  )
}

const ConnectedEditGeneralDrawer = connect(null, ({

}))(EditGeneralDrawer)

export default ConnectedEditGeneralDrawer