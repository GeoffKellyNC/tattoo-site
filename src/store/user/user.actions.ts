import axios from 'axios';
import { axiosWithAuth } from '../../api/axiosWithAuth';
import * as notifyTypes from '../notifications/notify.types';
import * as userTypes from './user.types';
import { Dispatch } from 'redux';  
import { SetUserDataAction, ClientProfileDetailsType } from './user.reducer';
import { SetUserContactProfileAction, SetClientProfileDetailsAction } from './user.reducer';    
import { UserFullProfileAction } from './types/userStateTypes';

// Define data types

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

interface RegisterTypes {
    user_name: string;
    email: string;
    first_name: string;
    last_name: string;
    display_name: string;
    account_type: string;
    password: string;
}



// Define return types
type RegisterReturnType = void;
type LoginReturnType = { state: boolean; unxid: string | null } | boolean;
type VerifyUserReturnType = boolean;

export const registerUser = (data: RegisterTypes) => async (dispatch: Dispatch<NotifyAction>): Promise<RegisterReturnType> => {
    try {
        await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/register`, data);

        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'info',
                message: 'User Created Successfully'
            }
        });

    } catch (error) {
        console.log('Error Registering User: ', error); // TODO: Handle This error
    }
};

export const loginUser = (data: {user_name: string, password: string}) => async (dispatch: Dispatch<UserAction | NotifyAction | SetUserDataAction | SetClientProfileDetailsAction | SetUserContactProfileAction>): Promise<LoginReturnType> => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/auth/login`, data, {
            withCredentials: true
        });

        if(res.status === 200) {
            sessionStorage.setItem('user_data', JSON.stringify(res.data.userData));
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('jwtToken', res.data.jwtToken);
            sessionStorage.setItem('userProfileDetails', JSON.stringify(res.data.userProfileDetails));
            sessionStorage.setItem('userContactProfile', JSON.stringify(res.data.userContactDetails));
            sessionStorage.setItem('userClientImages', JSON.stringify(res.data.clientUploadedImages));

            dispatch({
                type: userTypes.GET_USER_CLIENT_IMAGES,
                payload: res.data.clientUploadedImages
            });
            
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
                    message: `Hey ${res.data.userData.user_name}! Thanks for logging in.`
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
        return {state: false, unxid: null};
    }
};


export const logoutUser = () => async (dispatch: Dispatch<UserAction | NotifyAction>): Promise<void> => {
    try {
        const res = await axiosWithAuth().post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/auth/logout`);

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


        sessionStorage.setItem('profile_image', JSON.stringify(res.data.data));

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

        sessionStorage.setItem('profile_image', JSON.stringify(res.data.data));


        dispatch({
            type: userTypes.ADD_USER_PROFILE_IMG,
            payload: res.data.data
        })

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

export const updateClientProfileDetails = (data: ClientProfileDetailsType ) => async (dispatch: Dispatch<SetClientProfileDetailsAction | NotifyAction>) => {
    try {
        const res = await axiosWithAuth().post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/update-client-profile-details`, data);


        sessionStorage.setItem('userProfileDetails', JSON.stringify(res.data.data));

        dispatch({
            type: userTypes.SET_USER_PROFILE_DETAILS,
            payload: res.data.data
        })

        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'info',
                message: 'Profile Details Updated Successfully!'
            }
        });

        return 
    } catch (error) {
        console.error("Error updating profile details:", error);
        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'error',
                message: 'Error updating profile details!'
            }
        });
        return
    }
}

export const getClientUploadedImages = () => async (dispatch: Dispatch<UploadImageAction | NotifyAction>) => {
    try {
        const res = await axiosWithAuth().get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/get-client-images`);

        sessionStorage.setItem('userClientImages', JSON.stringify(res.data.data));

        dispatch({
            type: userTypes.GET_USER_CLIENT_IMAGES,
            payload: res.data.data
        })

        return
    } catch (error) {
        console.error("Error fetching client images:", error);
        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'error',
                message: 'Error fetching client images!'
            }
        });
    }
}

export const uploadClientUserImage = (file: File) => async (dispatch: Dispatch<UploadImageAction | NotifyAction>) => {
    try {
        const formData = new FormData();
        formData.append('client-user-image', file);  // This name matches with the middleware's expected name

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const res = await axiosWithAuth().post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/upload-client-images`, formData, config);


        const savedArray = sessionStorage.getItem('userClientImages') ? JSON.parse(sessionStorage.getItem('userClientImages') as string) : [];

        savedArray.push(res.data.data);

        sessionStorage.setItem('userClientImages', JSON.stringify(savedArray));

        dispatch({
            type: userTypes.SET_USER_CLIENT_IMAGES,
            payload: res.data.data
        })

        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'info',
                message: 'Image uploaded successfully!'
            }
        });

        return

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
}


export const getFullUserProfileDetails = (unxid: string) => async (dispatch: Dispatch<UserFullProfileAction | NotifyAction>) => {
    try {
        const res = await axiosWithAuth().get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/get-user-profile-by-id/${unxid}`)


        dispatch({
            type: userTypes.SET_VIEW_USER_PROFILE_DETAILS,
            payload: res.data.data
        })

        return true

    } catch (error) {
        console.log('Error getting full profile details: ', error) //TODO: Handle this error
        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'error',
                message: 'Error Getting User Profile Details'
            }
        })
        return false
    }
}

export const updateVerificationEmail = (email: string) => async (dispatch: Dispatch<NotifyAction>) => {
    try {
        const res = await axiosWithAuth().post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/update-verificatoin-email`, {email})

        const displayMessage = res.data.message ? res.data.message : 'Email Updated Successfully'
        
        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'info',
                message: displayMessage
            }
        })

        return true

    } catch (error) {
        console.log('Error updating email: ', error) //TODO: Handle this error
        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'error',
                message: 'Error Updating Email'
            }
        })
        return false
    }
}

