import React, { useEffect, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as jobActions from '../../store/jobs/jobs.actions'
import { ArtistFullProfile } from '../../store/user/types/userStateTypes'
import { RootState } from '../../store/root.reducer'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ArtistsProfileData from './ArtistsProfileData'

interface Props {
    artistFullData: ArtistFullProfile;
    getArtistDataForBid: (artistId: string) => Promise<ArtistFullProfile | boolean>
}


const ArtistFullProfileView: React.FC<Props> = ({
    artistFullData,
    getArtistDataForBid
}) => {
    const [loadingData, setLoadingData] = useState<boolean>(false)

    const { unxid } = useParams()

    const loadArtistData = useCallback(async () => {
        console.log('Loading artist data...') //! REMOVE
        setLoadingData(true)
        const res = await getArtistDataForBid(unxid)
        console.log('Artist data: ', res) //! REMOVE
        
        if (!res) {
            setLoadingData(false)
        } else {
            setLoadingData(false)
        }
    }
        , [getArtistDataForBid, unxid])

    useEffect(() => {
        loadArtistData()        
    }, [loadArtistData])



  return (
    <ArtistContainer>
    {
    loadingData || !artistFullData ? (
        <div>Loading...</div>
    ) :  
    (
        <>
            <ArtistsProfileData data = {artistFullData} />  
        </>
    )
    }
    </ArtistContainer>
  )
}


const mapStateToProps = (st: RootState) => ({
    artistFullData: st.artistFullData
})

const ConnectedArtistFullProfile = connect(mapStateToProps, {
    getArtistDataForBid: jobActions.getArtistDataForBid
})(ArtistFullProfileView)


export default ConnectedArtistFullProfile


const ArtistContainer = styled.div`
    color: white;
    width: 90%;
    height: 100vh;
    margin: 0 auto;

    
    
`