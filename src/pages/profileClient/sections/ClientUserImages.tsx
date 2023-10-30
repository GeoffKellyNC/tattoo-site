/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../store/root.reducer'
import styled from 'styled-components'

import UploadClientImage from '../views/homeProfile/components/UploadClientImage'


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
  return (
    <ClientUserImagesSection>
        <div className = 'photo-section-header'>
            <span> PHOTOS </span>
            <UploadClientImage />
        </div>
        <div className = 'photo-section'>
            {
                clientUserImages.length < 1 ? <span className='no-images'> No Images Uploaded </span> :
                clientUserImages.map((image: Image, index: string) => {
                    return (
                        <div className = 'photo-container' key = {index}>
                            <img src = {image.image_url} alt = 'uploaded' className = 'uploaded-image' />
                        </div>
                    )
                })
            }
        </div>
    </ClientUserImagesSection>
  )
}

export default connect((st: RootState) => ({
    userData: st.userData,
    clientUserImages: st.clientUserImages
}), null) (ClientUserImages)


const ClientUserImagesSection = styled.div`

    .photo-section {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
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
    }


    @media (max-width: ${(pr) => pr.theme.media.phone}) {
        .photo-section {
            flex-direction: column;
            gap: 1rem;
        }

        .photo-container {
            width: 100%;
            height: 100%;
        }

        .no-images {
            width: 100%;
            text-align: center;
        }

        .photo-section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }



`