import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectSort, updateSort } from '../catSlice'

export const SortTab = () => {
  const sort = useAppSelector(state => selectSort(state)) // Cached sort param

  const dispatch = useAppDispatch()

  return (
    <FormControl sx={{ minWidth: 160, marginBottom: '0.5rem' }}>
      <InputLabel>Sort by</InputLabel>
      <Select
        value={sort.data}
        label="Sort by"
        data-testid="sort-select"
        onChange={e => dispatch(updateSort({ data: e.target.value }))}
      >
        <MenuItem value={'name'}>Name</MenuItem>
        <MenuItem value={'weight'}>Imperial Weight</MenuItem>
        <MenuItem value={'lifespan'}>Lifespan</MenuItem>
        <MenuItem value={'origin'}>Origin</MenuItem>
      </Select>
    </FormControl>
  )
}
