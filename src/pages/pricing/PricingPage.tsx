import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface CardTitleProps {
    type: 'artist' | 'client';
  }

const Container = styled.div`
    font-family: Arial, sans-serif;
    height: 100vh;
    color: white;
`;

const TitleSection = styled.div`
    text-align: center;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 600px) { /* Mobile devices */
        height: 20%;
        width: 100%;
    }

    @media (min-width: 601px) and (max-width: 1024px) { /* Tablet devices */
        height: 20%;
    }   
`;

const Title = styled.span`
    font-size: 48px;
    color: ${pr => pr.theme.color.white};
    font-family: ${pr => pr.theme.font.family.secondary};
    font-size: 12rem;    
    border-bottom: 1px solid ${pr => pr.theme.color.white};

    @media (max-width: 600px) { /* Mobile devices */
        font-size: 3rem;
    }

`;

const PricingGrid = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    color: white;

    @media (max-width: 600px) { /* Mobile devices */
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    @media (min-width: 601px) and (max-width: 1024px) { /* Tablet devices */
        flex-direction: column;
        align-items: center;
    }

`;

const PricingCard = styled.div`
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    width: 400px;
    height: auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    text-align: center;
    color: white;
`;

const SubText = styled.span`
    font-size: 1rem;

`

const Section = styled.div`
    border-bottom: 2px solid #e2e2e2;
    padding: 20px;

`;

const CardTitle = styled(Section)<CardTitleProps>`
    font-size: 24px;
    font-weight: bold;
    color: #332c2b;
    text-align: center;
    width: 100%;
    background-color: ${props => props.type === 'artist' ? '#FD1111' : '#ADD8E6'}; 
    color: white;

`;

const Price = styled(Section)`
    font-size: 36px;
    font-weight: 600;
    color: #332c2b;
    text-align: center;
    color: white;
    font-family: ${pr => pr.theme.font.family.secondary};
    display: flex;
    flex-direction: column;
`;

const Description = styled(Section)`
    text-align: left;
    color: #332c2b;
    font-size: 1.4rem;
    font-family: ${pr => pr.theme.font.family.primary};
    color: white;

    
`;

const Button = styled.button`
    background-color: ${pr => pr.theme.color.red};
    color: #ffffff;
    width: 15rem;
    height: 3rem;
    margin: 5rem 0;
    border: none;
    cursor: pointer;
    font-family: ${pr => pr.theme.font.family.primary};
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${pr => pr.theme.color.secondary};
        scale: 1.1;
    }
    
`;


const SubTextBottom = styled.p`
    font-size: 24px;
    color: #332c2b;
    font-weight: thin;
    font-size: 1rem;
    margin-top: 20px;
    color: ${pr => pr.theme.color.white};

`


const ListItem = styled.li`
    list-style-type: none; /* Removes the default dots */
    position: relative;
    padding-left: 30px; /* Creates space for the custom icon */
    font-family: ${pr => pr.theme.font.family.secondary};
    font-size: 2rem;
    color: white;


    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 30px; 
        height: 30px; 
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAABcElEQVR4nO2TvUoDQRSFV0tBjY0SsLHQJmJha6WCBPK354yLP5hYiBba2lilUbCwVJ9B30FfIKCteRFx72xkZNZdSdJtMlpIDgzM7Azn23vnjOeN9JeKyHUBdn8dJGRdyB3nxppc61kDZ5FSm04hotSBKLVn56ZcnhDyzgB5J+amWJwKycUEdChAQ8hbA8y6AQB5DbQF+BRy337T5ImQR04BmjTxAB7SPfH940ipraEhGnjtAthqVjXwmN6LkNemVJrJbCxKFUytlktMnvsAcVW2daHvL4lSKyGwnRliAfGl1mo5U61OauBUgOW+trXt3kcQLKRVZVZsTLbSiux76AEksdXAualU5gZ7yUAnbgu/QfavBXjS5EsKsEkLfZ9DAdIhZOsdmE/PGM8bSyIcxzmzNPDWAwA6NqqavBDySoBLAW4iYGMgQFyJUgUhox8AWfdcygTBtAD3NpZJZBtuAV2xjdfN5rjnWkLWU8BI/1dfeTgDFDbGiEIAAAAASUVORK5CYII=');
        background-repeat: no-repeat;
        background-size: contain;
    }
`;


const PricingPage: React.FC = () => {

    const nav = useNavigate();

    const handleRegisterClick = () => {
        nav('/register');
    }


    return (
        <Container>
            <TitleSection>
                {/* <SubTextTop>Get LINK'D</SubTextTop> */}
                <Title> Pricing </Title>
                <SubTextBottom>Connect Freely, Create Boldly: Exclusive Access for Artists at Just $5.99/month to Revolutionize Your Reach.</SubTextBottom>
            </TitleSection>
            
            <PricingGrid>
                {/* Client Card */}
                <PricingCard>
                    <CardTitle type = 'client' >Client</CardTitle>
                    <Price>FREE</Price>
                    <Description>
                        <ul>
                            <ListItem>Search for artists</ListItem>
                            <ListItem>View artist reviews</ListItem>
                            <ListItem>Contact artists</ListItem>
                            <ListItem>Submit Requests</ListItem>
                            <ListItem>AI Assistant (Coming Soon)</ListItem>
                            <ListItem> MORE FEATURES SOON...</ListItem>
                        </ul>
                    </Description>
                    <Button onClick = {handleRegisterClick}>Sign Up</Button>
                </PricingCard>

                {/* Artist Card */}
                <PricingCard>
                    <CardTitle type = 'artist' >Artist</CardTitle>
                    <Price>
                        Free Limited Time!
                        <SubText> Sign up now. Free for life! </SubText>
                    </Price>
                    

                    <Description>
                        <ul>
                            <ListItem>Search for clients</ListItem>
                            <ListItem>View client profiles</ListItem>
                            <ListItem>See client requests</ListItem>
                            <ListItem>AI Assistant (Coming Soon)</ListItem>
                            <ListItem>No Ads</ListItem>
                            <ListItem> MORE FEATURES SOON...</ListItem>
                        </ul>
                    </Description>
                    <Button onClick = {handleRegisterClick}>Sign Up</Button>
                </PricingCard>
            </PricingGrid>
        </Container>
    );
};

export default PricingPage;
