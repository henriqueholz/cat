import { Box } from '@mui/system'
import { Layout } from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import { Typography } from '@mui/material'
import { CatList } from './features/cat/CatList'
import { CatInfo } from './features/cat/CatInfo'
import React, { useState, useEffect } from 'react'
import { useGetCatsQuery } from './features/cat/catApiSlice'
import {
  selectFavorites,
  updateCatList,
  updateFilteredList
} from './features/cat/catSlice'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { Breed } from './types/Breeds'

function App() {
  const [options, setOptions] = useState({
    page: 1,
    limit: 10
  })
  const dispatch = useAppDispatch()

  // Fetch data from the cat API
  const { data, isFetching, error } = useGetCatsQuery(options, {
    // Retrieve the cat breeds from the cat Api once every 30 minutes
    pollingInterval: 1000 * 60 * 30 // 1000ms * 60 * 30 = 1800000ms = 30 minutes
  })
  const favoriteCatList = useAppSelector(state => selectFavorites(state)) // Cached favorite cat list data

  const withFavoriteAttribute = (
    newCatList: Breed[],
    favoriteBreedList: Breed[]
  ): Breed[] => {
    return newCatList.map(cat => ({
      ...cat,
      favorite: favoriteBreedList.find(
        favoriteBreed => cat.id === favoriteBreed.id
      )
        ? true
        : false
    }))
  }

  useEffect(() => {
    if (data !== undefined) {
      const newCatListWithFavorites: Breed[] = withFavoriteAttribute(
        data,
        favoriteCatList
      )
      dispatch(updateCatList(newCatListWithFavorites))
      dispatch(updateFilteredList(newCatListWithFavorites))
    }
  }, [data])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CatList />} />
        <Route path="/:id" element={<CatInfo />} />
        <Route
          path="*"
          element={
            <Box sx={{ color: 'white' }}>
              <Typography variant="h1">404</Typography>
              <Typography variant="h2">Page not found</Typography>
            </Box>
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
