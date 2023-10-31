import { axiosWithAuth } from "./axiosWithAuth";

const url = import.meta.env.VITE_REACT_APP_API_ENDPOINT;

const sendSessionId = async (id: string): Promise<void> => {
    try {
        await axiosWithAuth().post(`${url}/stripe/set-stripe-session`, { session_id: id });
    } catch (error) {
        console.log(error);
    }
}

export default sendSessionId;