import axios from 'axios'



// Returns True if name is taken and False if name is available
const checkUserName = async (username: string): Promise<boolean> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/check-user-name/${username}`)

        return res.data.message

    } catch (error) {
        console.log(error) //!TODO: Handle Error
        return true
    }
}


export default checkUserName