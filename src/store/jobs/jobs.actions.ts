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

        console.log('Response data Getting current jobs:', res.data.data); //!REMOVE

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
        console.log('Response data:', res.data); //!REMOVE
        
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

        console.log('jobId: ', jobId); //!REMOVE
        console.log('photos: ', photos); //!REMOVE
        console.log('Number of photos: ', photos.length) //!REMOVE
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


