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

function getBreeds({ limit = 10, page = 0 }) {
  const params = { limit, page };

  return `${breedsEndpointUrl}?${parseQueryParams(params)}`;
}

function getBreed({ id }: { id: string }) {
  return `${breedsEndpointUrl}/${id}`;
}

interface CreateFavoritePayload {
  image_id: string, 
  sub_id: string
}

function createFavouriteMutation(body: CreateFavoritePayload) {
  return { 
    url: `${favoritesEndpointUrl}?api_key=${apiKey}`, 
    method: "POST", 
    body
  }
}

function deleteFavouriteMutation(breed: Breed) {
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
    getBreeds: query<Breed[], BreedParams>({
      query: getBreeds,
      providesTags: ["Breeds"],
    }),
    getBreed: query<Breed, { id: string }>({
      query: getBreed,
      providesTags: ["Breeds"],
    }),
    createFavorite: mutation<CreateFavoriteResponse, CreateFavoritePayload>({
      query: createFavouriteMutation,
      invalidatesTags: ["Breeds"],
    }),
    getFavorites: query<Breed[], BreedParams>({
      query: getBreeds,
      providesTags: ["Breeds"],
    }),
    deleteCategory: mutation<DeleteFavoriteResponse, { id: string }>({
      query: deleteFavouriteMutation,
      invalidatesTags: ["Breeds"],
    }),
  }),
});

export const {
  useGetBreedsQuery,  
  useGetBreedQuery,
  useCreateFavoriteMutation,
  useGetFavoritesQuery,
  useDeleteCategoryMutation
} = breedsApiSlice;
