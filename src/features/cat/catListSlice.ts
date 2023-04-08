import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store"
import { Breed } from "../../types/Breeds";

const { createSlice } = require('@reduxjs/toolkit')

interface CatList {
  fullList: Breed[],
  favoriteList: Breed[]
}

const initialState: CatList = { fullList : [], favoriteList: [] };

const catListSlice = createSlice({
  name: 'CatList',
  initialState,
  reducers: {
    uploadCatList(state, action: PayloadAction<Breed[]>) {
      state.fullList = action.payload
    },
    updateFavoriteList(state, action: PayloadAction<Breed>) {
      const fullListIndex = state.fullList.findIndex(cat => cat.id === action.payload.id)
      if (fullListIndex !== -1) {
        state.fullList[fullListIndex] = {...action.payload, favorite: !action.payload.favorite}
      } 
      const favoriteIndex = state.favoriteList.findIndex(favorite => favorite.id === action.payload.id)
      if (favoriteIndex === -1) {
        state.favoriteList.push({ ...action.payload })
      } else {
        state.favoriteList.splice(favoriteIndex, 1);
      }
    },
  }
})

// Selectors
export const selectCatList = (state: RootState) => {
  const catList = state.catListSlice as CatList
  return catList.fullList
}

export const selectFavorites = (state: RootState) => {
  const favoriteList = state.catListSlice as CatList
  return favoriteList.favoriteList
}

export default catListSlice.reducer

export const { uploadCatList, updateFavoriteList } =
catListSlice.actions

export const catListReducer = catListSlice.reducer;
