import { Breed } from '../../../types/Breeds'
import React from 'react'
import { useAppDispatch } from '../../../app/hooks'
import { updateCat } from '../catSlice'
import { Button } from '@mui/material'

type Props = {
  cat: Breed
}

const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
    reader.readAsDataURL(file)
  })
}

export const UploadCatImageButton = ({ cat }: Props) => {
  const dispatch = useAppDispatch()

  const uploadImage = e => {
    const file = e.target.files[0]
    getBase64(file).then(base64 => {
      localStorage['fileBase64'] = base64
      const newCatData = { ...cat, new_image: base64 } as Breed
      dispatch(updateCat(newCatData))
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
