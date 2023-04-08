import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetBreedsQuery } from './catApiSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectCat, updateCatList } from './catSlice'
import { UploadCatImageButton } from './components/UploadCatImageButton'
import { RemoveCatImageButton } from './components/RemoveCatImageButton'
import { ImageItem } from './components/ImageItem'
import { TextRating } from './components/TextRating'
import { Breed } from '../../types/Breeds'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

const information: string[] = [
  'indoor',
  'lap',
  'adaptability',
  'affection_level',
  'child_friendly',
  'dog_friendly',
  'energy_level',
  'grooming',
  'health_issues',
  'intelligence',
  'shedding_level',
  'social_needs',
  'stranger_friendly',
  'vocalisation',
  'experimental',
  'hairless',
  'natural',
  'rare',
  'rex',
  'suppressed_tail',
  'short_legs',
  'hypoallergenic'
]

export const BreedInfo = () => {
  const id = useParams().id as string
  const [options, setOptions] = useState({
    page: 1,
    limit: 10
  })
  const { data, isFetching, error } = useGetBreedsQuery(options) // Fetch data from the cat API
  const dispatch = useAppDispatch()

  const cat = useAppSelector(state => selectCat(state, id))

  useEffect(() => {
    if (cat === undefined && data !== undefined) {
      dispatch(updateCatList(data))
    }
  }, [data])

  return (
    <>
      {cat !== undefined ? (
        <>
          <ImageItem cat={cat} />
          <UploadCatImageButton cat={cat} />
          <RemoveCatImageButton cat={cat} />
          <Box
            sx={{
              padding: 1,
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7]
              }
            }}
          >
            <Typography>{cat?.description}</Typography>
          </Box>
          <Box
            sx={{
              mt: 2,
              pl: 1,
              columnCount: 2,
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7]
              }
            }}
          >
            {information.map(x => (
              <TextRating label={x} value={cat[x]} />
            ))}
          </Box>
        </>
      ) : (
        ''
      )}
    </>
  )
}
