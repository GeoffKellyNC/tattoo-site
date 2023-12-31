import React from 'react';
import styled from 'styled-components';


import about_discover from '../../../assets/about1.png';
import about_eleveate from '../../../assets/aboutelevate.png'
import about_global from '../../../assets/about-global1.png'
import about_join from '../../../assets/about-join.png'




const About: React.FC = () => {
  return (
    <div className = 'main-container'>
      <Header>
          <Title>LINKD: <span className = 'redefine-text'> Redefining </span> the Art of Connection</Title>
      </Header>
      <AboutContainer>
        <SubSection>
          <Content>
            <Subtitle>For Clients: Discover Your Dream Tattoo</Subtitle>
            <Paragraph>Dive into a diverse world of artistic talent right at your fingertips. LINKD offers a seamless experience for tattoo enthusiasts to connect with professional artists. Whether you're envisioning your first tattoo or adding to your collection, our user-friendly platform makes it easy to post your ideas, browse artist portfolios, and select the perfect match based on style, location, and reviews. And the best part? It's absolutely free for clients.</Paragraph>
          </Content>
          <SubSectionImage src={about_discover} alt="landing_img1" />
        </SubSection>

        <SubSection reverse = {true}>
          <Content reverse = {true}>
            <Subtitle>For Artists: Elevate Your Artistry</Subtitle>
            <Paragraph>Are you an artist seeking to expand your client base and showcase your art? LINKD is your digital canvas. For a minimal monthly fee, gain access to a plethora of potential clients. Create your unique profile, display your portfolio, bid on projects that resonate with your style, and grow your clientele – all within a community that celebrates and supports your craft.
            </Paragraph>
          </Content>
          <SubSectionImage src={about_eleveate} alt="landing_img2" />
        </SubSection>

        <SubSection>
          <Content>
            <Subtitle>Local Connections, Global Reach</Subtitle>
            <Paragraph>Whether you're looking for a local artist or planning your next piece while traveling, LINKD's location-based search ensures you're only a click away from finding the right artist, anywhere, anytime.</Paragraph>
          </Content>
          <SubSectionImage src={about_global} alt="landing_img3" />
        </SubSection>

        <SubSection reverse = {true}>
          <Content reverse = {true}>
            <Subtitle>Join LINKD Today</Subtitle>
            <Paragraph>Embark on a journey of artistic discovery and connection with LINKD. For artists and tattoo enthusiasts alike, we're more than just a platform; we're a community. Join us today and weave your story into the vibrant tapestry of LINKD.</Paragraph>
          </Content>
          <SubSectionImage src={about_join} alt="landing_img4" />
        </SubSection>
      </AboutContainer>
    </div>
  );
}

export default About;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 0;
  width: 100%;
  height: 100%;
  background: rgb(97,37,216);
  background: linear-gradient(180deg, rgba(97,37,216,1) 40%, rgba(64,1,189,1) 73%);73%);
  color: #fff;

  @media (max-width: 768px) {
    padding: 0;
    justify-content: center;
    align-items: center;
  }
`;

const SubSection = styled.section<{ reverse?: boolean }>`
  display: flex;
  flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubSectionImage = styled.img`
  width: 42%;
  transition: transform 0.3s ease;
  height: 62%;
  border-radius: 0.5rem 0 0 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Content = styled.div<{ reverse?: boolean }>`
  width: 60%;
  padding: ${props => props.reverse ? '0 0 0 9rem' : '0 0 0 4rem'};

  @media (max-width: 768px) {
    width: 80%;
    padding: 0;
    align-items: center;
    text-align: center;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(97,37,216);



`;

const Title = styled.h2`
  font-family: ${pr => pr.theme.font.family.secondary};
  font-size: 5rem;
  text-align: center;
  color: white;

  .redefine-text {
    color: ${pr => pr.theme.color.yellow};
  }

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h3`
  font-family: ${pr => pr.theme.font.family.secondary};
  color: ${pr => pr.theme.color.yellow};
  font-size: 3rem;
  width: 70%;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    width: 100%;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Paragraph = styled.p`
  font-family: ${pr => pr.theme.font.family.secondary};
  font-size: 1.4rem;
  margin-bottom: 1rem;
  width: 80%;
  color: white;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    width: 95%;
  }
`;