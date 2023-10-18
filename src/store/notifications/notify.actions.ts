import * as notifyTypes from './notify.types'
import { Dispatch } from 'redux'



export const setNotification = (type: string, message: string) => (dispatch: Dispatch) => {
    dispatch({
        type: notifyTypes.SET_NOTIFY,
        payload: {
            type,
            message
        }
    })
}