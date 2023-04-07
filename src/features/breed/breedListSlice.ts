import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store"
import { Breed } from "../../types/Breeds";
import { StarRateSharp } from "@mui/icons-material";

const { createSlice } = require('@reduxjs/toolkit')

interface BreedList {
  data: Breed[]
}

const initialState: BreedList = { data : []};

const breedListSlice = createSlice({
  name: 'BreedList',
  initialState,
  reducers: {
    uploadBreedList(state, action: PayloadAction<Breed>) {
      state.data = action.payload
    }
  }
})

// Selectors
export const selectBreedList = (state: RootState) => {
  const breedList = state.breedListSlice as BreedList
  return breedList.data
}

export default breedListSlice.reducer

export const { uploadBreedList } =
breedListSlice.actions

export const breedListReducer = breedListSlice.reducer;
