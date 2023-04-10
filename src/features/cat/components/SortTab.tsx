import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectSort, updateSort } from '../sortSlice'

export const SortTab = () => {
  const sort = useAppSelector(state => selectSort(state)) // Cached cat list data with favorite and user_image

  const dispatch = useAppDispatch()

  return (
    <FormControl sx={{ minWidth: 160, marginBottom: '0.5rem' }}>
      <InputLabel>Sort by</InputLabel>
      <Select
        value={sort.data}
        label="Sort by"
        data-testid="sort-select"
        onChange={e => dispatch(updateSort(e.target.value))}
      >
        <MenuItem value={'name'}>Name</MenuItem>
        <MenuItem value={'weight'}>Imperial Weight</MenuItem>
        <MenuItem value={'lifespan'}>Lifespan</MenuItem>
        <MenuItem value={'origin'}>Origin</MenuItem>
      </Select>
    </FormControl>
  )
}
