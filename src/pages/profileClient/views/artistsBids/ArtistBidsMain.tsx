import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../../../store/root.reducer'
import { UserData } from '../../../../store/user/user.reducer'
import { JobBidType } from '../../../../store/jobs/ts-types/jobTypes'

import ArtistBidItem from './ArtistBidItem'

interface Props {
  userData: UserData,
  artistCurrentBids: JobBidType[],
}

const ArtistBidsMain: React.FC<Props> = ({
  userData,
  artistCurrentBids,
}) => {
  return (
    <ArtistBidsBody>
        <ArtBidTop>
          <span> {userData.display_name}'s Active Bids!' </span>
        </ArtBidTop>
        <BidsContainer>
          { 
            artistCurrentBids.length > 0 ? (
              artistCurrentBids.map((bid, idx) => {
               return <ArtistBidItem bidData = {bid} key = {idx} />
              })
            ) : <span className = 'no-bids-text'> NO CURRENT BIDS </span>
          }
        </BidsContainer>
    </ArtistBidsBody>
  )
}

const mapStateToProps = (state: RootState) => ({
  userData: state.userData,
  artistCurrentBids: state.artistCurrentBids,
})

const ConnectedArtistBidsMain = connect(mapStateToProps, null)(ArtistBidsMain)


export default ConnectedArtistBidsMain


const ArtistBidsBody = styled.div`
  


`

const ArtBidTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 2rem;
  margin: 2rem 0;
  font-weight: 500;
  color: #fff;
  font-family: ${props => props.theme.font.family.secondary};

  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
  }

  @media (max-width: 400px) {
    font-size: 0.8rem;
  }

  @media (max-width: 350px) {
    font-size: 0.7rem;
  }

`



const BidsContainer = styled.div`

  display: flex;
  flex-direction: row;
  width: 85%;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-between;


  @media (max-width: 1024px) {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }


`