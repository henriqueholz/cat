import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { updateCatList } from '../catSlice'
import { useGetBreedsQuery } from '../catApiSlice'
import { useAppDispatch } from '../../../app/hooks'

export const SortTab = () => {
  const [sort, setSort] = useState<string>('name')
  const dispatch = useAppDispatch()
  const [options, setOptions] = useState({
    page: 1,
    limit: 10
  })
  const { data, isFetching, error } = useGetBreedsQuery(options) // Fetch date from the cat API

  useEffect(() => {
    if (data !== undefined) {
      if (sort === 'name') {
        dispatch(
          updateCatList([...data].sort((a, b) => (a.name > b.name ? 1 : -1)))
        )
      } else if (sort === 'weight') {
        dispatch(
          updateCatList(
            [...data].sort((a, b) =>
              parseInt(a.weight.imperial.split('-')[0]) >
              parseInt(b.weight.imperial.split('-')[0])
                ? 1
                : -1
            )
          )
        )
      } else if (sort === 'lifespan') {
        dispatch(
          updateCatList(
            [...data].sort((a, b) =>
              parseInt(a.life_span.split('-')[0]) >
              parseInt(b.life_span.split('-')[0])
                ? 1
                : -1
            )
          )
        )
      } else if (sort === 'origin') {
        dispatch(
          updateCatList(
            [...data].sort((a, b) => (a.origin > b.origin ? 1 : -1))
          )
        )
      }
    }
  }, [sort])

  return (
    <FormControl sx={{ minWidth: 160 }}>
      <InputLabel>Sort by</InputLabel>
      <Select
        value={sort}
        label="Sort by"
        onChange={e => setSort(e.target.value)}
      >
        <MenuItem value={'name'}>Name</MenuItem>
        <MenuItem value={'weight'}>Imperial Weight</MenuItem>
        <MenuItem value={'lifespan'}>Lifespan</MenuItem>
        <MenuItem value={'origin'}>Origin</MenuItem>
      </Select>
    </FormControl>
  )
}
