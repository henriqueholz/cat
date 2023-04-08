import React, { useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormControlLabel
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useGetBreedsQuery } from './catApiSlice'
import { selectCatList, updateCatList } from './catSlice'
import { addFilter } from './filterSlice'
import { ImageItem } from './components/ImageItem'
import BasicTabs from './components/TabPanel'

export const BreedList = () => {
  const [nameFilter, setNameFilter] = useState<string>('')
  const [imperialWeightFilter, setImperialWeightFilter] = useState<number | ''>(
    ''
  )
  const [lifespanFilter, setLifespanFilter] = useState<number | ''>('')
  const [favoriteFilter, setFavoriteFilter] = useState<boolean>(false)
  const [originFilter, setOriginFilter] = useState<string>('')
  const [options, setOptions] = useState({
    page: 1,
    limit: 10
  })

  const { data, isFetching, error } = useGetBreedsQuery(options) // Fetch date from the cat API
  const dispatch = useAppDispatch()

  const breedList = useAppSelector(state => selectCatList(state)) // Cached breed list data with favorite and user_image

  useEffect(() => {
    if (data !== undefined) {
      dispatch(updateCatList(data))
    }
  }, [data])

  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 }
        }}
        noValidate
        autoComplete="off"
      >
        <BasicTabs />
      </Box>
      <ImageList>
        {breedList.map(item => (
          <Link to={`/${item.id}`} key={item.id}>
            <ImageItem cat={item} favoriteCatPreventDefault={true} />
          </Link>
        ))}
      </ImageList>
    </>
  )
}
