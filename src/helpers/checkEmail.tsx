import axios from 'axios'


const checkEmail = async (email: string): Promise<boolean> => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/auth/check-email`, {email})

        return res.data.data

    } catch (error) {
        console.log(error) //!TODO: Handle Error
        return false
    }
}


export default checkEmail