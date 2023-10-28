import * as jobTypes from './job.types'
import { UserJobType , UserJobActionType} from './ts-types/jobTypes'


export function userJobs(state: UserJobType[] = [], action: UserJobActionType) {
    switch(action.type) {
        case jobTypes.GET_USER_JOBS:
            return action.payload; 
        case jobTypes.ADD_JOB:
            return [...state, action.payload]; 
        case jobTypes.UPDATE_JOB:
            return state.map(job => job.job_id === action.payload.job_id ? action.payload : job);
        case jobTypes.DELETE_JOB:
            return state.filter(job => job.job_id !== action.payload.job_id);
        default:
            return localStorage.getItem('userJobs') ? JSON.parse(localStorage.getItem('userJobs')!) : state;
    }
}