import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { ArrowBack } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import React, { useEffect } from 'react'
import {
  selectFavorites,
  selectFilteredList,
  updateCatList,
  updateFilteredList
} from '../features/cat/catSlice'
import { Breed } from '../types/Breeds'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useGetCatsQuery } from '../features/cat/catApiSlice'
import { selectSort } from '../features/cat/sortSlice'

export const Header = ({
  toggle,
  theme
}: {
  toggle: () => void
  theme: string
}) => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  // Fetch data from the cat API
  const { data, isFetching, error } = useGetCatsQuery(
    {},
    {
      // Retrieve the cat breeds from the cat Api once every 30 minutes
      pollingInterval: 1000 * 60 * 30 // 1000ms * 60 * 30 = 1800000ms = 30 minutes
    }
  )
  const favoriteCatList = useAppSelector(state => selectFavorites(state)) // Fetch cached favorite cat list data

  // Build cat list from the API with the favorite parameter
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

  // Updating our cached cat list with the API data
  useEffect(() => {
    if (data !== undefined) {
      const newCatListWithFavorites: Breed[] = withFavoriteAttribute(
        data,
        favoriteCatList
      )
      dispatch(updateCatList(newCatListWithFavorites))
    }
  }, [data])

  const sort = useAppSelector(state => selectSort(state)) // Cached cat list data with favorite and user_image
  const cats = useAppSelector(state => selectFilteredList(state)) // Cached filtered cat list data with favorite and user_image

  // Used for sorting the cat list
  useEffect(() => {
    if (cats !== undefined && cats.length > 0) {
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

  const isCatDetailsPage = () => location.pathname.split('/')[1] !== ''

  return (
    <Box>
      <Toolbar>
        {isCatDetailsPage() ? (
          <Link to="/">
            <IconButton
              size="large"
              edge="start"
              aria-label="back"
              sx={{ mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
          </Link>
        ) : (
          ''
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {isCatDetailsPage() ? 'Cat Details' : 'Cat List'}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          sx={{ ml: 1 }}
          onClick={toggle}
          color="inherit"
          data-testid="change-theme-button"
        >
          {theme === 'dark' ? (
            <Brightness7Icon data-testid="dark-theme-icon" />
          ) : (
            <Brightness4Icon data-testid="light-theme-icon" />
          )}
        </IconButton>
      </Toolbar>
    </Box>
  )
}
