import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../store/root.reducer';
import UploadClientImage from '../views/homeProfile/components/UploadClientImage';
import { BiSolidImageAdd } from "react-icons/bi";

interface ClientUserImagesProps {
    userData: RootState['userData'],
    clientUserImages: RootState['clientUserImages'],
}

interface Image {
    _id: string;
    user_unxid: string;
    user_name: string;
    image_id: string;
    image_url: string;
    image_upload_date: string; // or Date if it's used as a Date object in your application
    num_likes: number;
    num_comments: number;
    comments: string[]; // Specify the type if known
    num_reports: number;
    title: string | null;
    description: string | null;
    is_active: boolean;
    is_deleted: boolean;
    deleted_date: string | null; // or Date if it's used as a Date object in your application
    deleted_by: string | null;
}

const ClientUserImages: React.FC<ClientUserImagesProps> = ({
    clientUserImages,
}) => {
    const [addImage, setAddImage] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);

    const handleAddImage = () => {
        setAddImage(!addImage);
    };

    const handleImageClick = (image: Image) => {
        setSelectedImage(image);
    };

    const handleModalClose = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setSelectedImage(null);
        }
    };

    // const handleDeleteImage = (imageId: string) => {
    //     console.log("Delete Image:", imageId);
    //     // Implement delete functionality here
    // };

    const previewImages = clientUserImages.slice(0, 6);

    return (
        <ClientUserImagesSection>
            <ClientUserImagesHeader>
                <h2> My Images </h2>
                <BiSolidImageAdd 
                    title = 'Add Image' 
                    color = 'white' 
                    size = '2rem'
                    onClick = {handleAddImage} />
                {addImage && <UploadClientImage />}
            </ClientUserImagesHeader>
            <div className='photo-section'>
                {previewImages.length < 1 ? <span className='no-images'> No Images Uploaded </span> :
                previewImages.map((image, index) => {
                    return (
                        <div className='photo-container' key={index} onClick={() => handleImageClick(image)}>
                            <img src={image.image_url} alt='uploaded' className='uploaded-image' />
                        </div>
                    );
                })}
            </div>
            {selectedImage && (
                <ModalBackdrop onClick={handleModalClose}>
                    <ModalContent>
                        <img src={selectedImage.image_url} alt={selectedImage.title || 'Selected'} />
                        {/* <DeleteButton onClick={() => handleDeleteImage(selectedImage._id)}>Delete</DeleteButton> */}
                    </ModalContent>
                </ModalBackdrop>
            )}
        </ClientUserImagesSection>
    );
};

const ConnectedClientUserImages = connect((state: RootState) => ({
    userData: state.userData,
    clientUserImages: state.clientUserImages
}), null) (ClientUserImages);

export default  ConnectedClientUserImages

const ClientUserImagesSection = styled.div`
    background-color: #151728;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 20px;

    @media (max-width: ${(props) => props.theme.media.tablet}) {
        margin-top: 0;
        background-color: transparent;
    }

    .photo-section {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;

        @media (max-width: ${(props) => props.theme.media.phone}) {
            justify-content: flex-start;
            gap: 1rem;
        }
    }

    .photo-container {
        width: 20%;
        height: 20%;
        justify-content: center;
        align-items: center;
        border: 1px solid white;

        .uploaded-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        @media (max-width: ${(props) => props.theme.media.tablet}) {
            width: 30%;
            height: 30%;

            .uploaded-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
`;

const ClientUserImagesHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;

    h2 {
        color: white;
        font-family: ${(props) => props.theme.font.family.secondary};

        @media (max-width: ${(props) => props.theme.media.phone}) {
            font-size: 2rem;

        }
    }

    @media (max-width: ${(props) => props.theme.media.phone}) {
        flex-direction: column;
        gap: 1rem;
    }
`;

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    position: relative;
    margin-left: 70px;
    img {
        max-width: 80%;
        max-height: 80%;
    }
`;

// const DeleteButton = styled.button`
//     position: absolute;
//     top: 10px;
//     right: 10px;
//     padding: 5px 10px;
//     background-color: red;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
//     font-size: 1rem;
// `;
