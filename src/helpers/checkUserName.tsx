import axios from 'axios'



// Returns True if name is taken and False if name is available
const checkUserName = async (username: string): Promise<boolean> => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/user/check-user-name/${username}`)

        console.log('checkUserName res.data.message: ', res.data.message) //!REMOVE

        return res.data.message

    } catch (error) {
        console.log(error)
        return true
    }
}


export default checkUserName