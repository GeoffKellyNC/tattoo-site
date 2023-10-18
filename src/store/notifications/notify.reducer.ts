import * as notifyTypes from './notify.types'


// General Notification state interface
export interface NotifyState {
    active: boolean,
    type: string,
    message: string
}

 
// General notification action interface
interface NotifyAction {
    type: string,
    payload: {
        type: string,
        message: string
    }
}



// Payload : {type: string, message: string}
export function appNotifications(state: NotifyState = {active: false, type: '', message: ''}, action: NotifyAction){
    switch(action.type){
        case notifyTypes.SET_NOTIFY:
            if(action.payload.type === 'info'){
                return {active: true, type: 'info', message: action.payload.message}
            }
            if(action.payload.type === 'error'){
                return {active: true, type: 'error', message: action.payload.message}
            }
            if(action.payload.type === 'warning'){
                return {active: true, type: 'warning', message: action.payload.message}
            }
            return state
        case notifyTypes.CLEAR_NOTIFY:
            return {active: false, type: '', message: ''}
        default:
            return state
    }
}