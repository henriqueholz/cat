import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { breedResponse } from '../mocks/breed';

export function BreedInfo() {
  const mockBreedData = breedResponse.data[0]

  return (
    <ImageList>
      <ImageListItem key={mockBreedData.id}>
        <img
          src={`https://cdn2.thecatapi.com/images/${mockBreedData.reference_image_id}.jpg`}
          srcSet={`https://cdn2.thecatapi.com/images/${mockBreedData.reference_image_id}.jpg`}
          alt={mockBreedData.name}
          loading="lazy"
        />
        <ImageListItemBar
          title={mockBreedData.name}
          // subtitle={item.life_span}
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${mockBreedData.name}`}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </ImageListItem>   
    </ImageList>
  );
}