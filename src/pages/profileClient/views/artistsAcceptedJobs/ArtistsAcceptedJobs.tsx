import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../../store/root.reducer'
import { ArtistAcceptedJobType } from '../../../../store/jobs/ts-types/jobTypes'
import * as jobActions from '../../../../store/jobs/jobs.actions'
import styled from 'styled-components'

import ActiveJobListing from '../../../artistsJobs/ActiveJobListing'

interface Props {
    artistAcceptedJobs: ArtistAcceptedJobType[];
    getArtistAcceptedJobs: () => Promise<void>
}

const ArtistsAcceptedJobs: React.FC<Props> = ({
    artistAcceptedJobs,
    getArtistAcceptedJobs
}) => {
    const [loading, setLoading] = useState<boolean>(false)

    const loadArtistAcceptedJobs = useCallback(async () => {
        setLoading(true)
        await getArtistAcceptedJobs()
        setLoading(false)
    }

    , [getArtistAcceptedJobs])

    useEffect(() => {
        loadArtistAcceptedJobs()
    }, [loadArtistAcceptedJobs])


  return (
    <AcceptedJobsContainer>
        <Header>
            <span className = 'title-text'> Artists Accepted Jobs </span>
        </Header>
        {
            !loading ? (
                <>
                {
                    !artistAcceptedJobs  || artistAcceptedJobs.length === 0 ? (
                        <NoJobsContainer>
                            <span> No Active Jobs... </span>
                        </NoJobsContainer>
                    ) : (
                        <JobsContainer>
                            { artistAcceptedJobs.map(job => (
                                <ActiveJobListing 
                                    job = {job}
                                    accountType = 'artist'
                                    isJobAccepted = {true}
                                />
                            ))}
                        </JobsContainer>
                    )
                }
            </>
            ) : (
                <div> Loading... </div>
            )
        }
    </AcceptedJobsContainer>
  )
}

const mapStateToProps = (st: RootState) => ({
    artistAcceptedJobs: st.artistAcceptedJobs
})

const ConnectedArtistsAcceptedJobs = connect(mapStateToProps, {
    getArtistAcceptedJobs: jobActions.getArtistAcceptedJobs
})(ArtistsAcceptedJobs)

export default ConnectedArtistsAcceptedJobs


const AcceptedJobsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
    color: white;
    font-family: ${pr => pr.theme.font.family.secondary};

    .title-text {
        font-size: 2rem;
        font-weight: bold;
    }



`


const Header = styled.div`
    color: white;
    font-family: ${pr => pr.theme.font.family.secondary};
    font-size: 3rem;

`

const NoJobsContainer = styled.div`


`

const JobsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;
`