import { RootState } from "../../app/store"

const { createSlice } = require('@reduxjs/toolkit')

export interface Breed {
  favorite?:          boolean;
  weight:             Weight;
  id:                 string;
  name:               string;
  cfa_url?:           string;
  vetstreet_url?:     string;
  vcahospitals_url?:  string;
  temperament:        string;
  origin:             string;
  country_codes:      string;
  country_code:       string;
  description:        string;
  life_span:          string;
  indoor:             number;
  lap?:               number;
  alt_names:          string;
  adaptability:       number;
  affection_level:    number;
  child_friendly:     number;
  dog_friendly:       number;
  energy_level:       number;
  grooming:           number;
  health_issues:      number;
  intelligence:       number;
  shedding_level:     number;
  social_needs:       number;
  stranger_friendly:  number;
  vocalisation:       number;
  experimental:       number;
  hairless:           number;
  natural:            number;
  rare:               number;
  rex:                number;
  suppressed_tail:    number;
  short_legs:         number;
  wikipedia_url:      string;
  hypoallergenic:     number;
  reference_image_id: string;
}

export interface Weight {
  imperial: string;
  metric:   string;
}


export const breed: Breed = {
  weight: {
    imperial: "7  -  10",
    metric: "3 - 5"
  },
  id: "babys",
  name: "Babyssinian",
  cfa_url: "http://cfa.org/Breeds/BreedsAB/Abyssinian.aspx",
  vetstreet_url: "http://www.vetstreet.com/cats/abyssinian",
  vcahospitals_url: "https://vcahospitals.com/know-your-pet/cat-breeds/abyssinian",
  temperament: "Active, Energetic, Independent, Intelligent, Gentle",
  origin: "Egypt",
  country_codes: "EG",
  country_code: "EG",
  description: "The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.",
  life_span: "14 - 15",
  indoor: 0,
  lap: 1,
  alt_names: "",
  adaptability: 5,
  affection_level: 5,
  child_friendly: 3,
  dog_friendly: 4,
  energy_level: 5,
  grooming: 1,
  health_issues: 2,
  intelligence: 5,
  shedding_level: 2,
  social_needs: 5,
  stranger_friendly: 5,
  vocalisation: 1,
  experimental: 0,
  hairless: 0,
  natural: 1,
  rare: 0,
  rex: 0,
  suppressed_tail: 0,
  short_legs: 0,
  wikipedia_url: "https://en.wikipedia.org/wiki/Abyssinian_(cat)",
  hypoallergenic: 0,
  reference_image_id: "0XYvRd7oD"
}

export const initialState: Breed[] = 
  [
    breed,
    { ...breed, name: "Beta", id: "aege", origin: "Jamaica", life_span: "1 - 2"}
  ];

const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    favoriteBreed(state, action) {
      const index = state.findIndex(breed => breed.id === action.payload)
      state[index].favorite = !state[index].favorite
    }
  }
})

// Selectors
export const selectBreeds = (state: RootState) => state.breeds

export const selectBreedById = (state: RootState, id: string) => {
  const breeds = state.breeds as Breed[]
  return breeds.find(data => data.id === id)
}
export default breedsSlice.reducer

export const { favoriteBreed } =
  breedsSlice.actions
