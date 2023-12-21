import * as jobTypes from './job.types'
import { 
    UserJobType , 
    UserJobActionType, 
    JobBidType, 
    ArtistAcceptedJobType} from './ts-types/jobTypes'

export function artistAcceptedJobs(state: ArtistAcceptedJobType[] = [], action: UserJobActionType) {
    switch(action.type) {
        case jobTypes.SET_ACCEPTED_JOBS:
            return action.payload
        case jobTypes.ADD_ACCEPTED_JOB:
            return [...state, action.payload]
        default:
            return state
    }
}

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

export function allActiveJobs(state: UserJobType[] = [],  action: UserJobActionType ) {
    switch(action.type) {
        case jobTypes.SET_ALL_ACTIVE_JOBS:
            return action.payload
        default:
            return state
    }
}

export function artistCurrentBids(state: JobBidType[] = [], action){
    switch(action.type){
        case jobTypes.SET_ARTISTS_JOB_BIDS:
            return action.payload
        case jobTypes.ADD_ARTISTS_JOB_BID:
            return [...state, action.payload]
        default:
            return state
    }
}

export function clientCurrentBids(state: JobBidType[] = [], action){
    switch(action.type){
        case jobTypes.SET_CLIENTS_JOB_BIDS:
            return action.payload
        case jobTypes.ADD_CLIENTS_JOB_BID:
            return [...state, action.payload]
        default:
            return state
    }
}


