import React from 'react'
import styled from 'styled-components'


// Components
import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import HowItWorks from '../howItWorks/HowItWorks'

const Home: React.FC = () => {



  return (
    <StyledHome>
      <Header />
      <About />
      <HowItWorks />
      <Contact />
    </StyledHome>
  )
}

export default Home

const StyledHome = styled.div`
  background: #151728;
  height: 100vh;

`