import { axiosWithAuth } from "../../api/axiosWithAuth";
import { Dispatch } from "redux";
import * as jobTypes from "./job.types";
import * as notifyTypes from '../notifications/notify.types';
import * as userTypes from '../user/user.types';
import { ArtistFullProfile } from "../user/types/userStateTypes";
import { UserJobType } from "./ts-types/jobTypes";


const BASE_URL: string = import.meta.env.VITE_REACT_APP_API_ENDPOINT;


export const getUserJobs = () => async (dispatch: Dispatch): Promise<UserJobType[] | unknown> => {
    try {

        const res = await axiosWithAuth().get(`${BASE_URL}/jobs/get-user-jobs`);
        localStorage.setItem('userJobs', JSON.stringify(res.data.data));


        dispatch(
            { 
                type: jobTypes.GET_USER_JOBS, 
                payload: res.data.data
            });

        return res.data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const createJob = (job) => async (dispatch: Dispatch): Promise<UserJobType | unknown> => {
    try {
      
        const res = await axiosWithAuth().post(`${BASE_URL}/jobs/create-job`, job);
        
        dispatch({ 
            type: jobTypes.ADD_JOB, 
            payload: res.data.data
        });

        return res.data;
    } catch (err) {
        console.log("Error adding job: ", err); //TODO: HANDLE THIS ERRROR
        return err;
    }
}

export const addPhotosToJob = (jobId: string, photos: File[]) => async (dispatch: Dispatch): Promise<void> =>{
    try {
        const formData = new FormData();
        formData.append('jobId', jobId);
        photos.forEach(photo => {
            formData.append('photos[]', photo);  // Note the '[]' added to the field name
        });

        const res = await axiosWithAuth().post(`${BASE_URL}/jobs/add-photos-to-job`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        dispatch({
            type: jobTypes.UPDATE_JOB,
            payload: res.data.data
        })

        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'info',
                message: 'Photos added to job'
            }
        });

        return res.data;
    } catch (err) {
        console.log("Error adding photos to job: ", err); //TODO: HANDLE THIS ERRROR
        return err;
    }
}


export const getAllActiveJobs = () => async (dispatch: Dispatch): Promise<void> => {
    try {
        
        const res = await axiosWithAuth().get(`${BASE_URL}/jobs/get-all-active-jobs`)

        dispatch({
            type: jobTypes.SET_ALL_ACTIVE_JOBS,
            payload: res.data.data
        })

    } catch (error) {
        console.log('Error Getting All Active Jobs: ', error) //!TODO: Handle This Error
    }
}

export const getArtistsCurrentBids = () => async (dispatch: Dispatch): Promise<void> => {
    try {
        
        const bidRes = await axiosWithAuth().get(`${BASE_URL}/jobs/get-job-bids-artist`)


        dispatch({
            type: jobTypes.SET_ARTISTS_JOB_BIDS,
            payload: bidRes.data.data
        })

        return

    } catch (error) {
        console.log('Error Getting Artists Current Bids!', error) //!TODO: Handle This Error
        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'error',
                message: 'Error Getting Artists Current Bids!'
            }
        })
    }
}

export const getClientsCurrentBids = () => async (dispatch: Dispatch): Promise<void> => {
    try {
        
        const bidRes = await axiosWithAuth().get(`${BASE_URL}/jobs/get-job-bids-client`)

        if(bidRes.data.data && bidRes.data.data.length > 0){
            dispatch({
                type: notifyTypes.SET_USER_DATA_NOTIFY,
                payload: {
                    active: true,
                    message: `You have ${bidRes.data.data.length} new bid${bidRes.data.data.length > 1 ? 's' : ''}!`
                }
            })
        }

        dispatch({
            type: jobTypes.SET_CLIENTS_JOB_BIDS,
            payload: bidRes.data.data
        })

        return

    } catch (error) {
        console.log('Error Getting Clients Current Bids!', error) //!TODO: Handle This Error
        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'error',
                message: 'Error Getting Clients Current Bids!'
            }
        })
    }
}

export const getJobById = (jobId: string) => async (dispatch: Dispatch): Promise<UserJobType | boolean> => {
    try {
        
        const res = await axiosWithAuth().get(`${BASE_URL}/jobs/get-job-by-id/${jobId}`)

        return res.data.data

    } catch (error) {
        console.log('Error Getting Job By Id: ', error) //!TODO: Handle This Error
        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'error',
                message: 'Error Getting Job By Id!'
            }
        })

        return false
    }
}

export const createJobBid = (jobId: string, artistId: string, bidData: {bidAmount: string, artistDetails: string}, jobOwnerId: string, jobTitle: string) => async (dispatch: Dispatch): Promise<void> => {
    try {
        
        const res = await axiosWithAuth().post(`${BASE_URL}/jobs/create-job-bid`, {jobId, artistId, data: bidData, jobOwnerId, jobTitle})


        if(res.status !== 200) {
            dispatch({
                type: notifyTypes.SET_NOTIFY,
                payload: {
                    type: 'error',
                    message: 'Error Creating Job Bid!'
                }
            })
            return
        }

        dispatch({
            type: jobTypes.ADD_ARTISTS_JOB_BID,
            payload: res.data.data
        })

        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'success',
                message: 'Bid Created!'
            }
        })

        return

    } catch (error) {
        console.log('Error Creating Job Bid: ', error) //!TODO: Handle This Error
        dispatch({ 
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'error',
                message: 'Error Creating Job Bid!'
            }
        })
    }
}


export const getArtistDataForBid =  (artistId: string) => async (dispatch: Dispatch): Promise<ArtistFullProfile | boolean>  => {
    try {
        const res = await axiosWithAuth().get(`${BASE_URL}/jobs/get-artist-details-bid/${artistId}`)

        dispatch({
            type: userTypes.SET_ARTIST_FULL_PROFILE,
            payload: res.data.data
        })

        return res.data.data


    } catch (error) {
        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'error',
                message: 'Error Getting Artist Data For Bid!'
            }
        })
        console.log('Error Getting Artist Data For Bid: ', error) //!TODO: Handle This Error
        return false
    }
}

export const clientAcceptBid = (job_id: string, artist_id: string) => async (dispatch: Dispatch): Promise<boolean> => {
    try {
        console.log('Accepting Bid') //!REMOVE
        const res = await axiosWithAuth().post(`${BASE_URL}/jobs/accept-bid`, {job_id, artist_id})

        if (res.status !== 200){
            return false
        }

        return true

    } catch(error) {
        console.log('Error Accepting bid: ', error)
        dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                type: 'error',
                message: 'Error Accepting Bid'
            }
        })
        return false
    }
}





