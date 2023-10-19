/* eslint-disable react-refresh/only-export-components */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../../store/user/user.actions';  // Replace with the actual path

interface Props {
    uploadProfileImage: (file: File) => void;
}

const UploadProfileImg: React.FC<Props> = ({ uploadProfileImage }) => {
    const [file, setFile] = useState<File | null>(null);

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    const handleUpload = () => {
        if (file) {
            uploadProfileImage(file);
            setFile(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } else {
            console.error("No file selected!");
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} ref={fileInputRef} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

const mapDispatchToProps = {
    uploadProfileImage: userActions.uploadProfileImage
}

export default connect(null, mapDispatchToProps)(UploadProfileImg);
