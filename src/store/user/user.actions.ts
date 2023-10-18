import axios from 'axios'
import * as notifyTypes from '../notifications/notify.types'
import * as userTypes from './user.types'


export const registerUser =  (data: unknown) => async (dispatch: (arg0: { type: string; payload: { type: string; message: string } }) => void )=>  {
    try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/create-user`, data)

        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'info',
                message: 'User Created Successfully'
            }
        })

        console.log('Crete User Res: ', res)
    } catch (error) {
        console.log('Error Registering User: ', error) //!TODO: Handle This error
    }
}

export const loginUser = (data: unknown) => async (dispatch: (arg0: { type: string; payload: { type: string; message: string } }) => boolean ) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/login`, data)
        console.log('Login User Res: ', res) //!REMOVE

        if(res.status === 200) {
            dispatch({
                type: userTypes.SET_USER_DATA,
                payload: res.data.user
            })
    
            dispatch({
                type: notifyTypes.SET_NOTIFY,
                payload: {
                    type: 'info',
                    message: 'User Logged In Successfully'
                }
            })

            return true
        }

        return false

    } catch (error) {
        console.log('Error Logging In User: ', error) //!TODO: Handle This error
        return false
    }
}