import React, { useState } from 'react'
import { format } from 'date-fns'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as jobActions from '../../store/jobs/jobs.actions'
import { RootState } from '../../store/root.reducer'
import { UserData } from '../../store/user/user.reducer'
import { UserJobType } from '../../store/jobs/ts-types/jobTypes'
import { Drawer, Form, Input, Button, Typography } from 'antd'

const { TextArea } = Input
const { Title, Text } = Typography

interface Props {
    userData: UserData,
    jobData: UserJobType,
    drawerOpen: boolean,
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
    createJobBid: (jobId: string, artistId: string, bidData: {bidAmount: string, artistDetails: string}, jobOwnerId: string) => Promise<void>
}

const initialFormValues = {
    bidAmount: '',
    artistDetails: ''
}

const MakeBidDrawer: React.FC<Props> = ({ 
    jobData, 
    drawerOpen, 
    setDrawerOpen, 
    createJobBid,
    userData }) => {
    const [formValues, setFormValues] = useState(initialFormValues)

    const onChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const onSubmit = async () => {
       await createJobBid(jobData.job_id, userData.unxid, formValues, jobData.owner_id)
       setFormValues(initialFormValues)
       return
    }

    return (
        <StyledDrawer 
            title={`Make bid for ${jobData.job_title}`}
            placement='right'
            onClose={() => setDrawerOpen(false)}
            size='large'
            open={drawerOpen}
            onClick={(e) => e.stopPropagation()}
        >
            <MakeBidDrawerStyled>
                <BidHeader>
                    <p>Job Title: {jobData.job_title}</p>
                    <p>Job Budget: {jobData.job_budget}</p>
                    <p>Job Deadline: {format(new Date(jobData.job_expiry_date), 'MMMM dd, yyyy')}</p>
                </BidHeader>
                <FormStyled onFinish={onSubmit}>
                    <Text> Enter Your Bid Amount </Text>
                    <Form.Item  name="bidAmount">
                        <Input name="bidAmount" onChange={onChange} value={formValues.bidAmount} />
                    </Form.Item>
                    <Instructions>
                        <Title level={5}>Details for Your Bid:</Title>
                        <Text type="secondary">
                            Please provide a comprehensive bid. Include your proposed bid amount, a brief overview of your experience, links to or examples of similar work, an estimated timeline for the project, available dates, preliminary design ideas (if applicable), and any other information you think might be helpful for the client to make their decision.
                        </Text>
                    </Instructions>
                    <Form.Item>
                        <TextArea name="artistDetails" rows={8} onChange={onChange} value={formValues.artistDetails} />
                    </Form.Item>
                    <Form.Item>
                        <SubmitButton type="primary" htmlType="submit">Submit Bid</SubmitButton>
                    </Form.Item>
                </FormStyled>
                <BidProcessInfo>
                    <Text>
                        By submitting your bid, you're proposing a price and terms for the job. The client can then choose to accept or decline your bid. If accepted, you'll receive access to the client's contact information to discuss further details and finalize arrangements. Please note, Linkd facilitates connections but does not handle payments or the final agreement process.
                    </Text>
                </BidProcessInfo>
            </MakeBidDrawerStyled>
        </StyledDrawer>
    )
}

const mapStateToProps = (st: RootState) => ({
    userData: st.userData,
})

const ConnectedMakeBidDrawer = connect(mapStateToProps, {
    createJobBid: jobActions.createJobBid
})(MakeBidDrawer)

export default ConnectedMakeBidDrawer

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    background-color: rgb(21, 23, 40);
    color: white;
    font-family: ${props => props.theme.font.family.secondary};

  }
`

const MakeBidDrawerStyled = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
`

const BidHeader = styled.div`
    margin-bottom: 20px;
    p {
        margin-bottom: 10px;
        font-size: 16px;
        font-family: ${props => props.theme.font.family.secondary};


    }
`

const FormStyled = styled(Form)`
    max-width: 100%;
    width: auto;
    font-family: ${props => props.theme.font.family.secondary};



    && .ant-typography {
        color: white;
        font-family: ${props => props.theme.font.family.secondary};
        font-size: 1.2rem;

    }

    .ant-form-item {
        margin-bottom: 20px;
        color: white;

    }
`

const Instructions = styled.div`
    background-color:  #6E3133; // A subtle blue
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    color: white;
    .ant-typography {
        color: white; // Change Ant Design Typography text color here
    font-family: ${props => props.theme.font.secondary};

    }
`

const SubmitButton = styled(Button)`
    background-color: rgba(255, 224, 224, 0.5); // A subtle red
    color: black
    border: none;
    font-family: ${props => props.theme.font.secondary};

`

const BidProcessInfo = styled.div`
    margin-top: 20px;
    background-color: #6E3133; // A very subtle purple
    padding: 15px;
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.5;
    font-family: ${props => props.theme.font.secondary};


    && .ant-typography {
        color: white;
        font-family: ${props => props.theme.font.family.secondary};
        font-size: 1.2rem;


    }

`
