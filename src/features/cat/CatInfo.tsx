import React, { useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import { useParams } from 'react-router-dom'
import { Favorite, FavoriteBorder, Delete } from '@mui/icons-material'
import { Breed } from '../../types/Breeds'
// import {
//   favoriteBreed,
//   findFavoriteById,
//   unfavoriteBreed
// } from './favoriteListSlice'
import { useCreateFavoriteMutation, useGetBreedQuery } from './catApiSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Button } from '@mui/material'
import { updateFavoriteList } from './catListSlice'

export const BreedInfo = () => {
  const id = useParams().id as string
  const { data, isFetching } = useGetBreedQuery({ id })
  const [url, setUrl] = useState('')
  const [breedState, setBreedState] = useState<Breed>()
  const [createFavourite, status] = useCreateFavoriteMutation()
  const subId = process.env.REACT_APP_SUB_ID as string
  const dispatch = useAppDispatch()

  // const isFavorite = useAppSelector(state => findFavoriteById(state, id))

  useEffect(() => {
    if (data !== undefined) {
      setBreedState(data)
    }
  }, [data])

  useEffect(() => {
    console.log(breedState)
  }, [breedState])

  const handleFavoriteBreed = () => {
    if (breedState !== undefined) {
      dispatch(updateFavoriteList(breedState))

      // if (breedState.favorite) {
      //   // Remove the cat from the redux cached favorites list
      //   dispatch(unfavoriteBreed(breedState.id))
      // } else {
      //   // Add the cat into the redux cached favorites list
      //   dispatch(favoriteBreed(breedState))
      // }

      const newBreedState = {
        ...breedState,
        favorite: !breedState.favorite
      } as Breed
      setBreedState(newBreedState)
    }
  }

  const RemovePersonalImageButton = () => {
    const removeImage = () => {
      const newImage = { ...breedState, new_image: undefined } as Breed
      setBreedState(newImage)
    }

    return (
      <Button
        variant="outlined"
        startIcon={<Delete />}
        onClick={() => removeImage()}
      >
        Delete
      </Button>
    )
  }

  const UploadControl = () => {
    const uploadImage = e => {
      const file = e.target.files[0]
      getBase64(file).then(base64 => {
        localStorage['fileBase64'] = base64
        const newImage = { ...breedState, new_image: base64 } as Breed
        setBreedState(newImage)
      })
    }

    return (
      <Button variant="contained" component="label">
        Upload
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={e => uploadImage(e)}
        />
      </Button>
    )
  }

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
      reader.readAsDataURL(file)
    })
  }

  return (
    <>
      {breedState !== undefined ? (
        <ImageListItem key={breedState.id}>
          <img
            src={
              breedState.new_image !== undefined
                ? breedState.new_image
                : `https://cdn2.thecatapi.com/images/${breedState.reference_image_id}.jpg`
            }
            srcSet={
              breedState.new_image !== undefined
                ? breedState.new_image
                : `https://cdn2.thecatapi.com/images/${breedState.reference_image_id}.jpg`
            }
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
                <Favorite />
              </IconButton>
            }
          />
        </ImageListItem>
      ) : (
        // temperament, adaptability, affection level
        ''
      )}
      <UploadControl />
      <RemovePersonalImageButton />
      <div>Temperament: {breedState?.temperament}</div>
      <div>Adaptability: {breedState?.adaptability}</div>
      <div>Affection: {breedState?.affection_level}</div>
    </>
  )
}
