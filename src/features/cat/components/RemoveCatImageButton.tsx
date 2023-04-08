import { Breed } from '../../../types/Breeds'
import React from 'react'
import { Button } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useAppDispatch } from '../../../app/hooks'
import { updateCat } from '../catSlice'

type Props = {
  cat: Breed
}

export const RemoveCatImageButton = ({ cat }: Props) => {
  const dispatch = useAppDispatch()

  const removeImage = () => {
    localStorage.removeItem(`cat:${cat.id}`)
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
