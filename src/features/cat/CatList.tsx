import React, { useEffect } from 'react'
import ImageList from '@mui/material/ImageList'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectFilteredList, updateFilteredList } from './catSlice'
import { ImageItem } from './components/ImageItem'
import BasicTabs from './components/BasicTabs'
import { selectSort } from './sortSlice'

export const CatList = () => {
  const filteredCatList = useAppSelector(state => selectFilteredList(state)) // Cached filtered cat list data with favorite
  const sort = useAppSelector(state => selectSort(state)) // Cached cat list data with favorite and user_image
  const cats = useAppSelector(state => selectFilteredList(state)) // Cached filtered cat list data with favorite and user_image

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (cats !== undefined) {
      if (sort.data === 'name') {
        dispatch(
          updateFilteredList(
            [...cats].sort((a, b) => (a.name > b.name ? 1 : -1))
          )
        )
      } else if (sort.data === 'weight') {
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
      } else if (sort.data === 'lifespan') {
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
      } else if (sort.data === 'origin') {
        dispatch(
          updateFilteredList(
            [...cats].sort((a, b) => (a.origin > b.origin ? 1 : -1))
          )
        )
      }
    }
  }, [sort])

  return (
    <>
      <BasicTabs />
      <ImageList variant="woven" data-testid="image-list">
        {filteredCatList.map(item => (
          <Link to={`/${item.id}`} key={item.id}>
            <ImageItem cat={item} favoriteCatPreventDefault={true} />
          </Link>
        ))}
      </ImageList>
    </>
  )
}
