import React from 'react'
import styled from 'styled-components'

import UsersList from './UsersList'

const AppUsersHome: React.FC = () => {
  return (
    <StyledHome>
        <div className = 'header'>
            <h1> LINKD Users </h1>
            <span className = 'tagline'> Users are based on your current location. </span>
        </div>
        <UsersList />
    </StyledHome>
  )
}

export default AppUsersHome


const StyledHome = styled.div`
  background: #151728;
  color: #fff;
  font-family: ${({ theme }) => theme.font.family.secondary};

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 10vh;
    background: #151728;
    font-size: 2rem;
    color: #fff;
    font-family: ${({ theme }) => theme.font.family.secondary};
    margin-bottom: 2rem;
  }

`