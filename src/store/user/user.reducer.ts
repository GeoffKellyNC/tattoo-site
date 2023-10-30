import * as userTypes from './user.types'
import { UserFullProfile, UserFullProfileAction } from './types/userStateTypes';

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
    email_verified: boolean;
}

interface SetUserProfileImageAction {
    type: string;
    payload: {
        image: string;
        image_id: string;
    };
}

enum Preferred_size_range {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
    FullSleeveBack = 'Full-Sleeve/Back'
}


export interface ClientProfileDetailsType {
    user_unxid: string; // 
    location_city?: string | null;
    location_state?: string | null;
    location_zip?: string | null;
    profile_tagline?: string | null;
    profile_description?: string | null;
    number_of_tattoos?: number | null; 
    tattoo_style_preferences?: string[] | null;  
    preferred_size_range?: Preferred_size_range | null;
    personal_tattoo_story?: string | null;
}

export interface SetClientProfileDetailsAction {
    type: string;
    payload: ClientProfileDetailsType;
}

export interface ContactDetail {
    public: boolean;
    value: string | null;
}

export interface UserContactProfileType {
    user_unxid: string; // Assuming unxid is a string, adjust if needed
    contact_phone: ContactDetail;
    contact_instagram: ContactDetail;
    contact_snapchat: ContactDetail;
    contact_x: ContactDetail; // Rename 'contact_x' to a more descriptive name if needed
    contact_discord: ContactDetail;
    contact_website: ContactDetail;
    other_1: ContactDetail;
    other_2: ContactDetail;
}

export interface SetUserContactProfileAction {
    type: string;
    payload: UserContactProfileType;
}



export function userData(state = {}, action: SetUserDataAction) {
    switch(action.type){
        case userTypes.SET_USER_DATA:
            return action.payload
        default:
            return sessionStorage.getItem('user_data') ? JSON.parse(sessionStorage.getItem('user_data') as string) : state
    }
}

export function userRole (state = 'user', action: {type: string, payload: string}){
    switch(action.type){
        case userTypes.SET_USER_ROLE:
            return action.payload
        default:
            return state
    }
}

export function accountType (state = 'guest', action: {type: string, payload: string}){
    switch(action.type){
        case userTypes.SET_USER_ACCOUNT_TYPE:
            return action.payload
        default: 
            return state
    }
}
    

export function isAuthenticated(state = false, action: SetUserAuthenticatedAction) {
    switch(action.type) {
        case userTypes.SET_USER_AUTHENTICATED:
            return action.payload;
        default: {
            return state;
        }
    }
}


export function profileImages(
    state = 'https://storage.googleapis.com/tattoo-user-uploaded-images/profile-images/DALL%C2%B7E%202023-10-28%2019.20.25.png', 
    action: SetUserProfileImageAction ) {
    switch(action.type) {
        case userTypes.ADD_USER_PROFILE_IMG:
            return action.payload;
        case userTypes.GET_USER_PROFILE_IMG:
            return state;
        default:
            return sessionStorage.getItem('profile_image') ? JSON.parse(sessionStorage.getItem('profile_image') as string) : state;
    }
}

export function userProfileDetails(state = {}, action: SetClientProfileDetailsAction) {
    switch(action.type) {
        case userTypes.SET_USER_PROFILE_DETAILS:
            return action.payload;
        default:
            return sessionStorage.getItem('userProfileDetails') ? JSON.parse(sessionStorage.getItem('userProfileDetails') as string) : state;
    }
}

export function userContactProfile(state = {}, action: SetUserContactProfileAction) {
    switch(action.type) {
        case userTypes.SET_USER_CONTACT_PROFILE:
            return action.payload;
        default:
            return sessionStorage.getItem('userContactProfile') ? JSON.parse(sessionStorage.getItem('userContactProfile') as string) : state;
    }
}

export function clientUserImages(state = [], action: SetUserProfileImageAction) {

    switch(action.type) {
        case userTypes.GET_USER_CLIENT_IMAGES:
            return action.payload;
        case userTypes.SET_USER_CLIENT_IMAGES:
            return [...state, action.payload];
        default:
            return sessionStorage.getItem('userClientImages') ? JSON.parse(sessionStorage.getItem('userClientImages') as string) : state;
    }
}


export function viewUserDetails(state: UserFullProfile = {} as UserFullProfile, action: UserFullProfileAction) {
    switch(action.type) {
        case userTypes.SET_VIEW_USER_PROFILE_DETAILS:
            return action.payload;
        default:
            return state;
    }
}
