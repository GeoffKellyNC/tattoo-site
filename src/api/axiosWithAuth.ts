import axios from 'axios';


export const axiosWithAuth = () => {
    const unx_id = JSON.parse(sessionStorage.getItem('user_data') as string).unxid
    const jwtToken = sessionStorage.getItem('jwtToken')
    const user_name = JSON.parse(sessionStorage.getItem('user_data') as string).user_name
 

    
    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            user_unx_id: unx_id,
            user_name: user_name,
            'auth-token': jwtToken
 
        },
    }); 
};