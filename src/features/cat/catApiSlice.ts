import { Breed, BreedParams } from "../../types/Breeds";
import { apiSlice } from "../api/apiSlice";

const breedsEndpointUrl = "/breeds";
const favoritesEndpointUrl = "/favourites";
const apiKey = process.env.REACT_APP_CAT_API_KEY as string

function parseQueryParams(params: BreedParams) {
  const query = new URLSearchParams();

  if (params.limit) {
    query.append("limit", params.limit.toString());
  }

  if (params.page) {
    query.append("page", params.page.toString());
  }
  
  query.append("api_key", apiKey);

  return query.toString();
}

function getCats({ limit = 10, page = 0 }) {
  const params = { limit, page };

  return `${breedsEndpointUrl}?${parseQueryParams(params)}`;
}

function getCat({ id }: { id: string }) {
  return `${breedsEndpointUrl}/${id}`;
}

interface CreateFavoritePayload {
  image_id: string, 
  sub_id: string
}

function createFavoriteMutation(body: CreateFavoritePayload) {
  return { 
    url: `${favoritesEndpointUrl}?api_key=${apiKey}`, 
    method: "POST", 
    body
  }
}

function deleteFavoriteMutation(breed: Breed) {
  return {
    url: `${favoritesEndpointUrl}/${breed.id}&api_key=${apiKey}`,
    method: "DELETE",
  }
}

interface CreateFavoriteResponse {
  "message": string,
  "id": number
}

interface DeleteFavoriteResponse {
  "message": string,
}

export const breedsApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCats: query<Breed[], BreedParams>({
      query: getCats,
      providesTags: ["Cats"],
    }),
    getCat: query<Breed, { id: string }>({
      query: getCat,
      providesTags: ["Cats"],
    }),
    createFavorite: mutation<CreateFavoriteResponse, CreateFavoritePayload>({
      query: createFavoriteMutation,
      invalidatesTags: ["Cats"],
    }),
    getFavorites: query<Breed[], BreedParams>({
      query: getCats,
      providesTags: ["Cats"],
    }),
  }),
});

export const {
  useGetCatsQuery,  
  useGetCatQuery,
  useCreateFavoriteMutation,
  useGetFavoritesQuery,
} = breedsApiSlice;
