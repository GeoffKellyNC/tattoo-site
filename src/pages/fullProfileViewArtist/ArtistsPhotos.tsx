import React from 'react'
import { TattooImage } from '../../store/user/types/userStateTypes'
import styled from 'styled-components'



interface Props {
    photos: TattooImage[]
}

const ArtistsPhotos: React.FC<Props> = ({
    photos
}) => {
  return (
    
    <PhotosContainer>
        {
            photos.length < 1 ? <span className = 'no-images'> No Images Uploaded.</span> : (
                photos.map((photo: TattooImage) => (
                    <Photo key = {photo.image_id}>
                        <div className = 'photo-top'>
                            <img 
                                src = {photo.image_url} 
                                alt = 'Artist Photo'
                                className = 'artist-photo' />
                        </div>
                    </Photo>
                ))
            )
        }
        
    </PhotosContainer>
  )
}

export default ArtistsPhotos


const PhotosContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 5rem;
    width: 100%;
    margin: 2rem 0;
    padding: 2rem 1rem;


    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }

`

const Photo = styled.div`
    width: 25%;
    height: 25%;

    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
    }

`