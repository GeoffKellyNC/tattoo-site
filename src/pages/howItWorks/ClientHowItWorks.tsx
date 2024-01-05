import React from 'react'
import styled from 'styled-components'


// Images
import step1Img from '../../assets/client-works-1.png'
import step2Img from '../../assets/client-works-2.png'
import step3Img from '../../assets/client-works-3.png'
import step4Img from '../../assets/client-works-4.png'


const iconLink = 'https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/66/FFFFFF/external-Tattoo-russian-smashingstocks-detailed-outline-smashing-stocks.png'

const ClientHowItWorks: React.FC = () => {
  return (
    <StyledClientHowItWorks>
        <Row reverse = {false}>
            <RowContents>
                <RowTitle>
                    <img className = 'icon-img' src={iconLink} alt="icon" />
                    Begin Your Tattoo Adventure with LINKD
                </RowTitle>
                <RowParagraph>
                    Embark on your tattoo journey by setting up your LINKD profile. It’s a simple process where you enter your location—key to connecting you with skilled artists nearby. Fill in your contact details and other personal information to make your profile complete. This ensures that the artists you find are not just talented, but also perfectly aligned with your vision and easily reachable. Start here to transform your tattoo ideas into reality!
                </RowParagraph>
            </RowContents>
            <RowImage src = {step1Img} />
        </Row>
        <Row reverse = {true}>
            <RowContents>
                <RowTitle>
                    <img className = 'icon-img' src={iconLink} alt="icon" />
                    Craft Your Tattoo Request 
                </RowTitle>
                <RowParagraph>
                    Transform your vision into a tangible request with LINKD. In this step, you'll provide key details about your desired tattoo, including a thorough description and your budget. Feel empowered to express the essence of what you're looking for – whether it's a specific style, symbolism, or a personal story. Additionally, you can upload photos of your drawings or any visual concepts that inspire you. This rich detail helps artists understand your vision and craft a proposal that aligns perfectly with your expectations. Post your request and get ready to explore bids from talented artists who are eager to bring your idea to life!
                </RowParagraph>
            </RowContents>
            <RowImage src = {step2Img} />
        </Row>
        <Row reverse = {false}>
            <RowContents>
                <RowTitle> 
                    <img className = 'icon-img' src={iconLink} alt="icon" />
                    Explore Artist Bids 
                </RowTitle>
                <RowParagraph>
                    Watch as artists bring your tattoo idea closer to reality! After posting your request, an array of bids from interested artists will start to flow in. Each bid is not just a price proposal; it's a gateway to an artist's world. You'll gain access to their profiles, showcasing their portfolios and past client reviews. This wealth of information empowers you to make a choice that resonates with your vision. Review each bid, delve into the artists' backgrounds, and decide whether to embrace their artistic approach or continue your search. With LINKD, the power to choose the perfect artist for your tattoo is in your hands.
                </RowParagraph>
            </RowContents>
            <RowImage src = {step3Img} />
        </Row>
        <Row reverse = {true}>
            <RowContents>
                <RowTitle> 
                    <img className = 'icon-img' src={iconLink} alt="icon" />
                    Confirm Your Artist and Start the Collaboration 
                </RowTitle>
                <RowParagraph>
                    Congratulations on finding the ideal artist for your tattoo! Now, it's time to seal the deal. By selecting an artist, you initiate a new phase of your tattoo journey. The artist will be notified of your choice, and their profile, complete with contact details, will be linked to your job. This is your gateway to start a conversation about your tattoo, discussing specifics and scheduling a meeting to finalize your design. It's an exciting opportunity to connect with your artist and ensure they align perfectly with your vision. Remember, with LINKD, you're at the helm of your tattoo experience. If at any point you feel the need to change your choice, you have the flexibility to cancel and select a different artist. We're here to ensure your tattoo journey is as unique and personal as the art you're about to create.
                </RowParagraph>
            </RowContents>
            <RowImage src = {step4Img} />
        </Row>
    </StyledClientHowItWorks>
  )
}

export default ClientHowItWorks


const StyledClientHowItWorks = styled.div`
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



