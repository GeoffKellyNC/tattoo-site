import * as userTypes from './user.types'

interface SetUserDataAction {
    type: string;
    payload: unknown; 
}

export function userData(state = {}, action: SetUserDataAction) {
    switch(action.type){
        case userTypes.SET_USER_DATA:
            return action.payload
        default:
            return state
    }
}