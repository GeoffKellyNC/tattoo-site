import React, { useEffect, useCallback, useState} from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../../store/root.reducer'
import { ArtistAcceptedJobType } from '../../../../store/jobs/ts-types/jobTypes'
import * as jobActions from '../../../../store/jobs/jobs.actions'
import styled from 'styled-components'
import ActiveJobListing from '../../../artistsJobs/ActiveJobListing'


interface Props {
    clientAcceptedJobs: ArtistAcceptedJobType[],
    getClientAcceptedJobs: () => Promise<void>
}

const ClientAcceptedJobs: React.FC<Props> = ({
    clientAcceptedJobs,
    getClientAcceptedJobs
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)


    const loadJobs = useCallback(async () => {
        setIsLoading(true)
        await getClientAcceptedJobs()
        setIsLoading(false)
    }
    , [getClientAcceptedJobs])

    useEffect(() => {
        loadJobs()
    }, [loadJobs])

  return (
    <ClientAcceptedJobsStyled>
        <Header>
            <h1>Accepted Jobs</h1>
            <p className = 'header-p'> Welcome to your accepted jobs dashboard! Here, you'll find all the projects where you've selected and confirmed an artist's bid. Please note that once a job is accepted, it cannot be modified. To view your artist's profile and contact details, simply click on the relevant job. This is your gateway to connect directly with the artist and start discussing your exciting new tattoo project! </p>
        </Header>
        {
            isLoading ? (
                <LoadingContainer>
                    <h1>Loading...</h1>
                </LoadingContainer>
            ) : (
                <JobContainer>
                    {
                        clientAcceptedJobs.length === 0 ? (
                            <h1>No Accepted Jobs</h1>
                        ) : (
                            clientAcceptedJobs.map(job => (
                                <ActiveJobListing 
                                    job = {job}
                                    accountType = 'client'
                                    isJobAccepted = {true}
                                    accetpedJobData = {job}
                                />
                            ))
                        )
                    }
                </JobContainer>
            )
        }
    </ClientAcceptedJobsStyled>
  )
}

const mapStateToProps = (state: RootState) => ({
    clientAcceptedJobs: state.clientAcceptedJobs
})

const ConnectedClientAcceptedJobs = connect(mapStateToProps, {
    getClientAcceptedJobs: jobActions.getClientAcceptedJobs
})(ClientAcceptedJobs)

export default ConnectedClientAcceptedJobs


const ClientAcceptedJobsStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
    color: white;
    font-family: ${pr => pr.theme.font.family.secondary};

    @media (max-width: 768px) {
        width: 100%;
    }



`

const Header = styled.div`
    color: white;
    font-family: ${pr => pr.theme.font.family.secondary};
    font-size: 2rem;
    margin-left: 1rem;
    background-color: ${pr => pr.theme.color.red};

    .header-p {
        font-size: 1.3rem;
        margin: 1rem;
        width: 75%;
    }

    h1 {
        margin: 1rem;
    }

    @media (max-width: 768px) {
        font-size: 1.5rem;
        text-align: center;
        margin: 0;
        margin-left: 0;

        .header-p {
            width: 100%;
            font-size: 1rem;
            text-align: center;
            width: 90%;
        }
    }

`

const LoadingContainer = styled.div`


`


const JobContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 3rem;
    margin: 1rem;
    width: 100%;



    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }


`