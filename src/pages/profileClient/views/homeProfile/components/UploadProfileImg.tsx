import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../../../../store/user/user.actions'; 
import styled from 'styled-components';
import { IconType } from 'react-icons'; // Import based on your icon library

interface Props {
    uploadProfileImage: (file: File) => void;
    Icon: IconType; // Add this to receive an icon component
}

const UploadProfileImg: React.FC<Props> = ({ uploadProfileImage, Icon }) => {
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
            uploadProfileImage(files[0]); // Auto-upload on file selection
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <ClientUserImagesSection>
            <input type="file" onChange={handleFileChange} ref={fileInputRef} hidden />
            <IconButton onClick={triggerFileInput}><Icon /></IconButton>
        </ClientUserImagesSection>
    );
};

const mapDispatchToProps = {
    uploadProfileImage: userActions.uploadProfileImage
};

const ConnectedUploadProfileImg = connect(null, mapDispatchToProps)(UploadProfileImg);

export default ConnectedUploadProfileImg

const ClientUserImagesSection = styled.section`

`;

const IconButton = styled.button`
    position: absolute;
    bottom: 10px; /* Adjust as needed */
    right: 10px; /* Adjust as needed */
    border-radius: 50%;
    padding: 5px;
    background-color: white; /* Or any color that fits your design */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.1);
    }
`;
