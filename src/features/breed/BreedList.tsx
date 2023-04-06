import React, { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Button, FormControl, InputLabel, ListSubheader, OutlinedInput, Select, Stack, MenuItem, Checkbox, FormControlLabel, SelectChangeEvent, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectBreeds } from './breedSlice';
import { Breed } from '../../types/Breeds';

export const BreedList = () => {
  const breeds = useAppSelector(selectBreeds) as Breed[];
  const [breedList, setBreedList] = useState<Breed[]>(breeds)
  const [nameFilter, setNameFilter] = useState<string>("")
  const [imperialWeightFilter, setImperialWeightFilter] = useState<number | "">("")
  const [lifespanFilter, setLifespanFilter] = useState<number | "">("")
  const [favoriteFilter, setFavoriteFilter] = useState<boolean>(false)
  const [originFilter, setOriginFilter] = useState<string>("")
  const [originFilterList, setOriginFilterList] = useState<string[]>(["Egypt"])
  
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

  const handleOriginChange = (event: SelectChangeEvent) => {
    setOriginFilter(event.target.value);
  };

  const OriginSelect = () => {
    return (
      <FormControl sx={{ m: 1, minWidth: 100 }}>
      <InputLabel>Origin</InputLabel>
      <Select
        value={originFilter}
        label="Origin"
        onChange={handleOriginChange}
      >
        {originFilterList.map(origin => <MenuItem key={origin} value={origin}>{origin}</MenuItem>)}
      </Select>
    </FormControl>
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
    setBreedList(breeds)
    if (nameFilter !== undefined && nameFilter !== "") {
      setBreedList(breedList => breedList.filter(breed => breed.name.toLowerCase().includes(nameFilter.toLowerCase())))
    }
    if (lifespanFilter !== undefined && lifespanFilter !== "") {
      setBreedList(breedList => breedList.filter(breed => (lifespanFilter >= parseInt(breed.life_span.split("-")[0])) && lifespanFilter <= parseInt(breed.life_span.split("-")[1])))
    }
    if (imperialWeightFilter !== undefined && imperialWeightFilter !== "") {
      setBreedList(breedList => breedList.filter(breed => (imperialWeightFilter >= parseInt(breed.weight.imperial.split("-")[0])) && imperialWeightFilter <= parseInt(breed.weight.imperial.split("-")[1])))
    }
    if (favoriteFilter) {
      setBreedList(breedList => breedList.filter(breed => breed.favorite))
    }
    if (originFilter) {
      console.log(originFilter)
      setBreedList(breedList => breedList.filter(breed => breed.origin === originFilter))
    }
  }

  const handleReset = () => {
    setBreedList(breeds)
    setNameFilter("")
    setImperialWeightFilter("")
    setLifespanFilter("")
    setFavoriteFilter(false)
    setOriginFilter("")
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
          <OriginSelect/>
          <FavoriteCheckbox/>
          <SearchButton />
          <ResetButton />
      </Box>
      <ImageList>
      {/* <ImageListItem key="Subheader" cols={2}>
      </ImageListItem> */}
        {breedList.map((item) => (
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
                  >
                    <InfoIcon />
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