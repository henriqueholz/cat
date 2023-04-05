import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { breedResponse } from '../mocks/breed';
import { useParams } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Breed } from '../../types/Breeds';
import { useAppSelector } from '../../app/hooks';
import { selectBreedById } from './breedSlice';

export function BreedInfo() {
  const id = useParams().id as string;
  const breed = useAppSelector((state) => selectBreedById(state, id)) as Breed;

  return (
    <ImageList>
      <ImageListItem key={breed.id}>
        <img
          src={`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`}
          srcSet={`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`}
          alt={breed.name}
          loading="lazy"
        />
        <ImageListItemBar
          title={breed.name}
          // subtitle={item.life_span}
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${breed.name}`}
            >
              <FavoriteBorder />
            </IconButton>
          }
        />
      </ImageListItem>   
    </ImageList>
  );
}