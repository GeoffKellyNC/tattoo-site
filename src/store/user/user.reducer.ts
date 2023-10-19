import * as userTypes from './user.types'

export interface SetUserDataAction {
    type: string;
    payload: UserData; 
}

interface SetUserAuthenticatedAction {
    type: string;
    payload: boolean;
}

export interface UserData {
    _id: string;
    unxid: string;
    first_name: string;
    last_name: string;
    user_name: string;
    display_name: string;
    user_email: string | null;
    password: string;  // Be careful about having passwords on the client side!
    googleId: string | null;
    created_date: string; // consider using Date type if manipulating the date on the client side
    account_type: string; // consider creating an enum if there are limited predefined types
    isAdmin: boolean;
    isMod: boolean;
    isArtist: boolean;
    isClient: boolean;
    session_token: string | null;
    account_status: string; // consider creating an enum if there are limited predefined types
    attr1: string | null;
    attr2: string | null;
    attr3: string | null;
    attr4: string | null;
    attr5: string | null;
    attr6: string | null;
    attr7: string | null;
    attr8: string | null;
}

interface SetUserProfileImageAction {
    type: string;
    payload: {
        image: string;
        image_id: string;
    };
}



export function userData(state = {}, action: SetUserDataAction) {
    switch(action.type){
        case userTypes.SET_USER_DATA:
            return action.payload
        default:
            return sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data') as string) : state
    }
}


export function isAuthenticated(state = false, action: SetUserAuthenticatedAction) {
    switch(action.type) {
        case userTypes.SET_USER_AUTHENTICATED:
            return action.payload;
        default: {
            const storedValue = sessionStorage.getItem('isAuthenticated');
            return storedValue === 'true' ? true : state;
        }
    }
}


export function profileImages(state = null, action: SetUserProfileImageAction ) {
    switch(action.type) {
        case userTypes.ADD_USER_PROFILE_IMG:
            return action.payload;
        case userTypes.GET_USER_PROFILE_IMG:
            return state;
        default:
            return state;
    }
}
