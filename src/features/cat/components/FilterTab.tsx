import React, { useState } from 'react'
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useAppDispatch } from '../../../app/hooks'
import { initialFilterParams, updateFilter } from '../catSlice'

export const FilterTab = () => {
  const [filterParams, setFilterParams] = useState(initialFilterParams)
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))

  const ApplyButton = () => {
    return (
      <Button
        variant="contained"
        onClick={() => handleFilter()}
        style={{ marginRight: '.5rem' }}
        data-testid="filter-button"
      >
        Apply
      </Button>
    )
  }

  const ResetButton = () => {
    return (
      <Button
        variant="text"
        data-testid="reset-button"
        onClick={() => handleReset()}
      >
        Reset
      </Button>
    )
  }

  const FavoriteCheckbox = () => {
    return (
      <FormControlLabel
        sx={{ mt: '0.5rem' }}
        control={
          <Checkbox
            checked={filterParams.isFavorite}
            onChange={e =>
              setFilterParams({
                ...filterParams,
                isFavorite: !filterParams.isFavorite
              })
            }
            name="favorites"
          />
        }
        label="Only Favorites"
      />
    )
  }

  const handleFilter = () => {
    dispatch(updateFilter(filterParams))
  }

  const handleReset = () => {
    setFilterParams(initialFilterParams)
    dispatch(updateFilter(initialFilterParams))
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ display: isDesktop ? '' : 'grid' }}
    >
      <FormControl
        sx={{
          marginRight: '1rem',
          marginBottom: '0.5rem',
          maxWidth: isDesktop ? 130 : 'auto'
        }}
      >
        <InputLabel>Name</InputLabel>
        <OutlinedInput
          id="name"
          label="Name"
          value={filterParams.name}
          data-testid="name-field"
          onChange={e =>
            setFilterParams({ ...filterParams, name: e.target.value })
          }
        />
      </FormControl>
      <FormControl
        sx={{
          mr: '1rem',
          maxWidth: isDesktop ? 130 : 'auto',
          marginBottom: '0.5rem'
        }}
      >
        <InputLabel>Origin</InputLabel>
        <OutlinedInput
          id="origin"
          label="Origin"
          value={filterParams.origin}
          onChange={e =>
            setFilterParams({ ...filterParams, origin: e.target.value })
          }
        />
      </FormControl>
      <FormControl
        sx={{
          marginRight: '1rem',
          maxWidth: isDesktop ? 130 : 'auto',
          marginBottom: '0.5rem'
        }}
      >
        <InputLabel>Lifespan</InputLabel>
        <OutlinedInput
          id="lifespan"
          label="Lifespan"
          value={filterParams.lifespan}
          type="number"
          onChange={e =>
            setFilterParams({
              ...filterParams,
              lifespan: parseInt(e.target.value)
            })
          }
        />
      </FormControl>
      <FormControl
        sx={{
          marginRight: '1rem',
          maxWidth: isDesktop ? 130 : 'auto',
          marginBottom: '0.5rem'
        }}
      >
        <InputLabel>Imperial Weight</InputLabel>
        <OutlinedInput
          id="imperialWeight"
          label="Imperial Weight"
          value={filterParams.weight}
          type="number"
          onChange={e =>
            setFilterParams({
              ...filterParams,
              weight: parseInt(e.target.value)
            })
          }
        />
      </FormControl>
      <FavoriteCheckbox />
      <ApplyButton />
      <ResetButton />
    </Box>
  )
}
