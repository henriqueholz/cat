import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { ListSubheader } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectBreeds } from './breedSlice';
import { Breed } from '../../types/Breeds';

export const BreedList = () => {
  const breeds = useAppSelector(selectBreeds) as Breed[];
  
  return (
    <ImageList>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Name</ListSubheader>
        <ListSubheader component="div">Imperial Weight</ListSubheader>
        <ListSubheader component="div">Lifespan</ListSubheader>
        <ListSubheader component="div">Origin</ListSubheader>

      </ImageListItem>
      {breeds.map((item) => (
        <Link to={`/${item.id}`} key={item.id}>
          <ImageListItem>
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
        </Link>
      ))}
    </ImageList>
  );
}