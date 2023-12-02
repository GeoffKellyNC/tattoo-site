import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as jobActions from '../../../../store/jobs/jobs.actions';

interface Props {
    addPhotosToJob: (jobId: string, photos: File[]) => void;
    jobId: string;
    setAddingPhoto: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddPhotosJob: React.FC<Props> = ({
    addPhotosToJob,
    jobId,
    setAddingPhoto
}) => {
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [files, addFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            addFiles(prevFiles => [...prevFiles, ...newFiles]);

            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setFilePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
        }
    };

    const onUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await addPhotosToJob(jobId, files);
        setAddingPhoto && setAddingPhoto(false);
        return;
    }

    return (
        <UploadContainer>
            <StyledFileInput type="file" multiple onChange={handleFileChange} id="fileInput" />
            <FileInputLabel htmlFor="fileInput">Choose Files</FileInputLabel>
            <StyledButton onClick={onUpload}>Upload</StyledButton>
            <PreviewContainer>
                {filePreviews.map((file, index) => (
                    <img key={index} src={file} alt={`Preview ${index + 1}`} />
                ))}
            </PreviewContainer>
        </UploadContainer>
    );
};

const ConnectedAddPhotosJob = connect(null, {
    addPhotosToJob: jobActions.addPhotosToJob
})(AddPhotosJob);

export default ConnectedAddPhotosJob;

const UploadContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    border-bottom: 2px solid #444;
`;

const StyledButton = styled.button`
    padding: 0.8rem 2rem; // Reduced padding for a smaller button
    margin-left: 10px; // Added margin for spacing between buttons
    border: 2px solid #ff0055; // Pink border
    border-radius: 4px;
    background-color: transparent; // No background color
    color: white; // Pink text color
    font-size: 0.8rem; // Smaller font size
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background-color: #ff0055; // Pink background on hover
        color: white;
    }
`;

const StyledFileInput = styled.input`
    display: none;
`;

const FileInputLabel = styled.label`
    padding: 0.8rem 2rem; // Reduced padding for a smaller button
    margin-right: 10px; // Added margin for spacing between buttons
    border: 2px solid #0055ff; // Blue border
    border-radius: 4px;
    background-color: transparent; // No background color
    color: white; // Blue text color
    font-size: 0.8rem; // Smaller font size
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background-color: #0055ff; // Blue background on hover
        color: white;
    }
`;

const PreviewContainer = styled.div`
    display: flex;
    max-width: 200px;
    overflow-x: auto;
    align-items: center;

    img {
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-right: 10px;
        width: 50px;
        height: 50px;
        object-fit: cover;
    }
`;
