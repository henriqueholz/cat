import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const { createSlice } = require('@reduxjs/toolkit')

export interface FilterAttributes {
  name: string,
  origin: string,
  weight: number | "",
  lifespan: number | "",
  isFavorite: boolean,
}

export interface FilterType {
  data: FilterAttributes,
}

export const initialState: FilterType = { 
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
    updateFilter(state, action: PayloadAction<FilterAttributes>) {
      state.data = action.payload
    }
  }
})

// Selectors
export const selectFilter = (state: RootState) => {
  const filter = state.filterSlice as FilterType
  return filter.data
}

export default filterSlice.reducer

export const { updateFilter } =
filterSlice.actions

export const filterReducer = filterSlice.reducer;
