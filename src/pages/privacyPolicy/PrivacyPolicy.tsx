import React from 'react'
import styled from 'styled-components'

const PrivacyPolicy: React.FC = () => {
  return (
    <StyledPrivacyPolicy>
        <Header>
            <h1 className='title'>LINKD Privacy Policy</h1>
            <span className='date'>Last Updated: 12/31/2023</span>
        </Header>
        <Section>
            <Subtitle> Introduction </Subtitle>
            <Paragraph>
            This Privacy Policy is designed to help you understand how LINKD ("we," "our," or "us") collects, uses, shares, and safeguards your personal information when you visit our website or use our services.
            </Paragraph>
        </Section>
        <Section>
            <Subtitle> Information We Collect </Subtitle>
            <Paragraph>
                Personal Information: We may collect personal information such as your name, email address, location data, and any other information you voluntarily provide when you interact with our website or services.
            </Paragraph>
            <Paragraph>
                Usage Data: We may collect non-personal information about your visit to our website, including but not limited to your IP address, browser type, and the pages you visit.
            </Paragraph>
        </Section>
        <Section>
            <Subtitle> How We Use Your Information </Subtitle>
            <Paragraph>
                We may use your information to: Providing and improving our services. Responding to your requests or inquiries. Sending you promotional materials or updates (with your consent). Analyzing website usage and trends.
            </Paragraph>
        </Section>
        <Section>
            <Subtitle> How We Share Your Information </Subtitle>
            <Paragraph>
                We do not sell, rent, or trade your personal information to third parties for their marketing purposes. We may share your information with trusted third-party service providers who assist us in operating our website and providing our services, but they are contractually obligated to keep your information confidential.
            </Paragraph>
        </Section>
        <Section>
            <Subtitle> How We Protect Your Information </Subtitle>
            <Paragraph>
                We implement a variety of security measures to maintain the safety of your personal information. We use encryption to protect sensitive information transmitted online and we restrict access to your personal information to employees who need it to perform a specific job. We take reasonable measures to protect your personal information from unauthorized access or disclosure. However, no data transmission over the internet is entirely secure, and we cannot guarantee the absolute security of your information.
            </Paragraph>
        </Section>
        <Section>
            <Subtitle> Third-Party Links </Subtitle>
            <Paragraph>
                Our website may contain links to third-party websites. Any access to and use of such linked websites is not governed by this Privacy Policy, but instead is governed by the privacy policies of those third-party websites. We are not responsible for the information practices of such third-party websites.
            </Paragraph>
        </Section>
        <Section>
            <Subtitle> Children's Privacy </Subtitle>
            <Paragraph>
                Our website and services are not intended for children under the age of 18. We do not knowingly collect personal information from children under the age of 18.
            </Paragraph>
        </Section>
        <Section>
            <Subtitle> Your California Privacy Rights </Subtitle>
            <Paragraph>
                California Civil Code Section 1798.83 permits California residents to request certain information regarding our disclosure of personal information to third parties for their direct marketing purposes. To make such a request, please contact us at the address listed below.
            </Paragraph>
        </Section>
        <Section>
            <Subtitle> Changes to Our Privacy Policy </Subtitle>
            <Paragraph>
                We may update this Privacy Policy from time to time. If we make material changes, we will post the updated policy on this page and update the date at the top of this page.
            </Paragraph>
        </Section>
        <Section>
            <Subtitle>Your Choices </Subtitle>
            <Paragraph>
                You may opt out of receiving promotional emails from us by following the instructions in those emails. If you opt out, we may still send you non-promotional emails, such as those about your account or our ongoing business relations.
            </Paragraph>
        </Section>
        <Section>
            <Subtitle> Contact Us </Subtitle>
            <Paragraph>
                If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:support@getlinkd.ink">
                    support@getlinkd.ink
                </a>
            </Paragraph>
        </Section>
       
    </StyledPrivacyPolicy>
  )
}

export default PrivacyPolicy


const StyledPrivacyPolicy = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: #151728;


`

const Header = styled.div`
    color: #fff;
    font-family: ${({ theme }) => theme.font.family.secondary};
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 10vh;
    background: #151728;
    margin-bottom: 2rem;

    .title {
        font-size: 4rem;
        margin-bottom: 10px;
        font-family: ${({ theme }) => theme.font.family.secondary};
    }

    .date {
        font-size: 2rem;
        font-family: ${({ theme }) => theme.font.family.secondary};
    }




`

const Section = styled.div`

    color: #fff;
    font-family: ${({ theme }) => theme.font.family.secondary};
    font-size: 1.4rem;
    margin-bottom: 1rem;
    width: 80%;
    margin: 0 auto;
    margin-bottom: 2rem;

    a {
        color: ${({ theme }) => theme.color.yellow};
        text-decoration: none;
    }

    @media (max-width: 768px) {
        width: 80%;
        padding: 0;
        align-items: center;
        text-align: center;
    }

    @media (max-width: 480px) {
        width: 80%;
    }




`

const Subtitle = styled.h2`

    font-family: ${({ theme }) => theme.font.family.secondary};
    color: ${({ theme }) => theme.color.yellow};
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

`

const Paragraph = styled.p`
    
        font-family: ${({ theme }) => theme.font.family.secondary};
        font-size: 1.4rem;
        margin-bottom: 1rem;
        width: 80%;
    
        @media (max-width: 768px) {
            font-size: 1.2rem;
            width: 100%;
            text-align: center;
        }
    
        @media (max-width: 480px) {
            font-size: 1rem;
        }


`