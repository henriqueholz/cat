import { breedResponse } from "../mocks/breed"

const { createSlice } = require('@reduxjs/toolkit')

const initialState = breedResponse

const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {}
})

export default breedsSlice.reducer