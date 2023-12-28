import { axiosWithAuth } from "./axiosWithAuth";

const BASE_URL: string = import.meta.env.VITE_REACT_APP_API_ENDPOINT;


export const fetchArtistDataAcceptedJob = async (artistId: string) => {
    try {
        const res = await axiosWithAuth().get(`${BASE_URL}/jobs/get-artists-accepted-job?artistId=${artistId}`);

        if (res.status === 200) {
            return res.data.data[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}