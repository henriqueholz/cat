import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectCat } from './catSlice'
import { UploadCatImageButton } from './components/UploadCatImageButton'
import { RemoveCatImageButton } from './components/RemoveCatImageButton'
import { ImageItem } from './components/ImageItem'
import { TextRating } from './components/TextRating'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'

const catInfoKeys: string[] = [
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

export const CatInfo = () => {
  const id = useParams().id as string

  const cat = useAppSelector(state => selectCat(state, id))

  const Item = styled(Paper)(({ theme }) => ({
    color: theme.palette.text.secondary
  }))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {cat !== undefined ? (
        <>
          <ImageItem cat={cat} />
          <UploadCatImageButton cat={cat} />
          <RemoveCatImageButton cat={cat} />
          <Item
            sx={{
              marginBottom: 1
            }}
          >
            <Typography>{cat?.description}</Typography>
          </Item>
          <Box sx={{ flexGrow: 1 }}>
            <Grid>
              <Item>
                {catInfoKeys.map(x => (
                  <TextRating
                    label={x}
                    value={cat[x]}
                    key={x}
                    data-testid="test-rating"
                  />
                ))}
              </Item>
            </Grid>
          </Box>
        </>
      ) : (
        ''
      )}
    </>
  )
}
