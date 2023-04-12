import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectSort, updateSort } from '../catSlice'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'

export const SortTab = () => {
  const sort = useAppSelector(state => selectSort(state)) // Cached sort param

  const dispatch = useAppDispatch()

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ minWidth: 160, marginBottom: '0.5rem' }}>
        <InputLabel>Sort by</InputLabel>
        <Select
          value={sort.data}
          label="Order by"
          data-testid="sort-select"
          onChange={e =>
            dispatch(updateSort({ ...sort, data: e.target.value }))
          }
        >
          <MenuItem value={'name'}>Name</MenuItem>
          <MenuItem value={'weight'}>Imperial Weight</MenuItem>
          <MenuItem value={'lifespan'}>Lifespan</MenuItem>
          <MenuItem value={'origin'}>Origin</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          display: 'flex',
          ml: '0.1em',
          alignItems: 'center',
          '&:hover': {
            cursor: 'pointer'
          }
        }}
        onClick={() =>
          dispatch(updateSort({ ...sort, ascending: !sort.ascending }))
        }
        title={sort.ascending ? 'Ascending' : 'Descending'}
      >
        {sort.ascending ? <ArrowUpward /> : <ArrowDownward />}
      </Box>
    </Box>
  )
}
