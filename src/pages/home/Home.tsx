import React from 'react'
import styled from 'styled-components'


// Components
import Header from './components/Header'
import About from './components/About'

const Home: React.FC = () => {



  return (
    <StyledHome>
      <Header />
      <About />
    </StyledHome>
  )
}

export default Home

const StyledHome = styled.div`
  background: #151728;
  height: 100vh;

`