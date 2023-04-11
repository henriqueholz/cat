import { Breed, BreedParams } from "../../types/Breeds";
import { apiSlice } from "../api/apiSlice";

const breedsEndpointUrl = "/breeds";
const apiKey = process.env.REACT_APP_CAT_API_KEY as string

function parseQueryParams(params: BreedParams) {
  const query = new URLSearchParams();

  if (params.limit) {
    query.append("limit", params.limit.toString());
  }

  if (params.page) {
    query.append("page", params.page.toString());
  }
  
  if (apiKey) {
    query.append("api_key", apiKey);
  }

  return query.toString();
}

function getCats({ limit, page }) {
  const params = { limit, page };

  return `${breedsEndpointUrl}?${parseQueryParams(params)}`;
}

export const breedsApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    getCats: query<Breed[], BreedParams>({
      query: getCats,
      providesTags: ["Cats"],
    }),
  }),
});

export const {
  useGetCatsQuery,  
} = breedsApiSlice;
