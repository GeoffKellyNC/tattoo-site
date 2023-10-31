import { axiosWithAuth } from "./axiosWithAuth";

const url = import.meta.env.VITE_REACT_APP_API_ENDPOINT;


const createPortalSession = async (): Promise<void> => {
    try {
       const res = await axiosWithAuth().post(`${url}/stripe/create-portal-session`);

       const redirectUrl = res.data.data;

       window.location.href = redirectUrl;

    } catch (error) {
        console.log(error);
    }
}


export default createPortalSession;