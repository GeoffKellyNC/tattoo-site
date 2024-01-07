import React from 'react'
import styled from 'styled-components'

interface Props {
    aboutText: string,
    storyText: string,
    displayName: string,
}

const AboutSection: React.FC<Props> = ({
    aboutText,
    storyText,
    displayName
}) => {
  return (
    <AboutSectionStyled>
        <Header>
            <Title> About {displayName} </Title>
            <Paragraph> {aboutText} </Paragraph>
        </Header>
        <Header>
            <Title> {displayName}'s Story </Title>
            <Paragraph> {storyText} </Paragraph>
        </Header>
    </AboutSectionStyled>
  )
}

export default AboutSection


const AboutSectionStyled = styled.div`
    display: flex;
    flex-direction: column;


`

const Header = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

`

const Title = styled.span`
    font-size: 2rem;
    font-family: ${(pr) => pr.theme.font.family.secondary};
    font-weight: 100;
    color: ${(pr) => pr.theme.color.red};
    padding: 0 20px;

`

const Paragraph = styled.p`
    font-size: 1.2rem;
    font-family: ${(pr) => pr.theme.font.family.secondary};
    font-weight: 100;
    margin-top: 10px;
    line-height: 1.5;
    text-align: justify;
    padding: 0 20px;



`