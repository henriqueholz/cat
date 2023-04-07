import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store"
import { Breed } from "../../types/Breeds";

const { createSlice } = require('@reduxjs/toolkit')

interface FilterAttributes {
  name: string,
  origin: string,
  weight: number | "",
  lifespan: number | "",
  isFavorite: boolean,
}

interface FilterType {
  data: FilterAttributes,
}

const initialState: FilterType = { 
  data : {
    name: "",
    origin: "",
    weight: "",
    lifespan: "",
    isFavorite: false,
  }
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter(state, action: PayloadAction<FilterAttributes>) {
      state.data = action.payload
    }
  }
})

export default filterSlice.reducer

export const { addFilter } =
filterSlice.actions

export const filterReducer = filterSlice.reducer;
