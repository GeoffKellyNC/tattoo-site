import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../store/root.reducer'
import { UserJobType } from '../../store/jobs/ts-types/jobTypes'

import ActiveJobListing from './ActiveJobListing'

import bannerImg from '../../assets/test-banner.png'

interface Props {
  allActiveJobs: UserJobType[]
}

const ArtistViewActiveJob: React.FC<Props> = ({
  allActiveJobs
}) => {
  return (
    <StyledActiveJobs>
      <TitleContainer>
        <div className = 'title-text-container'>
          <span className='title'> ACTIVE JOBS </span>
          <span className = 'subtitle'> Welcome to the Linkd Job Board – Where Art Meets Opportunity!</span>
          <p className = 'title-description'> This is your canvas for new possibilities. Explore the latest tattoo projects posted by enthusiasts eager for your artistry. Each job listed here is an active opportunity waiting for your unique touch. Browse through, find projects that resonate with your style, and connect with clients looking to bring their vision to life. Express your interest in a job, and if it's a match, we'll notify you. It's time to ink your next masterpiece and grow your clientele with Linkd! </p>
        </div>
        <BannerImg src = {bannerImg} alt = 'banner' />
      </TitleContainer>
      <div className = 'search-container'>
        <input type = 'text' placeholder = 'Search' />
      </div>
      <JobsContainer>
        {
          allActiveJobs.length < 1 ? (
            <div> No Active Jobs </div>
          ) : (
            allActiveJobs.map((jobObj: UserJobType) => {
            return <ActiveJobListing key = {jobObj.job_id} job = {jobObj} />
            })
          )
        }
      </JobsContainer>
    </StyledActiveJobs>
  )
}

const mapStateToProps = (st: RootState) => ({
  allActiveJobs: st.allActiveJobs
})

const ConnectedArtistViewActiveJob = connect(mapStateToProps, null)(ArtistViewActiveJob)

export default ConnectedArtistViewActiveJob

const StyledActiveJobs = styled.div`
  color: white;

`

const TitleContainer = styled.div`
  width: 90%;
  height: 500px;
  margin: 4rem auto;
  display: flex;
  background: rgb(245,89,63);
  background: linear-gradient(180deg, rgba(245,89,63,0.4) 29%, rgba(21,23,40,1) 88%);
  border-radius: 10px;
  font-family: ${pr => pr.theme.font.family.primary};

  .title {
    font-size: 2rem;
    font-weight: bold;
    margin: 2rem 0;
    font-family: ${pr => pr.theme.font.family.primary};
  }

  .title-text-container {
    width: 40%;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }


`

const BannerImg = styled.img`
  width: 70%;
  height: 70%;
  rotate: 3deg;
  object-fit: cover;
  position: absolute;
  top: 1%;
  left: 37%;

`

const JobsContainer = styled.div`
  width: 80%;
  margin: 5rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;

`