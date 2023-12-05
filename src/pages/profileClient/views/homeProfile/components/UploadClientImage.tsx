import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../../../../store/user/user.actions'; 
import styled from 'styled-components';

interface Props {
    uploadClientUserImage: (file: File) => void;
}

const UploadClientImage: React.FC<Props> = ({ uploadClientUserImage }) => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
            setPreviewUrl(URL.createObjectURL(files[0])); // Create a URL for the file
        }
    };

    const handleUpload = () => {
        if (file) {
            uploadClientUserImage(file);
            setFile(null);
            setPreviewUrl(null); 

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } else {
            console.error("No file selected!");
        }
    };

    return (
        <ClientUserImagesSection>
            <StyledInput type="file" id="file" onChange={handleFileChange} ref={fileInputRef} />
            <StyledLabel htmlFor="file">Choose a file</StyledLabel>
            <StyledButton onClick={handleUpload}>Upload Image</StyledButton>
            {previewUrl && <ImagePreview src={previewUrl} alt="Preview" />}
        </ClientUserImagesSection>
    );
}

const mapDispatchToProps = {
    uploadClientUserImage: userActions.uploadClientUserImage
}

const ConnectedUploadClientImage = connect(null, mapDispatchToProps)(UploadClientImage);

export default ConnectedUploadClientImage;
const ClientUserImagesSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #282c34;  // Dark background
    color: #ffffff;  // Light text for contrast
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const StyledInput = styled.input`
    display: none;  // Hide the actual input but keep it in the DOM
`;

const StyledLabel = styled.label`
    background-color: #4a4e69;  // Darker button background
    color: white;
    padding: 10px 20px;
    margin: 10px 0;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #9a8c98;
    }
`;

const StyledButton = styled.button`
    background-color: #22223b;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #4a4e69;
    }
`;

const ImagePreview = styled.img`
    max-width: 100px;
    max-height: 100px;
    margin-top: 10px;
    border-radius: 5px;  // Rounded corners for the image
`;

