import { axiosWithAuth } from './axiosWithAuth';
import { ArtistAcceptedJobType } from '../store/jobs/ts-types/jobTypes';

const BASE_URL: string = import.meta.env.VITE_REACT_APP_API_ENDPOINT;



export const getAcceptedBidData = async (jobId: string): Promise<ArtistAcceptedJobType> => {
    try {
        const res = await axiosWithAuth().get(`${BASE_URL}/jobs/get-bid-data?jobId=${jobId}`)
        return res.data.data
    } catch (error) {
        return
    }
}