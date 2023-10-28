import React, { useState } from 'react'
import styled from 'styled-components'
import { Drawer, Button, Spin } from 'antd';
import { connect } from 'react-redux'
import * as jobActions from '../../../../store/jobs/jobs.actions'

import { RiAddCircleLine } from 'react-icons/ri'

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
        skin_condition: '' 
    },
    job_budget: 0,
    job_expiry_date: '',
    job_desc: '',
    job_photos: []
}

interface Props {
    createJob: (job) => Promise<void>
}


const CreateJobForm: React.FC<Props> = ({
    createJob
}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [formValue, setFormValue] = useState(initialFormValues);
    const [loading, setLoading] = useState<boolean>(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
    
        let inputValue = value;
        if (type === "checkbox") {
            inputValue = (e.target as HTMLInputElement).checked.toString();
        }
    
        const keys = name.split('.');
    
        const updatedState = { ...formValue };
        let pointer = updatedState;
    
        keys.forEach((key, index) => {
            if(index === keys.length - 1) {
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
        await createJob(formValue);
        setLoading(false);
        setFormValue(initialFormValues);
        toggleClose();
    }

    const toggleOpen = () => {
        setOpen(true);
    }

    const toggleClose = () => {
        setOpen(false);
    }

    return (
        <ContainerStyled>
            <RiAddCircleLine onClick={toggleOpen} className='add-icon' />
            <Drawer
                title='Add A Job Request'
                placement='right'
                closable={true}
                onClose={toggleClose}
                open={open}
                size='large'
                extra={
                    <>
                        {loading && <Spin size='large' />}
                        <Button type="primary" onClick={handleSubmit}>Submit</Button>
                    </>
                }
            >   <AddJobStyled className = 'add-icon'>
                <div className='form-container'>
                    <input
                        name='job_title'
                        type='text'
                        placeholder='Enter job title'
                        onChange={onChange}
                        value={formValue.job_title}
                        className='add-input f-title'
                    />

                    <input 
                        name='job_location'
                        type='text'
                        placeholder='City Name'
                        value={formValue.job_location}
                        onChange={onChange}
                        className='add-input'
                    />

                    <input 
                        name='job_zipcode'
                        type='text'
                        placeholder='Zip Code'
                        value={formValue.job_zipcode}
                        onChange={onChange}
                        className='add-input'
                    />

                    <select
                        name='job_characteristics.size'
                        onChange={onChange}
                        value={formValue.job_characteristics.size}
                        className='add-input'
                    >
                        <option value=''>Select a size</option>
                        <option value='small'>Small</option>
                        <option value='medium'>Medium</option>
                        <option value='large'>Large</option>
                        <option value='custom'>Custom</option>
                    </select>

                    <select
                        name='job_characteristics.body_placement'
                        onChange={onChange}
                        value={formValue.job_characteristics.body_placement}
                        className='add-input'
                    >
                        <option value=''>Select body placement</option>
                        <option value='arm'>Arm</option>
                        <option value='leg'>Leg</option>
                        <option value='chest'>Chest</option>
                        <option value='back'>Back</option>
                        <option value='head'>Head</option>
                        <option value='neck'>Neck</option>
                        <option value='other'>Other</option>
                    </select>

                    <select
                        name='job_characteristics.pain_tolerance'
                        onChange={onChange}
                        value={formValue.job_characteristics.pain_tolerance}
                        className='add-input'
                    >
                        <option value=''>Select pain tolerance</option>
                        <option value='low'>Low</option>
                        <option value='moderate'>Moderate</option>
                        <option value='high'>High</option>
                    </select>
                    <select
                        name='job_characteristics.color'
                        onChange={onChange}
                        value={formValue.job_characteristics.color}
                        className='add-input'
                    >
                        <option value=''>Select a color</option>
                        <option value='blue'>Color</option>
                        <option value='black'>Black</option>
                        <option value='custom'>Custom</option>
                    </select>

                    <select
                        name='job_characteristics.style'
                        onChange={onChange}
                        value={formValue.job_characteristics.style}
                        className='add-input'
                    >
                        <option value=''>Select a style</option>
                        <option value='abstract'>Abstract</option>
                        <option value='realistic'>Realistic</option>
                        <option value='minimalist'>Minimalist</option>
                        <option value='tribal'>Tribal</option>
                        <option value='geometric'>Geometric</option>
                        <option value = 'portrait'>Portrait</option>
                        <option value = 'other'>Other</option>
                    </select>

                    <label>
                        <input 
                            name='job_characteristics.has_allergy'
                            type='checkbox'
                            checked={formValue.job_characteristics.has_allergy === 'true'}
                            onChange={onChange}
                            className='add-input'
                        />
                        Has Allergy?
                    </label>

                    <select
                        name='job_characteristics.skin_condition'
                        onChange={onChange}
                        value={formValue.job_characteristics.skin_condition}
                        className='add-input'
                    >
                        <option value=''>Select Skin Condition Status</option>
                        <option value='true'>True</option>
                        <option value='false'>False</option>
                    </select>

                    <input 
                        name='job_budget'
                        type='number'
                        placeholder='Budget'
                        value={formValue.job_budget}
                        onChange={onChange}
                        className='add-input'
                    />

                    <input
                        name='job_expiry_date'
                        type='date'
                        value={formValue.job_expiry_date}
                        onChange={onChange}
                        className='add-input'
                    />

                    <textarea
                        name='job_desc'
                        placeholder='Job Description'
                        onChange={onChange}
                        value={formValue.job_desc}
                        className='add-input'
                    ></textarea>
                </div>
                </AddJobStyled>
            </Drawer>
        </ContainerStyled>
    )
}


const ConnectedCreateJobForm = connect(null, {
    createJob: jobActions.createJob
})(CreateJobForm)

export default ConnectedCreateJobForm;

const ContainerStyled = styled.div`

    .add-icon {
        font-size: 2rem;
        color: ${(pr) => pr.theme.color.red};
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            transform: scale(1.1);
            opacity: 0.8;
        }
    }

`

const AddJobStyled = styled.div`

    .form-container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .add-input, textarea, select {
            padding: 0.65rem 0.75rem;
            border-radius: 4px;
            border: 1px solid #d9d9d9;
            transition: border 0.3s ease;
            font-size: 1rem;

            &:hover {
                border-color: ${(pr) => pr.theme.color.red};
            }

            &:focus {
                border-color: ${(pr) => pr.theme.color.blue};
                outline: none;
            }
        }

        .f-title {
            font-size: 1.25rem;
            font-weight: bold;
            padding-left: 0.75rem;
            padding-right: 0.75rem;
        }

        label {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            .add-input {
                margin-right: 0.5rem;
            }
        }
    }

    .drawer-footer {
        display: flex;
        justify-content: flex-end;
        padding: 10px 20px;
    }
`;