import React from 'react'
import styled from 'styled-components'


// Components
import Header from './components/Header'


const Home: React.FC = () => {



  return (
    <StyledHome>
        <Header />
    </StyledHome>
  )
}

export default Home

const StyledHome = styled.div`
  background: black;
  height: 100vh;

`