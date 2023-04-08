import React, { useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useGetBreedsQuery } from './catApiSlice'
import {
  selectFilteredList,
  updateCatList,
  updateFilteredList
} from './catSlice'
import { ImageItem } from './components/ImageItem'
import BasicTabs from './components/BasicTabs'

export const BreedList = () => {
  const [options, setOptions] = useState({
    page: 1,
    limit: 10
  })

  const { data, isFetching, error } = useGetBreedsQuery(options) // Fetch date from the cat API
  const dispatch = useAppDispatch()

  const filteredCatList = useAppSelector(state => selectFilteredList(state)) // Cached filtered cat list data with favorite and user_image

  useEffect(() => {
    if (data !== undefined && filteredCatList.length === 0) {
      dispatch(updateCatList(data))
      dispatch(updateFilteredList(data))
    }
  }, [data])

  return (
    <>
      <BasicTabs />
      <ImageList variant="woven">
        {filteredCatList.map(item => (
          <Link to={`/${item.id}`} key={item.id}>
            <ImageItem cat={item} favoriteCatPreventDefault={true} />
          </Link>
        ))}
      </ImageList>
    </>
  )
}
