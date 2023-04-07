import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store"
import { Breed } from "../../types/Breeds";

const { createSlice } = require('@reduxjs/toolkit')

interface FavoriteList {
  data: Breed[]
}

const initialState: FavoriteList = { data : []};

const favoriteListSlice = createSlice({
  name: 'favoriteList',
  initialState,
  reducers: {
    favoriteBreed(state, action: PayloadAction<Breed>) {
      const index = state.data.findIndex(favorite => favorite.id === action.payload.id)
      if (index === -1) {
        state.data.push({ ...action.payload });
      } 
    },
    unfavoriteBreed(state, action: PayloadAction<string>) {
      const index = state.data.findIndex((breed) => breed.id === action.payload);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    }
  }
})

// Selectors
export const findFavoriteById = (state: RootState, id: string) => {
  const favoriteList= state.favoriteListSlice as FavoriteList
  return favoriteList.data.findIndex(data => data.id === id)
}

export const selectFavorites = (state: RootState) => {
  const favoriteList= state.favoriteListSlice as FavoriteList
  return favoriteList.data
}

export default favoriteListSlice.reducer

export const { favoriteBreed, unfavoriteBreed } =
favoriteListSlice.actions

export const favoriteListReducer = favoriteListSlice.reducer;
