import React from 'react'
import styled from 'styled-components'

const ClientPostedJobs: React.FC = () => {
  return (
    <StyledClientPostedJobs>
        <div className='title-container'>
            <span className='title'>My Posted Jobs</span>
        </div>
    </StyledClientPostedJobs>
  )
}

export default ClientPostedJobs


const StyledClientPostedJobs = styled.div`
    color: white;
    font-size: 6rem;
`