/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react'
import { JobBidType, UserJobType } from '../../store/jobs/ts-types/jobTypes'

interface Props {
    bidData: JobBidType;
    getArtistDataForBid: (artistId: string) => Promise<any>;
    jobData: UserJobType;
    bidDrwaerOpen: boolean;
}

const Bid: React.FC<Props> = ({
    bidData,
    getArtistDataForBid,
    jobData,
    bidDrwaerOpen
}) => {
    const [artistData, setArtistData] = useState<any>(null)
    const [gettingArtistData, setGettingArtistData] = useState<boolean>(true)


    const getArtistData = useCallback(async () => {
        try {
            console.log('GETTING ARTIST DATA') //! REMOVE
            const artistData = await getArtistDataForBid(bidData.artist_id)
            console.log('ARTIST DATA: ', artistData) //! REMOVE
            setArtistData(artistData)
            console.log('SETTING GETTING ARTIST DATA TO FALSE') //! REMOVE
            setGettingArtistData(false)
            
        } catch (error) {
            console.log(error)
            return
        }
    }, [bidData, getArtistDataForBid])


    useEffect(() => {
        getArtistData()
    }, [getArtistData, bidDrwaerOpen])


  return (
    <div>
        {
            gettingArtistData || !artistData ? (
                <span> Getting  Data... </span>
            ) : (
                <>
                    <span> Job Title:  {jobData.job_title} </span>
                    <span>Bid From:  { artistData.user.display_name } </span>
                    <span> Bid Amount:  {bidData.proposed_price} </span>
                </>
            )
        }
    </div>
  )
}

export default Bid