import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../store/root.reducer'
import { UserData } from '../../store/user/user.reducer'
import { UserJobType } from '../../store/jobs/ts-types/jobTypes'
import { Drawer } from 'antd'

interface Props {
    userData: UserData,
    jobData: UserJobType,
    drawerOpen: boolean,
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>

}


const MakeBidDrawer: React.FC<Props> = ({
    userData,
    jobData,
    drawerOpen,
    setDrawerOpen
}) => {
  return (
    <Drawer 
        title = {`Make bid for ${jobData.job_title}`}
        placement = 'right'
        onClose = {() => setDrawerOpen(false)}
        width = {400}
        open = {drawerOpen}
    >
        <MakeBidDrawerStyled>
            <div className = 'img-container'>
                <img src = {jobData.job_photos[0]} alt = 'job-img' />
            </div>
            <div className = 'job-info'>
                <div className = 'job-title'>{jobData.job_title}</div>
                <div className = 'job-owner'>{jobData.owner_user_name}</div>
                <div className = 'job-description'>{jobData.job_desc}</div>
            </div>
        </MakeBidDrawerStyled>
    </Drawer>
  )
}

const mapStateToProps = (st: RootState) => ({
    userData: st.userData,
})

const ConnectedMakeBidDrawer = connect(mapStateToProps, null)(MakeBidDrawer)

export default ConnectedMakeBidDrawer

const MakeBidDrawerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .img-container {
        width: 100%;
        height: 200px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .job-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .job-title {
            font-size: 1.5rem;
            font-weight: 600;
        }
        .job-owner {
            font-size: 1.2rem;
            font-weight: 500;
        }
        .job-description {
            font-size: 1rem;
            font-weight: 400;
        }
    }
`