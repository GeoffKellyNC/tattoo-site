import React from 'react'
import styled from 'styled-components'


// Images
import step1Img from '../../assets/artist-work-1.png'
import step2Img from '../../assets/artist-work-2.png'
import step3Img from '../../assets/artist-works3.png'
import step4Img from '../../assets/artist-work-4.png'


const iconLink = 'https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/66/FFFFFF/external-Tattoo-russian-smashingstocks-detailed-outline-smashing-stocks.png'

const ArtistHowItWorks: React.FC = () => {
  return (
    <StyledArtistHowItWorks>
        <Row reverse = {true}>
            <RowContents>
                <RowTitle>
                    <img className = 'icon-img' src={iconLink} alt="icon" />
                    Set Up Your Artist Profile
                </RowTitle>
                <RowParagraph>
                    Kickstart your journey on LINKD as an artist by creating a dynamic profile. This is where you showcase your unique style and skills to potential clients. Fill in your personal and contact information, and take a step further by integrating your booking system directly into your profile. This seamless connection not only makes it easier for clients to schedule appointments but also streamlines your workflow. Don’t forget to link your website and upload your portfolio. Your portfolio is the window into your artistic world, allowing clients to explore your previous works and envision what you can create for them. A compelling and complete profile is your first step towards attracting the right clients and expanding your artistic reach on LINKD.
                </RowParagraph>
            </RowContents>
            <RowImage src = {step1Img} />
        </Row>
        <Row reverse = {false}>
            <RowContents>
                <RowTitle>
                    <img className = 'icon-img' src={iconLink} alt="icon" />
                    Discover Local Tattoo Opportunities
                </RowTitle>
                <RowParagraph>
                    Expand your artistic horizons with LINKD by exploring a curated list of client job postings in your vicinity. Utilize the search feature to set a radius around your current location, bringing you closer to potential clients. Delve into each posting to view clients’ photos, read detailed descriptions of their desired tattoos, and gain valuable insights. This includes understanding any special circumstances or medical conditions that might influence the tattoo process, as well as their budget. This step is more than just finding a job; it’s about connecting with clients whose ideas resonate with your artistic style, ensuring a fulfilling and creative partnership.
                </RowParagraph>
            </RowContents>
            <RowImage src = {step2Img} />
        </Row>
        <Row reverse = {true}>
            <RowContents>
                <RowTitle> 
                    <img className = 'icon-img' src={iconLink} alt="icon" />
                    Place Your Bid and Connect with Clients
                </RowTitle>
                <RowParagraph>
                    Seize the opportunity to bring your art to life by bidding on client jobs that align with your expertise and style. In this crucial step, you'll submit a bid stating your price for the tattoo project, along with any additional details you wish to share with the client. This is your moment to highlight your unique approach and why you're the best fit for their vision. Once your bid is submitted, the client has the option to accept or decline it. If accepted, your profile, including your contact information, will be shared with the client, opening the door for direct communication. This is where your journey with the client truly begins, allowing you to discuss the project in detail and set the foundation for a successful collaboration.
                </RowParagraph>
            </RowContents>
            <RowImage src = {step3Img} />
        </Row>
        <Row reverse = {false}>
            <RowContents>
                <RowTitle> 
                    <img className = 'icon-img' src={iconLink} alt="icon" />
                    Grow Your Portfolio and Network
                </RowTitle>
                <RowParagraph>
                    Enhance Your Artistic Reputation with LINKD: Every completed tattoo project is an opportunity to enrich your portfolio and strengthen your professional network. As you collaborate with clients and bring their visions to life, your portfolio on LINKD becomes a testament to your skill and versatility. Encourage your clients to rate and review their experience with you. These ratings are more than just feedback—they are powerful endorsements that elevate your profile, attract future clients, and build your reputation in the tattoo community. Remember, each project is a chance to refine your artistry, connect with a diverse clientele, and carve out a unique space for yourself in the world of tattoo art. Embrace these opportunities to grow and thrive as an artist on LINKD.
                </RowParagraph>
            </RowContents>
            <RowImage src = {step4Img} />
        </Row>
    </StyledArtistHowItWorks>
  )
}

export default ArtistHowItWorks


const StyledArtistHowItWorks = styled.div`
display: flex;
flex-direction: column;
margin-top: 5rem;

@media (max-width: 1000px) {
    margin-top: 2rem;
}
`;

const Row = styled.div<{ reverse: boolean }>`
display: flex;
flex-direction: ${pr => pr.reverse ? 'row-reverse' : 'row'};
margin-bottom: 3rem; // Adjust spacing between rows
gap: 15rem; // Adjust spacing between image and text

@media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    gap: 2rem;
    width: 100%;
}
`;

const RowContents = styled.div`
display: flex;
flex-direction: column;
width: 50%; // Adjust width for better spacing

@media (max-width: 1000px) {
    width: 90%; // Increase width on mobile
}
`;


const RowTitle = styled.span`
display: flex;
align-items: center;
gap: 1rem;
font-size: 2rem;
font-weight: bold;
margin: 1rem 0 1rem -4rem;
font-family: ${pr => pr.theme.font.family.secondary};
color: ${pr => pr.theme.color.red};

.icon-img {
    width: 3rem;
    height: auto;
    color: white;
}

@media (max-width: 1000px) {
    font-size: 1.5rem; // Adjust font size for mobile
    margin: 1rem 0 1rem -1rem;
}
`;

const RowParagraph = styled.p`
color: white;
font-size: 1.2rem;
font-family: ${pr => pr.theme.font.family.secondary};
width: 100%; // Adjust for full width within the container

@media (max-width: 1000px) {
    font-size: 1rem; // Adjust font size for mobile
}
`;

const RowImage = styled.img`
width: 30%;
height: auto; // Adjust for maintaining aspect ratio

@media (max-width: 1000px) {
    width: 100%; // Increase size on mobile
    height: 300px;
    margin-top: 1rem;
}
`;