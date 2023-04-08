import { Breed } from '../../../types/Breeds'
import React from 'react'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { useAppDispatch } from '../../../app/hooks'
import { updateFavorite } from '../catSlice'

type Props = {
  cat: Breed
  preventDefault?: boolean
}

export const FavoriteCatButton = ({ cat, preventDefault }: Props) => {
  const dispatch = useAppDispatch()

  const handleFavoriteBreed = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (preventDefault) {
      e.preventDefault()
    }
    if (cat !== undefined) {
      dispatch(updateFavorite(cat))
    }
  }

  return (
    <ImageListItemBar
      title={`Name: ${cat.name} | Origin: ${cat.origin}`}
      subtitle={`Lifespan: ${cat.life_span} years | Weight: ${cat.weight.imperial} pounds`}
      actionIcon={
        <IconButton
          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
          aria-label={`info about ${cat.name}`}
          onClick={e => handleFavoriteBreed(e)}
        >
          {cat.favorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      }
    />
  )
}
