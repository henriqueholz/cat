import React, { useState } from 'react'
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormControlLabel
} from '@mui/material'
import { Breed } from '../../../types/Breeds'
import { useAppDispatch } from '../../../app/hooks'
import { addFilter } from '../filterSlice'

type Props = {
  cats: Breed[]
}

export const FilterTab = () => {
  const [nameFilter, setNameFilter] = useState<string>('')
  const [imperialWeightFilter, setImperialWeightFilter] = useState<number | ''>(
    ''
  )
  const [lifespanFilter, setLifespanFilter] = useState<number | ''>('')
  const [favoriteFilter, setFavoriteFilter] = useState<boolean>(false)
  const [originFilter, setOriginFilter] = useState<string>('')
  const dispatch = useAppDispatch()

  const ApplyButton = () => {
    return (
      <Button variant="contained" onClick={() => handleFilter()}>
        Apply
      </Button>
    )
  }

  const ResetButton = () => {
    return (
      <Button variant="text" onClick={() => handleReset()}>
        Reset
      </Button>
    )
  }

  const FavoriteCheckbox = () => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={favoriteFilter}
            onChange={handleFavoriteCheckbox}
            name="favorites"
          />
        }
        label="favorites"
      />
    )
  }

  const handleFavoriteCheckbox = () => {
    setFavoriteFilter(!favoriteFilter)
  }

  const handleFilter = () => {
    const filterData = {
      name: nameFilter,
      origin: originFilter,
      weight: imperialWeightFilter,
      lifespan: lifespanFilter,
      isFavorite: favoriteFilter
    }
    dispatch(addFilter(filterData))
  }

  const handleReset = () => {
    setNameFilter('')
    setImperialWeightFilter('')
    setLifespanFilter('')
    setFavoriteFilter(false)
    setOriginFilter('')
  }

  return (
    <>
      <FormControl>
        <InputLabel>Name</InputLabel>
        <OutlinedInput
          id="name"
          label="Name"
          value={nameFilter}
          onChange={e => setNameFilter(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Origin</InputLabel>
        <OutlinedInput
          id="origin"
          label="Origin"
          value={originFilter}
          onChange={e => setOriginFilter(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Lifespan</InputLabel>
        <OutlinedInput
          id="lifespan"
          label="Lifespan"
          value={lifespanFilter}
          type="number"
          onChange={e => setLifespanFilter(parseInt(e.target.value))}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Imperial Weight</InputLabel>
        <OutlinedInput
          id="imperialWeight"
          label="Imperial Weight"
          value={imperialWeightFilter}
          type="number"
          onChange={e => setImperialWeightFilter(parseInt(e.target.value))}
        />
      </FormControl>
      <FavoriteCheckbox />
      <ApplyButton />
      <ResetButton />
    </>
  )
}
