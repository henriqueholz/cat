import React, { useEffect, useState } from 'react'
import ImageListItem from '@mui/material/ImageListItem'
import { useParams } from 'react-router-dom'
import { Delete } from '@mui/icons-material'
import { Breed } from '../../types/Breeds'
import {
  useCreateFavoriteMutation,
  useGetBreedQuery,
  useGetBreedsQuery
} from './catApiSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Button } from '@mui/material'
import { selectCat, updateCat, uploadCatList } from './catSlice'
import { FavoriteCatButton } from './components/FavoriteCatButton'
import { UploadCatImageButton } from './components/UploadCatImageButton'

export const BreedInfo = () => {
  const id = useParams().id as string
  const [options, setOptions] = useState({
    page: 1,
    limit: 10
  })
  const { data, isFetching, error } = useGetBreedsQuery(options) // Fetch date from the cat API
  const dispatch = useAppDispatch()

  const cat = useAppSelector(state => selectCat(state, id))

  useEffect(() => {
    if (cat === undefined && data !== undefined) {
      dispatch(uploadCatList(data))
    }
  }, [data])

  const RemovePersonalImageButton = () => {
    const removeImage = () => {
      const newCatData = { ...cat, new_image: undefined } as Breed
      dispatch(updateCat(newCatData))
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

  return (
    <>
      {cat !== undefined ? (
        <>
          <ImageListItem key={cat.id}>
            <img
              src={
                cat.new_image !== undefined
                  ? cat.new_image
                  : `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
              }
              srcSet={
                cat.new_image !== undefined
                  ? cat.new_image
                  : `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
              }
              alt={cat.name}
              loading="lazy"
            />
            <FavoriteCatButton cat={cat} />
          </ImageListItem>

          <UploadCatImageButton cat={cat} />
          <RemovePersonalImageButton />
          <div>Temperament: {cat?.temperament}</div>
          <div>Adaptability: {cat?.adaptability}</div>
          <div>Affection: {cat?.affection_level}</div>
        </>
      ) : (
        ''
      )}
    </>
  )
}
