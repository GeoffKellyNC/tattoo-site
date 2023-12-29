import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { RootState } from '../../../../../../store/root.reducer'
import * as jobActions from '../../../../../../store/jobs/jobs.actions'

// Imported Types
import { ArtistAcceptedJobType  } from '../../../../../../store/jobs/ts-types/jobTypes'

interface Props {
    artistAcceptedJobs: ArtistAcceptedJobType[];
    getArtistAcceptedJobs: () => Promise<void>
}

const ArtistQuickLinks: React.FC<Props> = ({
    artistAcceptedJobs,
    getArtistAcceptedJobs
}) => {

    useEffect(() => {
        getArtistAcceptedJobs()
    }, [getArtistAcceptedJobs])

  return (
    <Container>
        <div className = 'data-container'>
            <span className='data-title'> Active Jobs:  </span>
            <span className = 'data-text'>
                {
                    artistAcceptedJobs.length
                }
            </span>
        </div>
        <div className = 'data-container'>
            <span className = 'data-title'> Current Rating: </span>
            <span className = 'data-text'> Coming Soon! </span>
        </div>
    </Container>
  )
}


const mapStateToProps = (state: RootState) => ({
        artistAcceptedJobs: state.artistAcceptedJobs
    })

const ConnectedArtistQuickLinks = connect(mapStateToProps, {
    getArtistAcceptedJobs: jobActions.getArtistAcceptedJobs
})(ArtistQuickLinks)

export default ConnectedArtistQuickLinks


const Container = styled.div`
background-color: #151728;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 20px;
    height: auto;
    display: flex;
    gap: 1rem;


    .data-container {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }

    .data-title {
        font-family: ${props => props.theme.font.family.secondary};
        font-size: 1.2rem;
        color: #fff;
        font-weight: 500;
        color: ${props => props.theme.color.pink};
    }

    .data-text {
        font-family: ${props => props.theme.font.family.secondary};
        font-size: 1.2rem;
        color: #fff;
        font-weight: 300;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;
    }

    @media (max-width: 500px) {
        .data-title {
            font-size: 1rem;
        }

        .data-text {
            font-size: 1rem;
        }
    }

    @media (max-width: 400px) {
        .data-title {
            font-size: 0.8rem;
        }

        .data-text {
            font-size: 0.8rem;
        }
    }

    @media (max-width: 350px) {
        .data-title {
            font-size: 0.7rem;
        }

        .data-text {
            font-size: 0.7rem;
        }
    }



`