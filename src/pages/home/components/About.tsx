import React from 'react';
import styled from 'styled-components';

import landing_img1 from '../../../assets/landing1.png';
import landing_img2 from '../../../assets/landing2.png';
import landing_img3 from '../../../assets/landing3.png';

const About: React.FC = () => {
  return (
    <>
      <Header>
          <Title>LINKD: Redefining the Art of Connection</Title>
      </Header>
      <AboutContainer>
        <LeftContainer>
          <Content>
            <Paragraph>Welcome to LINKD, an innovative web platform where the vibrant world of tattoo artistry meets cutting-edge technology...</Paragraph>
            
            {/* Subsections for Clients and Artists */}
            <SubSection>
              <Subtitle>For Clients: Discover Your Dream Tattoo</Subtitle>
              <Paragraph>Dive into a diverse world of artistic talent right at your fingertips. LINKD offers a seamless experience for tattoo enthusiasts to connect with professional artists. Whether you're envisioning your first tattoo or adding to your collection, our user-friendly platform makes it easy to post your ideas, browse artist portfolios, and select the perfect match based on style, location, and reviews. And the best part? It's absolutely free for clients.</Paragraph>
            </SubSection>

            <SubSection>
              <Subtitle>For Artists: Elevate Your Artistry</Subtitle>
              <Paragraph>Are you an artist seeking to expand your client base and showcase your art? LINKD is your digital canvas. For a minimal monthly fee, gain access to a plethora of potential clients. Create your unique profile, display your portfolio, bid on projects that resonate with your style, and grow your clientele – all within a community that celebrates and supports your craft.</Paragraph>
            </SubSection>

            <SubSection>
              <Subtitle>Local Connections, Global Reach</Subtitle>
              <Paragraph>Whether you're looking for a local artist or planning your next piece while traveling, LINKD's location-based search ensures you're only a click away from finding the right artist, anywhere, anytime.</Paragraph>
            </SubSection>

            <SubSection>
              <Subtitle>Join LINKD Today</Subtitle>
              <Paragraph>Embark on a journey of artistic discovery and connection with LINKD. For artists and tattoo enthusiasts alike, we're more than just a platform; we're a community. Join us today and weave your story into the vibrant tapestry of LINKD.</Paragraph>
            </SubSection>
          </Content>
        </LeftContainer>
        <RightContainer>
            <img src={landing_img1} alt="landing_img1" className="first" />
            <img src={landing_img2} alt="landing_img2" className="second" />
            <img src={landing_img3} alt="landing_img3" className="third" />
          </RightContainer>
      </AboutContainer>
    </>
  );
}

export default About;

const AboutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
  width: 100%;
  height: 100%;
  background: #151728;
  color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  width: 60%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -8rem;

  @media (max-width: 768px) {
    width: 100%;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    gap: 1rem;
  }
`;

const RightContainer = styled.div`
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  img {
    width: 40%;
    height: auto;
    transition: transform 0.3s ease;
    &:nth-child(1) {
        transform: translateY(-20px) rotate(-10deg);
    }
    &:nth-child(2) {
        transform: translateY(10px) rotate(5deg);
    }
    &:nth-child(3) {
        transform: translateY(30px) rotate(-5deg);
    }
    

    @media (max-width: 768px) {
      width: 60%;
      transform: none;
      margin-top: 2rem;
    }

    @media (max-width: 480px) {
      width: 80%;
      transform: none;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
`;

const Title = styled.h2`
  font-family: ${pr => pr.theme.font.family.secondary};
  font-size: 5rem;
  text-align: center;
  color: ${pr => pr.theme.color.pink};

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const SubSection = styled.section`
`;

const Subtitle = styled.h3`
  font-family: ${pr => pr.theme.font.family.secondary};
  color: ${pr => pr.theme.color.pink};
  font-size: 2rem;
  border-bottom: 1px solid ${pr => pr.theme.color.pink};
  width: 40%;

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
  font-family: ${pr => pr.theme.font.family.primary};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  width: 80%;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    width: 95%;
  }
`;
