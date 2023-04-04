import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { breedResponse } from '../mocks/breed';

export function BreedList() {
  const mockBreedData = breedResponse
  return (
    // <ImageList sx={{ width: 500, height: 450 }}>
    <ImageList>
      {mockBreedData.data.map((item) => (
        <ImageListItem key={item.id}>
          <img
            src={`https://cdn2.thecatapi.com/images/${item.reference_image_id}.jpg`}
            srcSet={`https://cdn2.thecatapi.com/images/${item.reference_image_id}.jpg`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            // subtitle={item.life_span}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.name}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}