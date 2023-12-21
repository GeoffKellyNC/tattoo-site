/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react'
import styled from 'styled-components'
import { connect, useDispatch } from 'react-redux'
import { RootState } from '../../../../../store/root.reducer'
import * as userActions from '../../../../../store/user/user.actions'
import * as notifyTypes from '../../../../../store/notifications/notify.types'

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

const TAG_LINE_MAX_CHARS = 50
const ABOUT_ME_MAX_CHARS = 500
const TATTOO_STORY_MAX_CHARS = 1000


const EditClientProfile: React.FC<EditClientProfileProps> = ({
    userProfileDetails,
    setOpen,
    updateClientProfileDetails
}) => {
    const initialFormValues = { ...userProfileDetails}

    const [formValues, setFormValues] = useState(initialFormValues)
    const [tagLineChars, setTagLineChars] = useState<number>(TAG_LINE_MAX_CHARS)
    const [aboutMeChars, setAboutMeChars] = useState<number>(ABOUT_ME_MAX_CHARS)
    const [tattooStoryChars, setTattooStoryChars] = useState<number>(TATTOO_STORY_MAX_CHARS)

    const dispatch = useDispatch()

    const formValidation = () => {
        if(!formValues.location_city || !formValues.location_state || !formValues.location_zip){
            dispatch({
                type: notifyTypes.SET_NOTIFY,
                payload: {
                    message: 'Please fill out all location fields',
                    type: 'error'
                }
            })

            return false
        }

        if(formValues.location_zip.length !== 5){
            dispatch({
                type: notifyTypes.SET_NOTIFY,
                payload: {
                    message: 'Please enter a valid zipcode',
                    type: 'error'
                }
            })

            setFormValues({
                ...formValues,
                location_zip: ''
            })

            return false
        }

        if(formValues.profile_tagline.length > TAG_LINE_MAX_CHARS){
            dispatch({
                type: notifyTypes.SET_NOTIFY,
                payload: {
                    message: 'Tagline must be less than 50 characters',
                    type: 'error'
                }
            })

            return false
        }

        if(formValues.profile_description.length > ABOUT_ME_MAX_CHARS){
            dispatch({
                type: notifyTypes.SET_NOTIFY,
                payload: {
                    message: 'About Me must be less than 500 characters',
                    type: 'error'
                }
            })

            return false
        }

        if(formValues.personal_tattoo_story.length > TATTOO_STORY_MAX_CHARS){
            dispatch({
                type: notifyTypes.SET_NOTIFY,
                payload: {
                    message: 'Tattoo Story must be less than 1000 characters',
                    type: 'error'
                }
            })

            return false
        }
}


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if(e.target.name === 'profile_tagline'){
            setTagLineChars(TAG_LINE_MAX_CHARS - e.target.value.length)
        }

        if(e.target.name === 'profile_description'){
            setAboutMeChars(ABOUT_ME_MAX_CHARS - e.target.value.length)
        }

        if(e.target.name === 'personal_tattoo_story'){
            setTattooStoryChars(TATTOO_STORY_MAX_CHARS - e.target.value.length)
        }



        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const isValid = formValidation()
        if(!isValid) return
        await updateClientProfileDetails(formValues)
        setFormValues(initialFormValues)
        setOpen(false)
    }


  return (
    <EditClientProfileStyled>
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
            <span className = 'chars_left'> { tagLineChars } characters (50max) </span>
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
                value = { !formValues.number_of_tattoos ? 0 : formValues.number_of_tattoos }
                onChange={handleChange}
                className = 'form-input number_of_tattoos'
            />
            <span className = 'label'> About Me: </span>
            <span className = 'chars_left'> { aboutMeChars } characters (500max) </span>
            <textarea 
                name = 'profile_description'
                value = { formValues.profile_description }
                onChange={handleChange}
                className = 'form-input profile_description long-form'
                placeholder={ userProfileDetails.profile_description ? '' : 'No About Me Set' }
            />
            <span className = 'label'> Tattoo Story: </span>
            <span className = 'chars_left'> { tattooStoryChars } characters (1000max) </span>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;


    .form-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
    }

    .label {
        margin: 1rem 0;
        font-size: 1.2rem;
        font-family: ${pr => pr.theme.font.family.secondary};
    }

    .label-tag {
        margin-bottom: 0;
    }

    .form-input {
        width: 100%;
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid #555;
        font-size: 1.2rem;
        font-family: ${pr => pr.theme.font.family.secondary};
        background-color: ${pr => pr.theme.color.red};
        color: white;
    }

    input::placeholder {
        color: white;
    }

    input:focus {
        outline: none;
    }

    textarea {
        resize: none;
        height: 10rem;
        color: white;
    }

    textarea::placeholder {
        color: white;
    }

    textarea:focus {
        outline: none;
    }

    .long-form {
        width: 100%;
    }

    button {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        border: none;
        background-color: ${pr => pr.theme.color.red};
        color: white;
        font-size: 1.2rem;
        font-family: ${pr => pr.theme.font.family.secondary};
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
    }

    button:hover {
        background-color: #ff0000;
    }

    .chars_left {
        font-size: 0.8rem;
        color: white;
        font-family: ${pr => pr.theme.font.family.secondary};
    }


`;
