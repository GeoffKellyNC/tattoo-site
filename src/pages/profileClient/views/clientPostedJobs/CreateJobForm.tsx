import React, { useState } from 'react';
import styled from 'styled-components';
import { Drawer, Button, Spin } from 'antd';
import { connect, useDispatch } from 'react-redux';
import * as jobActions from '../../../../store/jobs/jobs.actions';
import { UserFullProfile, ContactDetailFull } from '../../../../store/user/types/userStateTypes';
import * as notifyTypes from '../../../../store/notifications/notify.types';

const MAX_DESC_CHAR_COUNT = 1000;
const MAX_TITLE_CHAR_COUNT = 50;

const initialFormValues = {
  job_title: '',
  job_location: '',
  job_zipcode: '',
  job_characteristics: {
    size: '',
    color: '',
    style: '',
    body_placement: '',
    pain_tolerance: '',
    has_allergy: '',
    skin_condition: '',
  },
  job_budget: 0,
  job_expiry_date: '',
  job_desc: '',
  job_photos: [],
};

interface Props {
  createJob: (job) => Promise<void>;
  userData: UserFullProfile;
  userContactProfile: ContactDetailFull;
}

const CreateJobForm: React.FC<Props> = ({ createJob, userData, userContactProfile }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [formValue, setFormValue] = useState(initialFormValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [descCharCount, setDescCharCount] = useState<number>(MAX_DESC_CHAR_COUNT);
  const [titleCharCount, setTitleCharCount] = useState<number>(MAX_TITLE_CHAR_COUNT);

  const dispatch = useDispatch();

  const validateForm = () => {
    if(formValue.job_title === '') {
      dispatch({
        type: notifyTypes.SET_NOTIFY,
        payload: {
            message: 'Please enter a job title',
            type: 'error',
        },
      });
      return false;
    }

    if(formValue.job_title.length > MAX_TITLE_CHAR_COUNT) {
      dispatch({
        type: notifyTypes.SET_NOTIFY,
        payload: {
            message: `Job title cannot exceed ${MAX_TITLE_CHAR_COUNT} characters`,
            type: 'error',
        },
      });
      return false;
    }

    if(formValue.job_location === '') {
      dispatch({
        type: notifyTypes.SET_NOTIFY,
        payload: {
            message: 'Please enter a job location',
            type: 'error',
        },
      });
      return false;
    }

    if(formValue.job_zipcode.length !== 5 || isNaN(Number(formValue.job_zipcode))) {
      dispatch({
        type: notifyTypes.SET_NOTIFY,
        payload: {
            message: 'Please enter a valid zipcode',
            type: 'error',
        },
      });
      return false;
    }

    if(formValue.job_characteristics.size === '') {
      dispatch({
        type: notifyTypes.SET_NOTIFY,
        payload: {
            message: 'Please select a size',
            type: 'error',
        },
      });
      return false;
    }

    if(formValue.job_characteristics.body_placement === '') {
      dispatch({
        type: notifyTypes.SET_NOTIFY,
        payload: {
            message: 'Please select a body placement',
            type: 'error',
        },
      });
      return false;
    }

    if(formValue.job_characteristics.pain_tolerance === '') {
      dispatch({
        type: notifyTypes.SET_NOTIFY,
        payload: {
            message: 'Please select a pain tolerance',
            type: 'error',
        },
      });
      return false;
    }

    if(formValue.job_characteristics.color === '') {
      dispatch({
        type: notifyTypes.SET_NOTIFY,
        payload: {
            message: 'Please select a color',
            type: 'error',
        },
      });
      return false;
    }

    if(formValue.job_characteristics.style === '') {
      dispatch({
        type: notifyTypes.SET_NOTIFY,
        payload: {
            message: 'Please select a style',
            type: 'error',
        },
      });
      return false;
    }

    if(formValue.job_budget === 0) {
      dispatch({
        type: notifyTypes.SET_NOTIFY,
        payload: {
            message: 'Please enter a budget',
            type: 'error',
        },
      });
      return false;
    }

    if(formValue.job_desc.length === 0) {
      dispatch({
        type: notifyTypes.SET_NOTIFY,
        payload: {
            message: 'Please enter a job description',
            type: 'error',
        },
      });
      return false;
    }

    if(formValue.job_desc.length > MAX_DESC_CHAR_COUNT) {
      dispatch({
        type: notifyTypes.SET_NOTIFY,
        payload: {
            message: `Job description cannot exceed ${MAX_DESC_CHAR_COUNT} characters`,
            type: 'error',
        },
      });
      return false;
    }

    return true;


  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if(name === 'job_desc') {
        setDescCharCount(MAX_DESC_CHAR_COUNT - value.length);
        if(value.length > MAX_DESC_CHAR_COUNT) {
          dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                message: `Job description cannot exceed ${MAX_DESC_CHAR_COUNT} characters`,
                type: 'error',
            },
          });
          return;
        }
    }

    if(name === 'job_title') {
        setTitleCharCount(MAX_TITLE_CHAR_COUNT - value.length);
        if(value.length > MAX_TITLE_CHAR_COUNT) {
          dispatch({
            type: notifyTypes.SET_NOTIFY,
            payload: {
                message: `Job title cannot exceed ${MAX_TITLE_CHAR_COUNT} characters`,
                type: 'error',
            },
          });
          return;
        }
    }

    let inputValue = value;
    if (type === 'checkbox') {
      inputValue = (e.target as HTMLInputElement).checked.toString();
    }

    const keys = name.split('.');

    const updatedState = { ...formValue };
    let pointer = updatedState;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        pointer[key] = inputValue;
      } else {
        pointer = pointer[key];
      }
    });

    setFormValue(updatedState);
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log(formValue);
    const finalData = {
      ...formValue,
      owner_user_name: userData.user_name,
    };
    const isValid = validateForm();
    if(!isValid) {
      setLoading(false);
      return;
    }
    await createJob(finalData);
    setLoading(false);
    setFormValue(initialFormValues);
    toggleClose();
    dispatch({
      type: notifyTypes.SET_NOTIFY,
      payload: {
          message: 'Click on the job to add photos',
          type: 'success',
      },
    });
  };

  const checkIfClientHasContactInfo = (): boolean => {
    for(const [key, value] of Object.entries(userContactProfile)) {
      if(key.startsWith('contact_')){
        if(value.public && value.value !== '') {
          return true;
        }
      }
    }
    return false;
  }

  const toggleOpen = () => {
    const hasContact: boolean = checkIfClientHasContactInfo();
    if(!hasContact){
      dispatch({
        type: notifyTypes.SET_NOTIFY,
        payload: {
            message: 'Please add contact information before creating a job',
            type: 'error',
        },
      });
      return;
    }
    setOpen(true);
  };

  const toggleClose = () => {
    setOpen(false);
  };



  return (
    <ContainerStyled>
      <button className='create-job-btn' onClick={toggleOpen}> Create Job </button>
      <StyledDrawer
        title="Add A Job Request"
        placement="right"
        closable={true}
        onClose={toggleClose}
        open={open}
        size="large"
        extra={
          <>
            {loading && <Spin size="large" />}
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        }
      >
        <FormContainer>
            <label htmlFor="job_title" className="f-label">
              Job Title
            </label>
            <span className="desc-char-count">{titleCharCount} / {MAX_TITLE_CHAR_COUNT}</span>
            <input
              name="job_title"
              type="text"
              id="job_title"
              placeholder="Enter job title"
              onChange={onChange}
              value={formValue.job_title}
              className="add-input f-title"
            />
            <label htmlFor="job_location" className="f-label">
              Job Location
            </label>
            <input
              name="job_location"
              type="text"
              id="job_location"
              placeholder="City Name"
              value={formValue.job_location}
              onChange={onChange}
              className="add-input"
            />

            <input
              name="job_zipcode"
              type="text"
              id="job_zipcode"
              placeholder="Zip Code"
              value={formValue.job_zipcode}
              onChange={onChange}
              className="add-input"
            />

            <label htmlFor="job_characteristics.size" className="f-label">
              Select a size
            </label>
            <select
              name="job_characteristics.size"
              id="job_characteristics.size"
              onChange={onChange}
              value={formValue.job_characteristics.size}
              className="add-input"
            >
              <option value="">Select a size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="custom">Custom</option>
            </select>

            <label htmlFor="job_characteristics.body_placement" className="f-label">
              Select body placement
            </label>
            <select
              name="job_characteristics.body_placement"
              id="job_characteristics.body_placement"
              onChange={onChange}
              value={formValue.job_characteristics.body_placement}
              className="add-input"
            >
              <option value="">Select body placement</option>
              <option value="arm">Arm</option>
              <option value="leg">Leg</option>
              <option value="chest">Chest</option>
              <option value="back">Back</option>
              <option value="head">Head</option>
              <option value="neck">Neck</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="job_characteristics.pain_tolerance" className="f-label">
              Select pain tolerance
            </label>
            <select
              name="job_characteristics.pain_tolerance"
              id="job_characteristics.pain_tolerance"
              onChange={onChange}
              value={formValue.job_characteristics.pain_tolerance}
              className="add-input"
            >
              <option value="">Select pain tolerance</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>

            <label htmlFor="job_characteristics.color" className="f-label">
              Select a color
            </label>
            <select
              name="job_characteristics.color"
              id="job_characteristics.color"
              onChange={onChange}
              value={formValue.job_characteristics.color}
              className="add-input"
            >
              <option value="">Select a color</option>
              <option value="blue">Color</option>
              <option value="black">Black</option>
              <option value="custom">Custom</option>
            </select>

            <label htmlFor="job_characteristics.style" className="f-label">
              Select a style
            </label>
            <select
              name="job_characteristics.style"
              id="job_characteristics.style"
              onChange={onChange}
              value={formValue.job_characteristics.style}
              className="add-input"
            >
              <option value="">Select a style</option>
              <option value="abstract">Abstract</option>
              <option value="realistic">Realistic</option>
              <option value="minimalist">Minimalist</option>
              <option value="tribal">Tribal</option>
              <option value="geometric">Geometric</option>
              <option value="portrait">Portrait</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="job_characteristics.has_allergy" className="f-label">
              Has Allergy?
            </label>
            <label className="checkbox-label">
              <input
                name="job_characteristics.has_allergy"
                type="checkbox"
                checked={formValue.job_characteristics.has_allergy === 'true'}
                onChange={onChange}
                className="add-input"
              />
              Yes
            </label>

            <label htmlFor="job_characteristics.skin_condition" className="f-label">
              Select Skin Condition Status
            </label>
            <select
              name="job_characteristics.skin_condition"
              id="job_characteristics.skin_condition"
              onChange={onChange}
              value={formValue.job_characteristics.skin_condition}
              className="add-input"
            >
              <option value="">Select Skin Condition Status</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>

            <label htmlFor="job_budget" className="f-label">
              Budget
            </label>
            <input
              name="job_budget"
              type="number"
              id="job_budget"
              placeholder="Budget"
              value={formValue.job_budget}
              onChange={onChange}
              className="add-input"
            />

            <label htmlFor="job_expiry_date" className="f-label">
              Expiry Date
            </label>
            <input
              name="job_expiry_date"
              type="date"
              id="job_expiry_date"
              value={formValue.job_expiry_date}
              onChange={onChange}
              className="add-input"
            />

            <label htmlFor="job_desc" className="f-label">
              Job Description
            </label>
            <span className="desc-char-count">{descCharCount} / {MAX_DESC_CHAR_COUNT}</span>
            <textarea
              name="job_desc"
              id="job_desc"
              placeholder="Job Description"
              onChange={onChange}
              value={formValue.job_desc}
              className="add-input"
            ></textarea>
        </FormContainer>
      </StyledDrawer>
    </ContainerStyled>
  );
};

const mapStateToProps = (st) => ({
  userData: st.userData,
  userContactProfile: st.userContactProfile,
});

const ConnectedCreateJobForm = connect(mapStateToProps, {
  createJob: jobActions.createJob,
})(CreateJobForm);

export default ConnectedCreateJobForm;

const StyledDrawer = styled(Drawer)`

    .ant-drawer-content-wrapper {
        background: ${pr => pr.theme.color.white};
    }

    .ant-drawer-header {
        background: ${pr => pr.theme.color.red};
        color: ${pr => pr.theme.color.white};
        font-family: ${pr => pr.theme.font.family.secondary};
    }

    .ant-drawer-title {
        font-family: ${pr => pr.theme.font.family.secondary};
    }

    .ant-drawer-body {
        font-family: ${pr => pr.theme.font.family.secondary};
        background: rgba(0,0,0,0.8);
    }


`

const ContainerStyled = styled.div`
  .create-job-btn {
    width: 100%;
    padding: 0.3rem 1rem;
    border: none;
    background-color: ${pr => pr.theme.color.red};
    font-family: ${pr => pr.theme.font.family.secondary};
    font-size: ${pr => pr.theme.font.size.s};
    color: white;
    cursor: pointer;
  }

    @media (min-width: 601px) and (max-width: 1024px) {
        .create-job-btn {
        width: 100%;
        }
    }
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;

    .f-label {
        font-size: 1.2rem;
        margin-top: 20px;
        font-family: ${pr => pr.theme.font.family.secondary};
    }

    input, select {
        margin-top: 10px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-family: ${pr => pr.theme.font.family.secondary};
        background: ${pr => pr.theme.color.red};
        color: white;
    }

    input:focus, select:focus, textarea:focus {
        outline: none;
    }

    input::placeholder, select::placeholder, textarea::placeholder {
        font-family: ${pr => pr.theme.font.family.secondary};
        color: white;
    }

    label {
        color: white;
        font-family: ${pr => pr.theme.font.family.secondary};
    }

    select {
        color: white;
    }

    textarea {
        margin-top: 10px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-family: ${pr => pr.theme.font.family.secondary};
        background: ${pr => pr.theme.color.red};
        resize: none;
        height: 10rem;
        color: white;
    }

    .desc-char-count {
        font-size: 0.8rem;
        color: white;
        font-family: ${pr => pr.theme.font.family.secondary};
    }

    
`;
