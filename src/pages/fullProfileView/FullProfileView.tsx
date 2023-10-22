/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import { RootState } from '../../store/root.reducer'
import * as userActions from '../../store/user/user.actions'
import { UserFullProfile } from '../../store/user/types/profileFullType'
import styled from 'styled-components';


interface Props {
    viewUserDetails: UserFullProfile,
    getFullUserProfileDetails: (unxid: string) => Promise<boolean>
}


const FullProfileView: React.FC<Props> = ({
    viewUserDetails,
    getFullUserProfileDetails
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { unxid } = useParams()

    const setUp = useCallback(async () => {
        setIsLoading(true)
        await getFullUserProfileDetails(unxid as string)
        setIsLoading(false)

    },[getFullUserProfileDetails, setIsLoading, unxid])

    useEffect(() => {
        setUp()
    }, [setUp])

  return (
    <ViewFull>
        {
            isLoading ? (
                <div className = 'loading'>
                    <span className = 'loading-text'> Loading Profile...</span>
                </div>
            ) : (
                <div>
                    <span> Viewing: </span>
                    <span>{ viewUserDetails.user_name }</span>
                </div>
            )
        } 
    </ViewFull>
  )
}

export default connect((st: RootState) => ({
    viewUserDetails: st.viewUserDetails
}),{
    getFullUserProfileDetails: userActions.getFullUserProfileDetails
}) (FullProfileView)


const ViewFull = styled.div`
    color: ${pr => pr.theme.color.white};
`