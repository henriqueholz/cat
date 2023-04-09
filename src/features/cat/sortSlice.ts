import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store"

const { createSlice } = require('@reduxjs/toolkit')

export interface SortType {
  data: string,
}

export const initialState: SortType = { 
  data: "name",
};

const sortSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateSort(state, action: PayloadAction<SortType>) {
      state.data = action.payload
    }
  }
})

// Selectors
export const selectSort = (state: RootState) => {
  const sort = state.sortSlice as SortType
  console.log(sort)
  return sort
}

export default sortSlice.reducer

export const { updateSort } =
sortSlice.actions

export const sortReducer = sortSlice.reducer;
