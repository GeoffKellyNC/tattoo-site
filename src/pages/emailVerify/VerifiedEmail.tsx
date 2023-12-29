import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { axiosWithAuth } from '../../api/axiosWithAuth'


const BASE_URL = import.meta.env.VITE_REACT_APP_API_ENDPOINT

const makeApiCall = async (token: string, unxid: string): Promise<boolean> => {
    try {
       const res =  await axiosWithAuth().get(`${BASE_URL}/auth/verify-email?token=${token}&unxid=${unxid}`)

       return res.data.data

    } catch (error) {
        console.log(error)
        return false
    
    }
}

const VerifiedEmail = () => {
    const [verified, setVerified] = useState(false)
    const { token, unxid } = useParams()

    const verify = useCallback(async () => {
        const verified = await makeApiCall(token, unxid)
        setVerified(verified)
    }, [token, unxid])

    useEffect(() => {
        verify()
    }, [verify])



  return (
    <div>
        {
            verified ? <h1> Email Verified! Please Login to continue </h1> : <h1> Verifing... </h1>
        }
    </div>
  )
}

export default VerifiedEmail