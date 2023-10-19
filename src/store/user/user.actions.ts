import axios from 'axios';
import { axiosWithAuth } from '../../api/axiosWithAuth';
import * as notifyTypes from '../notifications/notify.types';
import * as userTypes from './user.types';
import { Dispatch } from 'redux';  
import { SetUserDataAction } from './user.reducer';
import { SetUserContactProfileAction, SetClientProfileDetailsAction } from './user.reducer';    

// Define data types
interface RegisterData {
    username?: string; 
    password?: string; 
}

interface LoginData {
    username: string;
    password: string;
    // ... any other fields
}

// Define action types
interface NotifyAction {
    type: typeof notifyTypes.SET_NOTIFY;
    payload: {
        type: 'info' | 'error' | 'warning' | 'success';
        message: string;
    };
}

interface UserAction {
    type: typeof userTypes.SET_USER_DATA | typeof userTypes.SET_USER_AUTHENTICATED;
    payload: boolean;
}

interface UploadImageAction {
    type: string; // You'll need to define SET_PROFILE_IMAGE in user.types.ts
    payload: string; // URL of the uploaded image
}



// Define return types
type RegisterReturnType = void;
type LoginReturnType = { state: boolean; unxid: string | null } | boolean;
type VerifyUserReturnType = boolean;

export const registerUser = (data: RegisterData) => async (dispatch: Dispatch<NotifyAction>): Promise<RegisterReturnType> => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/register`, data);

        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'info',
                message: 'User Created Successfully'
            }
        });

        console.log('Create User Res: ', res);
    } catch (error) {
        console.log('Error Registering User: ', error); // TODO: Handle This error
    }
};

export const loginUser = (data: LoginData) => async (dispatch: Dispatch<UserAction | NotifyAction | SetUserDataAction | SetClientProfileDetailsAction | SetUserContactProfileAction>): Promise<LoginReturnType> => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/auth/login`, data);

        if(res.status === 200) {
            sessionStorage.setItem('user_data', JSON.stringify(res.data.userData));
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('jwtToken', res.data.jwtToken);
            sessionStorage.setItem('userProfileDetails', JSON.stringify(res.data.userProfileDetails));
            sessionStorage.setItem('userContactProfile', JSON.stringify(res.data.userContactDetails));
            
            dispatch({
                type: userTypes.SET_USER_DATA,
                payload: res.data.userData
            });

            dispatch({
                type: userTypes.SET_USER_PROFILE_DETAILS,
                payload: res.data.userProfileDetails
            });

            dispatch({
                type: userTypes.SET_USER_CONTACT_PROFILE,
                payload: res.data.userContactDetails
            });
    
            dispatch({
                type: notifyTypes.SET_NOTIFY,
                payload: {
                    type: 'info',
                    message: 'User Logged In Successfully'
                }
            });

            dispatch({
                type: userTypes.SET_USER_AUTHENTICATED,
                payload: true
            });

            return { state: true, unxid: res.data.unxid };
        }

        return { state: false, unxid: null };
    } catch (error) {
        console.log('Error Logging In User: ', error); // TODO: Handle This error
        return false;
    }
};


export const logoutUser = () => async (dispatch: Dispatch<UserAction | NotifyAction>): Promise<void> => {
    try {
        const res = await axiosWithAuth().post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/auth/logout`);
        console.log('Logout User Res: ', res.data); // REMOVE

        if(res.status === 200) {
            sessionStorage.clear();

            dispatch({
                type: userTypes.SET_USER_DATA,
                payload: false
            });
    
            dispatch({
                type: notifyTypes.SET_NOTIFY,
                payload: {
                    type: 'info',
                    message: 'User Logged Out Successfully'
                }
            });

            dispatch({
                type: userTypes.SET_USER_AUTHENTICATED,
                payload: false
            });

            window.location.href = '/';
            return
        }
    } catch (error) {
        console.log('Error Logging Out User: ', error); // TODO: Handle This error
        return
    }
}

export const verifyUserAccess = () => async (dispatch: Dispatch<UserAction>): Promise<VerifyUserReturnType> => {
    try {
        const res = await axiosWithAuth().get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/auth/verify-user-access`);
        console.log('Verify User Res: ', res.data); // REMOVE

        if(res.status === 200) {
            dispatch({
                type: userTypes.SET_USER_AUTHENTICATED,
                payload: true
            });

            return true;
        }

        dispatch({
            type: userTypes.SET_USER_AUTHENTICATED,
            payload: false
        });

        return false;
    } catch (error) {
        dispatch({
            type: userTypes.SET_USER_AUTHENTICATED,
            payload: false
        });
        console.log('Error Verifying User: ', error); // TODO: Handle This error
        return false;
    }
};


export const uploadProfileImage = (file: File) => async (dispatch: Dispatch<UploadImageAction | NotifyAction>) => {
    try {
        const formData = new FormData();
        formData.append('profile-image', file);  // This name matches with the middleware's expected name

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const res = await axiosWithAuth().post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/upload-profile-image`, formData, config);

        dispatch({
            type: userTypes.ADD_USER_PROFILE_IMG,
            payload: res.data.data
        })


        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'info',
                message: 'Image uploaded successfully!'
            }
        });

    } catch (error) {
        console.error("Error uploading image:", error);
        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'error',
                message: 'Error uploading the image!'
            }
        });
    }
};

export const getProfileImage = () => async (dispatch: Dispatch<UploadImageAction | NotifyAction>) => {
    try {
        const res = await axiosWithAuth().get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/get-profile-image`);

        dispatch({
            type: userTypes.ADD_USER_PROFILE_IMG,
            payload: res.data.data
        })

        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'info',
                message: 'Image fetched successfully!'
            }
        });

        return 
    } catch (error) {
        console.error("Error fetching image:", error);
        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'error',
                message: 'Error fetching the image!'
            }
        });
    }
}

