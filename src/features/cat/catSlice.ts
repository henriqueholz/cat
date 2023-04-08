import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store"
import { Breed } from "../../types/Breeds";

const { createSlice } = require('@reduxjs/toolkit')

interface CatList {
  fullList: Breed[],
  favoriteList: Breed[],
  filteredList: Breed[]
}

const initialState: CatList = { fullList : [], favoriteList: [], filteredList: [] };

const catListSlice = createSlice({
  name: 'CatList',
  initialState,
  reducers: {
    updateCatList(state, action: PayloadAction<Breed[]>) {
      state.fullList = action.payload
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
      console.log(newFavoriteStatus)
      if (fullListIndex !== -1) {
        // Replacing the cat current favorite status on the full list
        state.fullList[fullListIndex] = {...action.payload, favorite: newFavoriteStatus}
      } 
      const filteredIndex = state.filteredList.findIndex(filtered => filtered.id === action.payload.id)
      console.log(filteredIndex)

      if (filteredIndex !== -1) {
        // Replacing the cat current favorite status on the filtered list
        state.filteredList[filteredIndex] = {...action.payload, favorite: newFavoriteStatus}
        console.log(state.filteredList[filteredIndex].favorite)
      }
      const favoriteIndex = state.favoriteList.findIndex(favorite => favorite.id === action.payload.id)
      if (favoriteIndex === -1) {
        // Adding the new cat into the favorite list
        state.favoriteList.push({ ...action.payload })
      } else {
        // Removing the cat from the favorite list
        state.favoriteList.splice(favoriteIndex, 1);
      }
    },
    updateFilteredList(state, action: PayloadAction<Breed[]>) {
      state.filteredList = action.payload
    }
  }
})

// Selectors
export const selectCatList = (state: RootState) => {
  const catList = state.catListSlice as CatList
  return catList.fullList
}

export const selectCat = (state: RootState, id: string) => {
  const catList = state.catListSlice as CatList
  return catList.fullList.find(cat => cat.id === id)
}

export const selectFavorites = (state: RootState) => {
  const favoriteList = state.catListSlice as CatList
  return favoriteList.favoriteList
}

export const selectFilteredList = (state: RootState) => {
  const catList = state.catListSlice as CatList
  return catList.filteredList
}

export default catListSlice.reducer

export const { updateCatList, updateCat, updateFavorite, updateFilteredList } =
catListSlice.actions

export const catListReducer = catListSlice.reducer;