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


`

const Header = styled.div`
    color: white;
    font-family: ${pr => pr.theme.font.family.secondary};
    font-size: 3rem;
    margin: 1rem;

`

const LoadingContainer = styled.div`


`


const JobContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 1rem;
    width: 100%;

`