import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store"

const { createSlice } = require('@reduxjs/toolkit')

enum SortBy {
  Name = 1,
  Weight = 2,
  Lifespan = 3,
  Origin = 4,
}

interface SortingType {
  data: SortBy,
}

const initialState: SortingType = { 
  data: SortBy.Name,
};

const sortingSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addSorting(state, action: PayloadAction<SortingType>) {
      state.data = action.payload
    }
  }
})

export default sortingSlice.reducer

export const { addSorting } =
sortingSlice.actions

export const sortingReducer = sortingSlice.reducer;
