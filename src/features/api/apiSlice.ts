import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = "https://api.thecatapi.com/v1";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Breeds"],
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({ baseUrl }),
});
