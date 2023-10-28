import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as jobActions from '../../../../store/jobs/jobs.actions'


interface Props {
    addPhotosToJob: (jobId: string, photos: File[]) => void;
    jobId: string;
}


const AddPhotosJob: React.FC<Props> = ({
    addPhotosToJob,
    jobId
}) => {
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [files, addFiles] = useState<File[]>([])

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
        console.log('Waiting to uplaod...') //!REMOVE
        await addPhotosToJob(jobId, files);
        console.log('Uploaded!') //!REMOVE
    }


    
    

    return (
        <UploadContainer>
            <Input type="file" multiple onChange={handleFileChange} />
            <button onClick={onUpload}>Upload</button>
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
    flex-direction: column;
    align-items: center;
    margin: 20px;
`;

const Input = styled.input`
    margin-bottom: 20px;
`;

const PreviewContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    img {
        max-width: 100px;
        max-height: 100px;
    }
`;
