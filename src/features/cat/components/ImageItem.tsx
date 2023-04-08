import { ImageListItem } from '@mui/material'
import { Breed } from '../../../types/Breeds'
import { FavoriteCatButton } from './FavoriteCatButton'
import React from 'react'

type Props = {
  cat: Breed
  favoriteCatPreventDefault?: boolean
}

export const ImageItem = ({
  cat,
  favoriteCatPreventDefault = false
}: Props) => {
  return (
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
      <FavoriteCatButton cat={cat} preventDefault={favoriteCatPreventDefault} />
    </ImageListItem>
  )
}
