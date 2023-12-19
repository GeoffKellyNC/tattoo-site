import React from 'react'
import styled from 'styled-components'
import bannerImg from '../../../assets/test-banner.png'


const ArtistJobListTitle: React.FC = () => {
  return (
    <TitleContainer>
        <div className = 'title-text-container'>
        <span className='title'> ACTIVE JOBS </span>
        <span className = 'subtitle'> Welcome to the Linkd Job Board – Where Art Meets Opportunity!</span>
        <p className = 'title-description'> This is your canvas for new possibilities. Explore the latest tattoo projects posted by enthusiasts eager for your artistry. Each job listed here is an active opportunity waiting for your unique touch. Browse through, find projects that resonate with your style, and connect with clients looking to bring their vision to life. Express your interest in a job, and if it's a match, we'll notify you. It's time to ink your next masterpiece and grow your clientele with Linkd! </p>
        </div>
        <BannerImg src = {bannerImg} alt = 'banner' />
  </TitleContainer>
  )
}

export default ArtistJobListTitle


const TitleContainer = styled.div`
  width: 90%;
  margin: 2rem auto;
  display: flex;
  flex-direction: column; /* Stack elements vertically on smaller screens */
  align-items: center; /* Center align items for smaller screens */
  background: linear-gradient(180deg, rgba(245,89,63,0.4) 29%, rgba(21,23,40,1) 88%);
  border-radius: 10px;
  font-family: ${pr => pr.theme.font.family.primary};

  .title {
    font-size: 1.5rem; /* Smaller font size for mobile */
    font-weight: bold;
    margin: 1rem 0;
    text-align: center; /* Center text on smaller screens */
  }

  .subtitle {
    font-size: 1rem; /* Adjust subtitle font size */
    text-align: center;
    margin: 0.5rem 0; /* Add margin for spacing */
  }

  .title-description {
    font-size: 0.9rem; /* Adjust paragraph font size */
    text-align: justify;
    margin: 0.5rem 0; /* Add margin for spacing */
  }

  .title-text-container {
    width: 80%; /* Full width on smaller screens */
    padding: 1rem;
    display: flex;
    flex-direction: column; /* Ensure elements are stacked vertically */
    align-items: center; /* Center align items */
  }

  @media (min-width: 601px) and (max-width: 1024px) { /* Tablets */
    .title {
      font-size: 1.75rem; /* Slightly larger font size for tablets */
    }

    .title-text-container {
      width: 60%; /* Adjust width for tablet screens */
      padding: 2rem;
    }
  }

  @media (min-width: 1025px) { /* Larger screens */
    height: 500px;
    flex-direction: row; /* Use row direction for larger screens */
    align-items: flex-start; /* Align items to start for larger screens */

    .title {
      font-size: 2rem; /* Original font size for larger screens */
      margin: 2rem 0;
    }

    .title-text-container {
      width: 40%; /* Original width on larger screens */
      padding: 3rem;
      align-items: flex-start; /* Align items to start for larger screens */
    }
  }
`;

const BannerImg = styled.img`
  width: 60%;
  max-height: 70%;
  rotate: 3deg;
  object-fit: cover;
  position: absolute;
  top: 1%;
  left: 37%;

  @media (max-width: 1024px) { /* Mobile devices */
    display: none;
  }



`