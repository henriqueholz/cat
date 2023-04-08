import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store"

const { createSlice } = require('@reduxjs/toolkit')

export enum SortEnum {
  Name = 1,
  Weight = 2,
  Lifespan = 3,
  Origin = 4,
}

interface SortType {
  data: SortEnum,
}

const initialState: SortType = { 
  data: SortEnum.Name,
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
  return sort
}

export default sortSlice.reducer

export const { updateSort } =
sortSlice.actions

export const sortReducer = sortSlice.reducer;
