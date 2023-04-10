import React from 'react'
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Box
} from '@mui/material'
import { Breed } from '../../../types/Breeds'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { updateFilter, selectFilter, FilterAttributes } from '../filterSlice'
import { selectCatList, updateFilteredList } from '../catSlice'

interface FilterObject {
  filterFunction: (breed: Breed) => boolean
  active: boolean
}

export const FilterTab = () => {
  const dispatch = useAppDispatch()
  const filter: FilterAttributes = useAppSelector(state => selectFilter(state))
  const fullCatList = useAppSelector(state => selectCatList(state)) // Cached full cat list data with favorite and user_image

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
        control={
          <Checkbox
            checked={filter.isFavorite}
            onChange={handleFavoriteCheckbox}
            name="favorites"
          />
        }
        label="Favorites"
      />
    )
  }

  const handleFavoriteCheckbox = () => {
    dispatch(updateFilter({ ...filter, isFavorite: !filter.isFavorite }))
  }

  const handleFilter = () => {
    const filterData = {
      name: filter.name,
      origin: filter.origin,
      weight: filter.weight,
      lifespan: filter.lifespan,
      isFavorite: filter.isFavorite
    }
    dispatch(updateFilter(filterData))
    dispatch(updateFilteredList(filterBreeds()))
  }

  const handleReset = () => {
    dispatch(updateFilteredList(fullCatList))
    dispatch(
      updateFilter({
        name: '',
        lifespan: '',
        weight: '',
        origin: '',
        isFavorite: false
      })
    )
  }

  const filters: FilterObject[] = [
    {
      filterFunction: (breed: Breed) =>
        breed.name.toLowerCase().includes(filter.name.toLowerCase()),
      active: !!filter.name
    },
    {
      filterFunction: (breed: Breed) =>
        breed.origin.toLowerCase().includes(filter.origin.toLowerCase()),
      active: !!filter.origin
    },
    {
      filterFunction: (breed: Breed) =>
        Number(filter.lifespan) >= parseInt(breed.life_span.split('-')[0]) &&
        Number(filter.lifespan) <= parseInt(breed.life_span.split('-')[1]),
      active: !!filter.lifespan
    },
    {
      filterFunction: (breed: Breed) =>
        Number(filter.weight) >=
          parseInt(breed.weight.imperial.split('-')[0]) &&
        Number(filter.weight) <= parseInt(breed.weight.imperial.split('-')[1]),
      active: !!filter.weight
    },
    {
      filterFunction: (breed: Breed) => breed.favorite === filter.isFavorite,
      active: !!filter.isFavorite
    }
  ]

  const filterBreeds = (): Breed[] => {
    return fullCatList.filter(func =>
      filters.every(filter => !filter.active || filter.filterFunction(func))
    )
  }

  return (
    <Box component="form" noValidate autoComplete="off">
      <FormControl sx={{ marginRight: '.5rem' }}>
        <InputLabel>Name</InputLabel>
        <OutlinedInput
          id="name"
          label="Name"
          value={filter.name}
          data-testid="name-field"
          onChange={e =>
            dispatch(updateFilter({ ...filter, name: e.target.value }))
          }
        />
      </FormControl>
      <FormControl sx={{ marginRight: '.5rem' }}>
        <InputLabel>Origin</InputLabel>
        <OutlinedInput
          id="origin"
          label="Origin"
          value={filter.origin}
          onChange={e =>
            dispatch(updateFilter({ ...filter, origin: e.target.value }))
          }
        />
      </FormControl>
      <FormControl sx={{ marginRight: '.5rem' }}>
        <InputLabel>Lifespan</InputLabel>
        <OutlinedInput
          id="lifespan"
          label="Lifespan"
          value={filter.lifespan}
          type="number"
          onChange={e =>
            dispatch(
              updateFilter({ ...filter, lifespan: parseInt(e.target.value) })
            )
          }
        />
      </FormControl>
      <FormControl sx={{ marginRight: '.5rem' }}>
        <InputLabel>Imperial Weight</InputLabel>
        <OutlinedInput
          id="imperialWeight"
          label="Imperial Weight"
          value={filter.weight}
          type="number"
          onChange={e =>
            dispatch(
              updateFilter({ ...filter, weight: parseInt(e.target.value) })
            )
          }
        />
      </FormControl>
      <FavoriteCheckbox />
      <ApplyButton />
      <ResetButton />
    </Box>
  )
}
