import { Breed } from "../../types/Breeds";
import { apiSlice } from "../api/apiSlice";

const breedsEndpointUrl = "/breeds";
const apiKey = process.env.REACT_APP_CAT_API_KEY as string

function getCats() {
  const query = new URLSearchParams();
  if (apiKey) {
    query.append("api_key", apiKey);
  }

  return `${breedsEndpointUrl}?${query}`;
}

export const breedsApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    getCats: query<Breed[], void>({
      query: getCats,
      providesTags: ["Cats"],
    }),
  }),
});

export const {
  useGetCatsQuery,  
} = breedsApiSlice;
