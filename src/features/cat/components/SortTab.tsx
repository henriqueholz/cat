import React, { useEffect } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { selectCatList, updateFilteredList } from '../catSlice'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectSort, updateSort } from '../sortSlice'

export const SortTab = ({}) => {
  const cats = useAppSelector(state => selectCatList(state)) // Cached cat list data with favorite and user_image
  const sort = useAppSelector(state => selectSort(state)) // Cached cat list data with favorite and user_image

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (cats !== undefined) {
      if (sort.data.toString() === 'name') {
        console.log('tetes')
        dispatch(
          updateFilteredList(
            [...cats].sort((a, b) => (a.name > b.name ? 1 : -1))
          )
        )
      } else if (sort.data.toString() === 'weight') {
        dispatch(
          updateFilteredList(
            [...cats].sort((a, b) =>
              parseInt(a.weight.imperial.split('-')[0]) >
              parseInt(b.weight.imperial.split('-')[0])
                ? 1
                : -1
            )
          )
        )
      } else if (sort.data.toString() === 'lifespan') {
        dispatch(
          updateFilteredList(
            [...cats].sort((a, b) =>
              parseInt(a.life_span.split('-')[0]) >
              parseInt(b.life_span.split('-')[0])
                ? 1
                : -1
            )
          )
        )
      } else if (sort.data.toString() === 'origin') {
        dispatch(
          updateFilteredList(
            [...cats].sort((a, b) => (a.origin > b.origin ? 1 : -1))
          )
        )
      }
    }
  }, [sort])

  return (
    <FormControl sx={{ minWidth: 160 }}>
      <InputLabel>Sort by</InputLabel>
      <Select
        value={sort.data}
        label="Sort by"
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
