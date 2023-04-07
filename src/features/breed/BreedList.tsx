import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { Box, Button, FormControl, InputLabel, ListSubheader, OutlinedInput, Select, Stack, MenuItem, Checkbox, FormControlLabel, SelectChangeEvent, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Breed } from '../../types/Breeds';
import { breedResponse } from '../mocks/breed';
import { useGetBreedsQuery } from './breedApiSlice';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { favoriteBreed, selectFavorites, unfavoriteBreed } from './favoriteListSlice';
import { selectBreedList, uploadBreedList } from './breedListSlice';
import { addFilter } from './filterSlice';

export const BreedList = () => {
  const [breedList, setBreedList] = useState<Breed[]>([]) // api data with favorite attribute
  const [filteredBreedList, setFilteredBreedList] = useState<Breed[]>([]) // breed list data with filters
  const [nameFilter, setNameFilter] = useState<string>("")
  const [imperialWeightFilter, setImperialWeightFilter] = useState<number | "">("")
  const [lifespanFilter, setLifespanFilter] = useState<number | "">("")
  const [favoriteFilter, setFavoriteFilter] = useState<boolean>(false)
  const [originFilter, setOriginFilter] = useState<string>("")
  const [options, setOptions] = useState({
    page: 1,
    limit: 10
  });

  const { data, isFetching, error } = useGetBreedsQuery(options);
  const dispatch = useAppDispatch()

  // useAppSelector((state) => selectBreedList(state)); 
  const favoriteList = useAppSelector((state) => selectFavorites(state)); 

  const updateBreedList = (data: Breed[]): Breed[] => {
    const newBreedList: Breed[] = data.map(breed => ({
      ...breed,
      favorite: favoriteList.find(favoriteBreed => breed.id === favoriteBreed.id) ? true : false
    }))
    return newBreedList
  }

  useEffect(() => {
    if (data !== undefined) {
      // dispatch(uploadBreedList(data))
      const breedWithFavoriteList = updateBreedList(data)
      setBreedList(breedWithFavoriteList)
      setFilteredBreedList(breedWithFavoriteList)
    }
  }, [data])

  const title = (item: Breed) => `${item.name} | Origin: ${item.origin}`

  const subtitle = (item: Breed) => `Lifespan: ${item.life_span} | Weight: ${item.weight.imperial}`

  const SearchButton = () => {
    return (
      <Button variant="contained" onClick={() => handleFilter()}>Search</Button>
    )
  }

  const ResetButton = () => {
    return (
      <Button variant="text" onClick={() => handleReset()}>Reset</Button>
    )
  }

  const FavoriteCheckbox = () => {
    return (
      <FormControlLabel
      control={
        <Checkbox checked={favoriteFilter} onChange={handleFavoriteCheckbox} name="favorites" />
      }
      label="favorites"
    />
    )
  }

  const handleFavoriteCheckbox = () => {
    setFavoriteFilter(!favoriteFilter);
  }

  const handleFilter = () => {
    if (data !== undefined) {
      const filterData = {
        name: nameFilter,
        origin: originFilter,
        weight: imperialWeightFilter,
        lifespan: lifespanFilter,
        isFavorite: favoriteFilter,
      }
      dispatch(addFilter(filterData))
  
      const breedWithFavoriteList = updateBreedList(data)
      setFilteredBreedList(breedWithFavoriteList)
      if (nameFilter !== undefined && nameFilter !== "") {
        setFilteredBreedList(breedList => breedList.filter(breed => breed.name.toLowerCase().includes(nameFilter.toLowerCase())))
      }
      if (lifespanFilter !== undefined && lifespanFilter !== "") {
        setFilteredBreedList(breedList => breedList.filter(breed => (lifespanFilter >= parseInt(breed.life_span.split("-")[0])) && lifespanFilter <= parseInt(breed.life_span.split("-")[1])))
      }
      if (imperialWeightFilter !== undefined && imperialWeightFilter !== "") {
        setFilteredBreedList(breedList => breedList.filter(breed => (imperialWeightFilter >= parseInt(breed.weight.imperial.split("-")[0])) && imperialWeightFilter <= parseInt(breed.weight.imperial.split("-")[1])))
      }
      if (favoriteFilter) {
        console.log(filteredBreedList)
        setFilteredBreedList(breedList => breedList.filter(breed => breed.favorite))
        console.log(filteredBreedList)
      }
      if (originFilter) {
        setFilteredBreedList(breedList => breedList.filter(breed => breed.origin.toLowerCase().includes(originFilter.toLowerCase())))
      }
    }
  }

  const handleReset = () => {
    if (data !== undefined) {
      setFilteredBreedList(breedList) 
      setNameFilter("")
      setImperialWeightFilter("")
      setLifespanFilter("")
      setFavoriteFilter(false)
      setOriginFilter("")
    }
  }

  const handleFavoriteBreed = (e: React.MouseEvent<HTMLButtonElement>, breed: Breed) => {
    e.preventDefault()
    console.log(breed.favorite)
    if (breed.favorite) {
      // Remove the cat from the redux cached favorites list
      dispatch(unfavoriteBreed(breed.id))
    } else {
      // Add the cat into the redux cached favorites list
      dispatch(favoriteBreed(breed))
    }

    const newFilteredBreedList = [...filteredBreedList]
    setFilteredBreedList(newFilteredBreedList.map(item => item.id === breed.id ? {...item, favorite: !item.favorite} : item))
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
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
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Origin</InputLabel>
            <OutlinedInput
              id="origin"
              label="Origin"
              value={originFilter}
              onChange={(e) => setOriginFilter(e.target.value)}
            />
          </FormControl>   
          <FormControl>
            <InputLabel>Lifespan</InputLabel>
            <OutlinedInput
              id="lifespan"
              label="Lifespan"
              value={lifespanFilter}
              type="number"
              onChange={(e) => setLifespanFilter(parseInt(e.target.value))}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Imperial Weight</InputLabel>
            <OutlinedInput
              id="imperialWeight"
              label="Imperial Weight"
              value={imperialWeightFilter}
              type="number"
              onChange={(e) => setImperialWeightFilter(parseInt(e.target.value))}
            />

          </FormControl>       
          <FavoriteCheckbox/>
          <SearchButton />
          <ResetButton />
      </Box>
      <ImageList>
      {/* <ImageListItem key="Subheader" cols={2}>
      </ImageListItem> */}
        {filteredBreedList.map((item) => (
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
                    onClick={(e) => handleFavoriteBreed(e, item)}
                  >
                     {item.favorite ? <Favorite /> : <FavoriteBorder /> } 
                  </IconButton>
                }
              />
            </ImageListItem>
          </Link>
      ))}
      </ImageList>
    </>
  );
}