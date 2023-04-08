import React, { useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Breed } from '../../types/Breeds'
import { useGetBreedsQuery } from './catApiSlice'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
// import {
//   favoriteBreed,
//   selectFavorites,
//   unfavoriteBreed
// } from './favoriteListSlice'
import {
  selectCatList,
  selectFavorites,
  updateFavoriteList,
  uploadCatList
} from './catListSlice'
import { addFilter } from './filterSlice'

export const BreedList = () => {
  const [filteredBreedList, setFilteredBreedList] = useState<Breed[]>([]) // Filtered and sorted breed list
  const [nameFilter, setNameFilter] = useState<string>('')

  const [imperialWeightFilter, setImperialWeightFilter] = useState<number | ''>(
    ''
  )
  const [lifespanFilter, setLifespanFilter] = useState<number | ''>('')
  const [favoriteFilter, setFavoriteFilter] = useState<boolean>(false)
  const [originFilter, setOriginFilter] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('name')
  const [options, setOptions] = useState({
    page: 1,
    limit: 10
  })

  const { data, isFetching, error } = useGetBreedsQuery(options) // Fetch date from the cat API
  const dispatch = useAppDispatch()

  const breedList = useAppSelector(state => selectCatList(state)) // Cached breed list data with favorite and user_image
  const favoriteList = useAppSelector(state => selectFavorites(state)) // Cached favorite breed list

  const mergeWithFavoriteList = (data: Breed[]): Breed[] => {
    const newBreedList: Breed[] = data.map(breed => ({
      ...breed,
      favorite: favoriteList.find(
        favoriteBreed => breed.id === favoriteBreed.id
      )
        ? true
        : false
    }))
    console.log(newBreedList)
    return newBreedList
  }

  useEffect(() => {
    if (data !== undefined) {
      const breedWithFavoriteList = mergeWithFavoriteList(data)
      dispatch(uploadCatList(breedWithFavoriteList))
      setFilteredBreedList(breedWithFavoriteList)
    }
  }, [data])

  const title = (item: Breed) => `${item.name} | Origin: ${item.origin}`

  const subtitle = (item: Breed) =>
    `Lifespan: ${item.life_span} | Weight: ${item.weight.imperial}`

  const ApplyButton = () => {
    return (
      <Button variant="contained" onClick={() => handleFilter()}>
        Apply
      </Button>
    )
  }

  const ResetButton = () => {
    return (
      <Button variant="text" onClick={() => handleReset()}>
        Reset
      </Button>
    )
  }

  const FavoriteCheckbox = () => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={favoriteFilter}
            onChange={handleFavoriteCheckbox}
            name="favorites"
          />
        }
        label="favorites"
      />
    )
  }

  const handleFavoriteCheckbox = () => {
    setFavoriteFilter(!favoriteFilter)
  }

  const handleSortbyChange = (event: SelectChangeEvent) => {
    const sortby = event.target.value as string
    if (sortby === 'name') {
      setFilteredBreedList(
        filteredBreedList.sort((a, b) => (a.name > b.name ? 1 : -1))
      )
    } else if (sortby === 'weight') {
      setFilteredBreedList(
        filteredBreedList.sort((a, b) =>
          parseInt(a.weight.imperial.split('-')[0]) >
          parseInt(b.weight.imperial.split('-')[0])
            ? 1
            : -1
        )
      )
    } else if (sortby === 'lifespan') {
      setFilteredBreedList(
        filteredBreedList.sort((a, b) =>
          parseInt(a.life_span.split('-')[0]) >
          parseInt(b.life_span.split('-')[0])
            ? 1
            : -1
        )
      )
    } else if (sortby === 'origin') {
      setFilteredBreedList(
        filteredBreedList.sort((a, b) => (a.origin > b.origin ? 1 : -1))
      )
    }
  }

  const SortbySelect = () => {
    return (
      // <Box >
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel>Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortBy}
          label="Sort by"
          onChange={handleSortbyChange}
        >
          <MenuItem value={'name'}>Name</MenuItem>
          <MenuItem value={'weight'}>Imperial Weight</MenuItem>
          <MenuItem value={'lifespan'}>Lifespan</MenuItem>
          <MenuItem value={'origin'}>Origin</MenuItem>
        </Select>
      </FormControl>
    )
  }

  const handleFilter = () => {
    if (data !== undefined) {
      const filterData = {
        name: nameFilter,
        origin: originFilter,
        weight: imperialWeightFilter,
        lifespan: lifespanFilter,
        isFavorite: favoriteFilter
      }
      dispatch(addFilter(filterData))

      setFilteredBreedList(filterBreeds())
    }
  }

  const handleReset = () => {
    if (data !== undefined) {
      setFilteredBreedList(breedList)
      setNameFilter('')
      setImperialWeightFilter('')
      setLifespanFilter('')
      setFavoriteFilter(false)
      setOriginFilter('')
    }
  }

  const handleFavoriteBreed = (
    e: React.MouseEvent<HTMLButtonElement>,
    breed: Breed
  ) => {
    e.preventDefault()
    dispatch(updateFavoriteList(breed))

    const newFilteredBreedList = [...filteredBreedList]
    setFilteredBreedList(
      newFilteredBreedList.map(item =>
        item.id === breed.id ? { ...item, favorite: !item.favorite } : item
      )
    )
  }

  interface FilterObject {
    filterFunction: (breed: Breed) => boolean
    active: boolean
  }

  const filters: FilterObject[] = [
    {
      filterFunction: (breed: Breed) =>
        breed.name.toLowerCase().includes(nameFilter.toLowerCase()),
      active: !!nameFilter
    },
    {
      filterFunction: (breed: Breed) =>
        breed.origin.toLowerCase().includes(originFilter.toLowerCase()),
      active: !!originFilter
    },
    {
      filterFunction: (breed: Breed) =>
        Number(lifespanFilter) >= parseInt(breed.life_span.split('-')[0]) &&
        Number(lifespanFilter) <= parseInt(breed.life_span.split('-')[1]),
      active: !!lifespanFilter
    },
    {
      filterFunction: (breed: Breed) =>
        Number(imperialWeightFilter) >=
          parseInt(breed.weight.imperial.split('-')[0]) &&
        Number(imperialWeightFilter) <=
          parseInt(breed.weight.imperial.split('-')[1]),
      active: !!imperialWeightFilter
    },
    {
      filterFunction: (breed: Breed) => breed.favorite === favoriteFilter,
      active: !!favoriteFilter
    }
  ]

  const filterBreeds = (): Breed[] => {
    return breedList.filter(person =>
      filters.every(filter => !filter.active || filter.filterFunction(person))
    )
  }

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
        <FormControl>
          <InputLabel>Name</InputLabel>
          <OutlinedInput
            id="name"
            label="Name"
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Origin</InputLabel>
          <OutlinedInput
            id="origin"
            label="Origin"
            value={originFilter}
            onChange={e => setOriginFilter(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Lifespan</InputLabel>
          <OutlinedInput
            id="lifespan"
            label="Lifespan"
            value={lifespanFilter}
            type="number"
            onChange={e => setLifespanFilter(parseInt(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Imperial Weight</InputLabel>
          <OutlinedInput
            id="imperialWeight"
            label="Imperial Weight"
            value={imperialWeightFilter}
            type="number"
            onChange={e => setImperialWeightFilter(parseInt(e.target.value))}
          />
        </FormControl>
        <FavoriteCheckbox />
        <SortbySelect />
        <ApplyButton />
        <ResetButton />
      </Box>
      <ImageList>
        {filteredBreedList.map(item => (
          <Link to={`/${item.id}`} key={item.id}>
            <ImageListItem>
              <img
                src={`https://cdn2.thecatapi.com/images/${item.reference_image_id}.jpg`}
                srcSet={`https://cdn2.thecatapi.com/images/${item.reference_image_id}.jpg`}
                alt={item.name}
                loading="lazy"
              />
              <ImageListItemBar
                title={title(item)}
                subtitle={subtitle(item)}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.name}`}
                    onClick={e => handleFavoriteBreed(e, item)}
                  >
                    {item.favorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                }
              />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    </>
  )
}
