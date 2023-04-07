import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { useParams } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Breed } from '../../types/Breeds';
import { favoriteBreed, findFavoriteById, unfavoriteBreed } from './favoriteListSlice';
import { useCreateFavoriteMutation, useGetBreedQuery } from './breedApiSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';


export const BreedInfo = () => {
  const id = useParams().id as string;
  const { data, isFetching } = useGetBreedQuery({ id });
  const [breedState, setBreedState] = useState<Breed>()
  const [createFavourite, status] = useCreateFavoriteMutation();
  const subId = process.env.REACT_APP_SUB_ID as string
  const dispatch = useAppDispatch()

  const isFavorite = useAppSelector((state) => findFavoriteById(state, id)); 

  useEffect(() => {
    if (data !== undefined) {
      setBreedState(data);
    }
  }, [data]);

  const handleFavoriteBreed = () => {
    if (breedState != undefined) {
      if (breedState.favorite) {
        // Remove the cat into the redux cached favorites list
        dispatch(unfavoriteBreed(breedState.id))
      } else {
        // Add the cat into the redux cached favorites list
        dispatch(favoriteBreed(breedState))
      }
  
      const newBreedState = {...breedState, favorite: !breedState.favorite} as Breed
      setBreedState(newBreedState)
    }
  }

  return (
    <ImageList>
      {breedState !== undefined ? 
      <ImageListItem key={breedState.id}>
        <img
          src={`https://cdn2.thecatapi.com/images/${breedState.reference_image_id}.jpg`}
          srcSet={`https://cdn2.thecatapi.com/images/${breedState.reference_image_id}.jpg`}
          alt={breedState.name}
          loading="lazy"
        />
        <ImageListItemBar
          title={breedState.name}
          // subtitle={item.life_span}
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${breedState.name}`}
              onClick={() => handleFavoriteBreed()}
            >
              {isFavorite !== -1 ? <Favorite /> : <FavoriteBorder /> } 
            </IconButton>
          }
        />
      </ImageListItem>   
      : "" }
    </ImageList>
  );
}