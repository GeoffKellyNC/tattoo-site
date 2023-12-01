import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../../../store/root.reducer'
import { UserData } from '../../../../store/user/user.reducer'
import { JobBidType } from '../../../../store/jobs/ts-types/jobTypes'

import ArtistBidItem from './ArtistBidItem'

interface Props {
  userData: UserData,
  artistCurrentBids: JobBidType[]
}

const ArtistBidsMain: React.FC<Props> = ({
  userData,
  artistCurrentBids
}) => {
  return (
    <ArtistBidsBody>
        <ArtBidTop>
          <span> {userData.display_name}'s Active Bids!' </span>
        </ArtBidTop>
        <BidsContainer>
          { 
            artistCurrentBids.length > 1 ? (
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
  artistCurrentBids: state.artistCurrentBids
})

const ConnectedArtistBidsMain = connect(mapStateToProps, null)(ArtistBidsMain)


export default ConnectedArtistBidsMain


const ArtistBidsBody = styled.div`


`

const ArtBidTop = styled.div`


`

const BidsContainer = styled.div`


`