import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
    addFiles: (files: File[]) => void;
}
const AddPhotosJob: React.FC<Props> = ({
    addFiles
}) => {
    const [filePreviews, setFilePreviews] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            addFiles(newFiles);

            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setFilePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
        }
    };
    
    

    return (
        <UploadContainer>
            <Input type="file" multiple onChange={handleFileChange} />
            <PreviewContainer>
                {filePreviews.map((file, index) => (
                    <img key={index} src={file} alt={`Preview ${index + 1}`} />
                ))}
            </PreviewContainer>
        </UploadContainer>
    );
};

export default AddPhotosJob;

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
