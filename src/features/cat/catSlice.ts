import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store"
import { Breed } from "../../types/Breeds";

const { createSlice } = require('@reduxjs/toolkit')

export interface SortParam {
  data: string,
  ascending: boolean
}

export interface FilterParams {
  name: string,
  origin: string,
  weight: number | "",
  lifespan: number | "",
  isFavorite: boolean,
}

export interface CatState {
  fullList: Breed[],
  favoriteList: Breed[],
  filteredList: Breed[],
  sortParam: SortParam,
  filterParams: FilterParams
}

export const initialFilterParams: FilterParams = { 
    name: "",
    origin: "",
    weight: "",
    lifespan: "",
    isFavorite: false,
};

interface FilterObject {
  filterFunction: (breed: Breed) => boolean
  active: boolean
}

export const initialState: CatState = { fullList : [], favoriteList: [], filteredList: [], sortParam: { data: "name", ascending: true}, filterParams: initialFilterParams};

const catSlice = createSlice({
  name: 'CatList',
  initialState,
  reducers: {
    updateCatList(state, action: PayloadAction<Breed[]>) {
      state.fullList = action.payload
      state.filteredList = action.payload
    },
    updateCat(state, action: PayloadAction<Breed>) {
      const fullList = state.fullList as Breed[]
      const index = fullList.findIndex(cat => cat.id === action.payload.id)
      if (index !== -1) {
        state.fullList[index] = action.payload
      } 
    },
    updateFavorite(state, action: PayloadAction<Breed>) {
      const fullList = state.fullList as Breed[]
      const fullListIndex = fullList.findIndex(cat => cat.id === action.payload.id)
      const newFavoriteStatus = !action.payload.favorite
      if (fullListIndex !== -1) {
        // Replacing the cat current favorite status on the full list
        state.fullList[fullListIndex] = {...action.payload, favorite: newFavoriteStatus}
      } 
      const filteredIndex = state.filteredList.findIndex(filtered => filtered.id === action.payload.id)
      if (filteredIndex !== -1) {
        // Replacing the cat current favorite status on the filtered list
        state.filteredList[filteredIndex] = {...action.payload, favorite: newFavoriteStatus}
      }
      const favoriteIndex = state.favoriteList.findIndex(favorite => favorite.id === action.payload.id)
      if (favoriteIndex === -1) {
        // Adding the new cat into the favorite list
        state.favoriteList.push({ ...action.payload, favorite: newFavoriteStatus })
      } else {
        // Removing the cat from the favorite list
        state.favoriteList.splice(favoriteIndex, 1);
      }
    },
    updateFilteredList(state, action: PayloadAction<Breed[]>) {
      state.filteredList = action.payload
    },
    updateSort(state, action: PayloadAction<SortParam>) {
      state.sortParam = action.payload
      if (action.payload.ascending) {
        if (action.payload.data === 'name') {
          state.filteredList = [...state.fullList].sort((a, b) => (a.name > b.name ? 1 : -1)) 
        } else if (action.payload.data === 'weight') {
          state.filteredList = 
              [...state.fullList].sort((a, b) =>
                parseInt(a.weight.imperial.split('-')[0]) >
                parseInt(b.weight.imperial.split('-')[0])
                  ? 1
                  : -1
          )
        } else if (action.payload.data === 'lifespan') {
          state.filteredList = 
              [...state.fullList].sort((a, b) =>
                parseInt(a.life_span.split('-')[0]) >
                parseInt(b.life_span.split('-')[0])
                  ? 1
                  : -1
              )

        } else if (action.payload.data === 'origin') {
          state.filteredList = 
              [...state.fullList].sort((a, b) => (a.origin > b.origin ? 1 : -1))      
        }
      } else {
        if (action.payload.data === 'name') {
          state.filteredList = [...state.fullList].sort((a, b) => (a.name > b.name ? -1 : 1)) 

        } else if (action.payload.data === 'weight') {
          state.filteredList = 
              [...state.fullList].sort((a, b) =>
                parseInt(a.weight.imperial.split('-')[0]) >
                parseInt(b.weight.imperial.split('-')[0])
                  ? -1
                  : 1
          )
        } else if (action.payload.data === 'lifespan') {
          state.filteredList = 
              [...state.fullList].sort((a, b) =>
                parseInt(a.life_span.split('-')[0]) >
                parseInt(b.life_span.split('-')[0])
                  ? -1
                  : 1
              )
        } else if (action.payload.data === 'origin') {
          state.filteredList = 
              [...state.fullList].sort((a, b) => (a.origin > b.origin ? -1 : 1))      
        }
      }


    },
    updateFilter(state, action: PayloadAction<FilterParams>) {
      state.filterParams = action.payload
      const filter = state.filterParams
      const filters: FilterObject[] = [
        {
          filterFunction: (breed: Breed) =>
            breed.name.toLowerCase().includes(filter.name.toLowerCase()),
          active: !!filter.name
        },
        {
          filterFunction: (breed: Breed) =>
            breed.origin.toLowerCase().includes(filter.origin.toLowerCase()),
          active: !!filter.origin
        },
        {
          filterFunction: (breed: Breed) =>
            Number(filter.lifespan) >= parseInt(breed.life_span.split('-')[0]) &&
            Number(filter.lifespan) <= parseInt(breed.life_span.split('-')[1]),
          active: !!filter.lifespan
        },
        {
          filterFunction: (breed: Breed) =>
            Number(filter.weight) >=
              parseInt(breed.weight.imperial.split('-')[0]) &&
            Number(filter.weight) <= parseInt(breed.weight.imperial.split('-')[1]),
          active: !!filter.weight
        },
        {
          filterFunction: (breed: Breed) => breed.favorite === filter.isFavorite,
          active: !!filter.isFavorite
        }
      ]
      
      state.filteredList = state.fullList.filter(func =>
        filters.every(filter => !filter.active || filter.filterFunction(func)))
    }
  }
})

// Selectors
export const selectCatList = (state: RootState) => {
  const catList = state.catSlice as CatState
  return catList.fullList
}

export const selectCat = (state: RootState, id: string) => {
  const catList = state.catSlice as CatState
  if (id === undefined) {
    return catList.fullList[0]
  }
  return catList.fullList.find(cat => cat.id === id)
}

export const selectFavorites = (state: RootState) => {
  const favoriteList = state.catSlice as CatState
  return favoriteList.favoriteList
}

export const selectFilteredList = (state: RootState) => {
  const catList = state.catSlice as CatState
  return catList.filteredList
}

export const selectSort = (state: RootState) => {
  const sort = state.catSlice as CatState
  return sort.sortParam
}

export default catSlice.reducer

export const { updateCatList, updateCat, updateFavorite, updateFilteredList, updateSort, updateFilter } =
catSlice.actions

export const catListReducer = catSlice.reducer;
