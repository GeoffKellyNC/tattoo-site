import React, { useState } from 'react';
import { ArtistsUserType } from '../../../../../store/user/types/userStateTypes';
import { Drawer } from 'antd';
import { connect } from 'react-redux';
import * as userActions from '../../../../../store/user/user.actions';
import styled from 'styled-components';

interface Props {
  artistDetails: ArtistsUserType;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateArtistDetails: (data: UpdateArtistDetailsDataType) => Promise<boolean>;
}

interface UpdateArtistDetailsDataType {
    years_experience: number;
    studio_affiliation: boolean;
    studio_url: string;
    is_licenced: boolean;
    portfolio_url: string;
    uses_booking_system: boolean;
    studio_name: string | boolean;
}

const EditArtistDataDrawer: React.FC<Props> = ({
  artistDetails,
  isOpen,
  setIsOpen,
  updateArtistDetails
}) => {
  const [values, setValues] = useState({
    years_experience: artistDetails.years_experience,
    studio_affiliation: artistDetails.studio_affiliation || false, 
    studio_url: artistDetails.studio_url,
    is_licenced: artistDetails.is_licenced || false, 
    portfolio_url: artistDetails.portfolio,
    uses_booking_system: artistDetails.uses_booking_system,
    studio_name: artistDetails.studio_name,
  });

  const onChange = (e) => {
    if(e.target.name === 'studio_affiliation' || e.target.name === 'is_licenced') {
        setValues({ ...values, [e.target.name]: e.target.value === 'true' ? true : false });
        return
    }

    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateArtistDetails(values);
    setIsOpen(false)
    return
  };

  return (
    <>
      <StyledDrawer
        title="Edit Artist Data"
        placement="right"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        onClick={(e) => e.stopPropagation()}
      >
        <FormContainer>
          <div className="form-container">
            <div className="input-container">
              <label htmlFor="years_experience">Years Experience</label>
              <input
                type="number"
                name="years_experience"
                value={values.years_experience}
                onChange={onChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="studio_affiliation">Studio Affiliation</label>
              <select
                name="studio_affiliation"
                value={values.studio_affiliation.toString()} // Convert boolean to string
                onChange={onChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            {
                values.studio_affiliation && 
                <div className="input-container">
                    <label htmlFor="studio_name">Studio Name</label>
                    <input
                        type="text"
                        name="studio_name"
                        value={values.studio_name !== null && values.studio_name !== undefined ? values.studio_name.toString() : ''}
                        onChange={onChange}
                    />
                </div>
            }
            <div className="input-container">
              <label htmlFor="studio_url">Studio URL</label>
              <input
                type="text"
                name="studio_url"
                value={values.studio_url}
                onChange={onChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="is_licenced">Licenced</label>
              <select
                name="is_licenced"
                value={values.is_licenced.toString()} // Convert boolean to string
                onChange={onChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="portfolio_url">Portfolio URL</label>
              <input
                type="text"
                name="portfolio_url"
                value={values.portfolio_url}
                onChange={onChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="uses_booking_system">Booking System</label>
              <select
                name="uses_booking_system"
                value={values.uses_booking_system.toString()}
                onChange={onChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <button onClick={onSubmit} className = 'submit-btn'>Submit</button>
          </div>
        </FormContainer>
      </StyledDrawer>
    </>
  );
};

const ConnectedEditArtistDataDrawer = connect(null, ({
    updateArtistDetails: userActions.updateArtistDetails
}))(EditArtistDataDrawer);

export default ConnectedEditArtistDataDrawer;

const StyledDrawer = styled(Drawer)`
  .ant-drawer-header {
    background-color: ${props => props.theme.color.red};
    color: white;
    font-family: ${props => props.theme.font.family.secondary};
    font-size: 2rem; /* Adjust the font size as needed */
    font-weight: 700;
  }

  .ant-drawer-body {
    background-color: rgba(0, 0, 0, 0.9);
    padding: 20px; /* Add padding to the body */
  }

    .form-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .input-container {
        display: flex;
        flex-direction: column;
        gap: 10px;

        label {
            font-family: ${props => props.theme.font.family.secondary};
            font-size: 1.2rem;
            color: white;
        }

        input {
            border: none;
            border-radius: 5px;
            height: 40px;
            padding-left: 10px;
            font-family: ${props => props.theme.font.family.secondary};
            font-size: 1.2rem;
        }

        select {
            border: none;
            border-radius: 5px;
            height: 40px;
            padding-left: 10px;
            font-family: ${props => props.theme.font.family.secondary};
            font-size: 1.2rem;
        }
    }

    .submit-btn {
        background-color: ${props => props.theme.color.red};
        color: white;
        border: none;
        border-radius: 5px;
        height: 40px;
        padding-left: 10px;
        font-family: ${props => props.theme.font.family.secondary};
        font-size: 1.2rem;
        transition: background-color 0.2s ease-in-out;
        cursor: pointer;

        &:hover {
            background-color: rgba(255, 0, 0, 0.5);
        }
    }


`;

const FormContainer = styled.div`


`

