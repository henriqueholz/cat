import * as React from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import { Typography } from '@mui/material'

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+'
}

type Props = {
  label: string
  value: number
}

const convertSnakeCase = (snakeCase: string): string => {
  const stringArray: string[] = snakeCase.split('_')
  const stringSize = stringArray.length
  if (stringSize > 1) {
    return `${capitalizeFirstLetter(stringArray[0])} ${capitalizeFirstLetter(
      stringArray[1]
    )}`
  }
  return `${capitalizeFirstLetter(snakeCase)}`
}

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const TextRating = (props: Props) => {
  const { label, value } = props
  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Typography
        sx={{ ml: 1, mt: 1, mr: 1, fontWeight: 'bold' }}
      >{`${convertSnakeCase(label)}: `}</Typography>
      <Rating
        value={2}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}>{labels[value]}</Box>
    </Box>
  )
}
