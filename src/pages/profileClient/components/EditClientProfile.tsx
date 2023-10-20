/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { RootState } from '../../../store/root.reducer'
import * as userActions from '../../../store/user/user.actions'

interface EditClientProfileProps {
    userProfileDetails: RootState['userProfileDetails'],
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    updateClientProfileDetails: (data: RootState['userProfileDetails']) => Promise<void>,
}

const statesArray: string[] = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
    "Wisconsin", "Wyoming", "Puerto Rico"
];


const EditClientProfile: React.FC<EditClientProfileProps> = ({
    userProfileDetails,
    setOpen,
    updateClientProfileDetails
}) => {
    const initialFormValues = { ...userProfileDetails}

    const [formValues, setFormValues] = useState(initialFormValues)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await updateClientProfileDetails(formValues)
        setFormValues(initialFormValues)
        setOpen(false)
    }


  return (
    <EditClientProfileStyled>
        <div>
            <span> Edit Client Profile </span>
        </div>
        <div className = 'form-container'>
            <span className = 'label'> City: </span>
            <input 
                type = 'text'
                name = 'location_city'
                value = { formValues.location_city }
                onChange={handleChange}
                className = 'form-input location_city'
                placeholder={ userProfileDetails.location_city ? '' : 'No City Set' }
            />
            <span className = 'label'> State: </span>
            <select
                name = 'location_state'
                value = { formValues.location_state }
                onChange={handleChange}
                className = 'form-input location_state'
            >
                <option value = ''> { formValues.location_state ? formValues.location_state : 'Select a State' } </option>
                {statesArray.map((state, idx) => (
                    <option key = {idx} value = {state}> {state} </option>
                ))}
            </select>
            <span className = 'label'> Zipcode: </span>
            <input 
                type = 'text'
                name = 'location_zip'
                value = { formValues.location_zip }
                onChange={handleChange}
                className = 'form-input location_zip'
                placeholder={ userProfileDetails.location_zip ? '' : 'No Zipcode Set' }
            />
            <span className = 'label label-tag'> Tag Line: </span>
            <input 
                type = 'text'
                name = 'profile_tagline'
                value = { formValues.profile_tagline }
                onChange={handleChange}
                className = 'form-input tag_line'
                placeholder={ userProfileDetails.profile_tagline ? '' : 'No Tag Line Set' }
            />
            <span className = 'label'> Number of Tattoos: </span>
            <input 
                type = 'number'
                name = 'number_of_tattoos'
                value = { formValues.number_of_tattoos }
                onChange={handleChange}
                className = 'form-input number_of_tattoos'
            />
            <span className = 'label'> About Me: </span>
            <textarea 
                name = 'profile_description'
                value = { formValues.profile_description }
                onChange={handleChange}
                className = 'form-input profile_description long-form'
                placeholder={ userProfileDetails.profile_description ? '' : 'No About Me Set' }
            />
            <span className = 'label'> Tattoo Story: </span>
            <textarea 
                name = 'personal_tattoo_story'
                value = { formValues.personal_tattoo_story }
                onChange={handleChange}
                className = 'form-input tattoo_story long-form'
                placeholder={ userProfileDetails.personal_tattoo_story ? '' : 'No Tattoo Story Set' }
            />
            

        </div>
        <button onClick={ handleSubmit }> Update </button>
    </EditClientProfileStyled>
  )
}

export default connect((st: RootState) => ({
    userProfileDetails: st.userProfileDetails,

}),{
    updateClientProfileDetails: userActions.updateClientProfileDetails,
}) (EditClientProfile)



const EditClientProfileStyled = styled.div`
    color: white;
    .form-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .label {
        font-weight: bold;
    }
    .form-input {
        padding: 8px;
        border-radius: 5px;
        border: 1px solid gray;
        background-color: #2c2c2c;
        color: white;
    }
    .long-form {
        height: 100px;
        resize: vertical;
    }
    button {
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        background-color: #1890ff;
        color: white;
        cursor: pointer;
        margin-top: 10px;
        &:hover {
            background-color: #40a9ff;
        }
    }
`;
