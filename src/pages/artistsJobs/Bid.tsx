/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react'
import { JobBidType, UserJobType } from '../../store/jobs/ts-types/jobTypes'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as jobActions from '../../store/jobs/jobs.actions'

import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";



interface Props {
    bidData: JobBidType;
    getArtistDataForBid: (artistId: string) => Promise<any>;
    jobData: UserJobType;
    bidDrwaerOpen: boolean;
    clientAcceptBid: (job_id: string, artist_id: string) => Promise<boolean>
}

const Bid: React.FC<Props> = ({
    bidData,
    getArtistDataForBid,
    jobData,
    bidDrwaerOpen,
    clientAcceptBid
}) => {
    const [artistData, setArtistData] = useState<any>(null)
    const [gettingArtistData, setGettingArtistData] = useState<boolean>(true)
    const [wantsComments, setWantsComments] = useState<boolean>(false)


    const getArtistData = useCallback(async () => {
        try {
            setArtistData(await getArtistDataForBid(bidData.artist_id))

            setGettingArtistData(false)
            
        } catch (error) {
            console.log(error)
            return
        }
    }, [bidData, getArtistDataForBid])



    useEffect(() => {
        getArtistData()
    }, [getArtistData])

    const acceptBid = async () => {
        await clientAcceptBid(jobData.job_id, bidData.artist_id)
        return
    }

  return (
    <>
        {
            gettingArtistData || !artistData ? (
                <span> Getting  Data... </span>
            ) : (
                <DataContainer onClick = {() => setWantsComments(!wantsComments)}>
                    <div className = 'data-container'>
                        <span className = 'data-text'> Bid From:  </span>
                        <span className = 'artist-name'>{ artistData.user.display_name } </span>
                    </div>
                    <div className = 'data-container'>
                        <span className = 'data-text'> Bid Amount:  </span>
                        <span className = 'bid-amount'> ${bidData.proposed_price} </span>
                    </div>
                    <NavLink to={`/user/artist/${bidData.artist_id}`} > View Artist Profile </NavLink>
                    {wantsComments ? <MdExpandMore className = 'expand-icon' onClick={() => setWantsComments(false)} /> : <MdExpandLess className = 'expand-icon' onClick={() => setWantsComments(true)} />}
                    {wantsComments && (
                        <div className = 'comments-container'>
                            <span className = 'comments-title'> Artists Comments </span>
                            <span className = 'comments'> {
                                !bidData.artist_comments || bidData.artist_comments.length < 1 ? 'No Comments from Artist' : bidData.artist_comments
                            } </span>
                        </div>
                    )}
                    {
                        bidData.is_active && wantsComments && (
                            <div className = 'button-container'>
                                <button
                                    onClick={() => acceptBid()}
                                    className = 'accept'> Accept Bid </button>
                                <button className = 'decline'> Decline Bid </button>
                            </div>
                        ) 
                    }
                </DataContainer>
            )
        }
    </>
  )
}

const ConnectedBid = connect(null, {
    clientAcceptBid: jobActions.clientAcceptBid,
    getArtistDataForBid: jobActions.getArtistDataForBid
})(Bid)
export default ConnectedBid



const DataContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    color: white;
    border: 1px solid white;
    padding: 5px;
    background-color:${props => props.theme.color.red};
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: #6E3133;
        color: white;
        border: none;
        scale: 1.03;
    }

    .data-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .bid-amount {
        color: #6E3;
    }

    .data-text {
        font-size: 1.2rem;
        text-transform: uppercase;
    }

    span {
        margin: 5px;
        font-size: 1.2rem;
    }

    a {
        color: white;
        text-decoration: none;
        margin: 3px;
        padding: 3px;
        border: 1px solid white;

        &:hover {
            background: ${props => props.theme.color.pink};
        }
    }

    .expand-icon {
        font-size: 2rem;
        margin: 5px;
        cursor: pointer;
    }

    .comments-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

        .comments-title {
            font-size: 1.2rem;
            margin: 5px;
        }

        .comments {
            font-size: 1rem;
            margin: 5px;
        }
    }

    .button-container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;

        button {
            margin: 5px;
            padding: 5px;
            border: 1px solid white;
            background-color: ${props => props.theme.color.red};
            color: white;
            font-size: 1.2rem;
            cursor: pointer;

            &:hover {
                background-color: #6E3133;
                color: white;
                border: none;
            }
        }
    }

`