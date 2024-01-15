import { axiosWithAuth } from "./axiosWithAuth";


export const fetchJobs = async (page: number, limit: number = 10, lat: number, lng: number, radius: string) => {
    try {
        // Construct the URL with optional search and filter parameters
        const url = `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/jobs/get-paginated-job-location?page=${page}&limit=${limit}&lat=${lat}&lng=${lng}&radius=${radius}`;

        

        const response = await axiosWithAuth().get(url);


        return response.data.data;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw error; 
    }
}