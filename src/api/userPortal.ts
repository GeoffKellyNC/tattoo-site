import { axiosWithAuth } from "./axiosWithAuth";

const url = import.meta.env.VITE_REACT_APP_API_ENDPOINT;


const createPortalSession = async (): Promise<void> => {
    try {
       await axiosWithAuth().post(`${url}/stripe/create-portal-session`);

    } catch (error) {
        console.log(error);
    }
}


export default createPortalSession;