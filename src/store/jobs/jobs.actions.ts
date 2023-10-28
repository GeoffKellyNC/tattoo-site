import { axiosWithAuth } from "../../api/axiosWithAuth";
import { Dispatch } from "redux";
import * as jobTypes from "./job.types";
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


