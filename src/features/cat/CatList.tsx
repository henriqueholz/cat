import React from 'react'
import ImageList from '@mui/material/ImageList'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectFilteredList } from './catSlice'
import { ImageItem } from './components/ImageItem'
import BasicTabs from './components/BasicTabs'
import { useMediaQuery, useTheme } from '@mui/material'

export const CatList = () => {
  const filteredCatList = useAppSelector(state => selectFilteredList(state)) // Cached filtered cat list data with favorite
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <>
      <BasicTabs />
      <ImageList
        variant="woven"
        data-testid="image-list"
        cols={isDesktop ? 2 : 1}
      >
        {filteredCatList.map(item => (
          <Link to={`/${item.id}`} key={item.id}>
            <ImageItem cat={item} favoriteCatPreventDefault={true} />
          </Link>
        ))}
      </ImageList>
    </>
  )
}
