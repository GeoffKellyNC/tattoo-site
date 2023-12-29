import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const BASE_URL = import.meta.env.VITE_REACT_APP_API_ENDPOINT

const makeApiCall = async (token: string, unxid: string): Promise<boolean> => {
    try {
        console.log("MAKING API CALL")
       const res =  await axios.get(`${BASE_URL}/auth/verify-email?token=${token}&unxid=${unxid}`)

       return res.data.data

    } catch (error) {
        console.log(error)
        return false
    
    }
}

const VerifiedEmail: React.FC = () => {
    const [verified, setVerified] = useState(false)

    console.log("VERIFY PAGE")
   
    const params = useParams()
    console.log(params)

    const { token, unxid } = params as { token: string, unxid: string }

    const verify = useCallback(async () => {
        const verified = await makeApiCall(token, unxid)
        setVerified(verified)
    }, [token, unxid])

    useEffect(() => {
        verify()
    }, [verify])



  return (
    <Container>
        {
            verified ? <h1> Email Verified! Please Login to continue </h1> : <h1> Verifing... </h1>
        }
    </Container>
  )
}

export default VerifiedEmail

const Container = styled.div`
    color: white;
    font-family: ${pr => pr.theme.font.family.secondary};
`