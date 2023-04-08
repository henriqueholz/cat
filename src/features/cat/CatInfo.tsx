import React, { useEffect, useState } from 'react'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import { useParams } from 'react-router-dom'
import { Favorite, FavoriteBorder, Delete } from '@mui/icons-material'
import { Breed } from '../../types/Breeds'
import {
  useCreateFavoriteMutation,
  useGetBreedQuery,
  useGetBreedsQuery
} from './catApiSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Button } from '@mui/material'
import { updateFavoriteList, selectCat, uploadCatList } from './catSlice'
import { FavoriteCatButton } from './components/FavoriteCatButton'
import { ConsoleWriter } from 'istanbul-lib-report'

export const BreedInfo = () => {
  const id = useParams().id as string
  const [options, setOptions] = useState({
    page: 1,
    limit: 10
  })
  const { data, isFetching, error } = useGetBreedsQuery(options) // Fetch date from the cat API
  const [createFavourite, status] = useCreateFavoriteMutation()
  const subId = process.env.REACT_APP_SUB_ID as string
  const dispatch = useAppDispatch()

  const cat = useAppSelector(state => selectCat(state, id))

  useEffect(() => {
    if (cat === undefined && data !== undefined) {
      dispatch(uploadCatList(data))
    }
  }, [data])

  // const RemovePersonalImageButton = () => {
  //   const removeImage = () => {
  //     const newImage = { ...cat, new_image: undefined } as Breed
  //     setCat(newImage)
  //   }

  //   return (
  //     <Button
  //       variant="outlined"
  //       startIcon={<Delete />}
  //       onClick={() => removeImage()}
  //     >
  //       Delete
  //     </Button>
  //   )
  // }

  // const UploadControl = () => {
  //   const uploadImage = e => {
  //     const file = e.target.files[0]
  //     getBase64(file).then(base64 => {
  //       localStorage['fileBase64'] = base64
  //       const newImage = { ...cat, new_image: base64 } as Breed
  //       setCat(newImage)
  //     })
  //   }

  //   return (
  //     <Button variant="contained" component="label">
  //       Upload
  //       <input
  //         hidden
  //         accept="image/*"
  //         multiple
  //         type="file"
  //         // onChange={e => uploadImage(e)}
  //       />
  //     </Button>
  //   )
  // }

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
      {cat !== undefined ? (
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
      ) : (
        ''
      )}
      {/* <UploadControl />
      <RemovePersonalImageButton /> */}
      <div>Temperament: {cat?.temperament}</div>
      <div>Adaptability: {cat?.adaptability}</div>
      <div>Affection: {cat?.affection_level}</div>
    </>
  )
}
