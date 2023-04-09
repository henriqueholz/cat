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
    <ImageListItem key={cat.id} data-testid={`cat-card-${cat.id}`}>
      <img
        src={
          localStorage.getItem(`cat:${cat.id}`) !== null &&
          localStorage.getItem(`cat:${cat.id}`) !== undefined
            ? localStorage.getItem(`cat:${cat.id}`)!
            : `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
        }
        srcSet={
          localStorage.getItem(`cat:${cat.id}`) !== null &&
          localStorage.getItem(`cat:${cat.id}`) !== undefined
            ? localStorage.getItem(`cat:${cat.id}`)!
            : `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
        }
        alt={cat.name}
        loading="lazy"
      />
      <FavoriteCatButton cat={cat} preventDefault={favoriteCatPreventDefault} />
    </ImageListItem>
  )
}
