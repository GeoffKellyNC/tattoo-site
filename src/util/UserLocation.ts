import { axiosWithAuth } from "../api/axiosWithAuth";

const BASE_URL: string = import.meta.env.VITE_REACT_APP_API_ENDPOINT

export const getLocationData = async (lat: string, lng: string) => {
    try{
        console.log("GETTING USER LOCATOIN!") //!REMOVE

        const data = { latitude: lat, longitude: lng}
        
        const res = await axiosWithAuth().post(`${BASE_URL}/user/location-data`, data)
    
        console.log('location res', res) //!REMOVE
    } catch(error){
        console.log('ERROR GETTING LOCATION DATA: ', error)
        return false
    }
}











