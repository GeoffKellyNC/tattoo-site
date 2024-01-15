import { axiosWithAuth } from "./axiosWithAuth";

export const fetchUsers = async (page: number, limit: number = 10, cordsObj: {lat: number, lng: number}) => {
    try {
        // Construct the URL with optional search and filter parameters
        const url = `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/get-paginated-users?page=${page}&limit=${limit}&lat=${cordsObj.lat}&lng=${cordsObj.lng}`;

        const response = await axiosWithAuth().get(url);

        return response.data.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; 
    }
};
