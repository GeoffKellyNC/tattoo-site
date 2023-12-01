import { axiosWithAuth } from "../../api/axiosWithAuth";
import { Dispatch } from "redux";
import * as jobTypes from "./job.types";
import * as notifyTypes from '../notifications/notify.types';
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

        console.log('Artists Job Bids: ', bidRes.data.data) //!REMOVE

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

export const createJobBid = (jobId: string, artistId: string, bidData: {bidAmount: string, artistDetails: string}, jobOwnerId: string) => async (dispatch: Dispatch): Promise<void> => {
    try {
        
        const res = await axiosWithAuth().post(`${BASE_URL}/jobs/create-job-bid`, {jobId, artistId, data: bidData, jobOwnerId})

        console.log('Create Job Bid: ', res.data.data) //!REMOVE

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





