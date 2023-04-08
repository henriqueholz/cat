import { Breed } from '../../../types/Breeds'
import React from 'react'
import { useAppDispatch } from '../../../app/hooks'
import { updateCat } from '../catSlice'
import { Button } from '@mui/material'
import { Delete } from '@mui/icons-material'

type Props = {
  cat: Breed
}

export const RemoveCatImageButton = ({ cat }: Props) => {
  const dispatch = useAppDispatch()

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
