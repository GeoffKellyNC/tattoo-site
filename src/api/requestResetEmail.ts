import axios from 'axios';

const sendPasswordResetEmailApi = async (user_email: string): Promise<boolean> => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/auth/reset-password-verify`, {
            user_email: user_email
            });

        console.log('Request Email Response: ', res.data) //!REMOVE

        if(res.status !== 200) {
            return false;
        }

        return true

    } catch (error) {
        console.log(error)
        return false
    }
}


export default sendPasswordResetEmailApi;