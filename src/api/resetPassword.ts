import axios from 'axios';

const resetUserPasswordApi = async (newPassword: string, token: string | undefined, unxid: string | undefined): Promise<boolean> => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/auth/reset-password`, {
            newPassword,
            token,
            unxid
        });

        if(res.status !== 200) {
            return false;
        }

        return true

    } catch (error) {
        console.log(error)
        return false
    }


};


export default resetUserPasswordApi;