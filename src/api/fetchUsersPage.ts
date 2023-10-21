import { axiosWithAuth } from "./axiosWithAuth";

export const fetchUsers = async (page: number, limit: number = 10) => {
    try {
        const response = await axiosWithAuth().get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/get-paginated-users?page=${page}&limit=${limit}`);
        console.log("response.data.data", response.data.data);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // This allows us to handle the error in the component if needed.
    }
};
