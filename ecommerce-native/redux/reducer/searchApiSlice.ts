// searchSlice.js
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

// Adapter setup
const searchAdapter = createEntityAdapter({
  selectId: (search) => search.id,
});

const initialState = searchAdapter.getInitialState({});

// Inject endpoints into the API slice
const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSearchedProduct: builder.query({
      query: (name) => `/search/products/${name}`,
      transformResponse: (responseData) => {
        const data = responseData || [];
        return searchAdapter.setAll(initialState, data);
      },
      providesTags: (result, error, arg) => {
        if (!result || !result.ids.length) {
          return [{ type: "Search", id: "LIST" }];
        }
        return [
          { type: "Search", id: "LIST" },
          ...result.ids.map((id) => ({ type: "Search", id })),
        ];
      },
    }),
    getSearchedCategoryProduct: builder.query({
      query: (categoryId) => `/search/category/${categoryId}`,
      transformResponse: (responseData) => {
        const data = responseData || [];
        return searchAdapter.setAll(initialState, data);
      },
      providesTags: (result, error, arg) => {
        if (!result || !result.ids.length) {
          return [{ type: "Search", id: "LIST" }];
        }
        return [
          { type: "Search", id: "LIST" },
          ...result.ids.map((id) => ({ type: "Search", id })),
        ];
      },
    }),
  }),
});

export const {
  useGetSearchedProductQuery,
  useGetSearchedCategoryProductQuery,
} = extendedApiSlice;

export const selectSearchedProductsResult =
  extendedApiSlice.endpoints.getSearchedProduct.select();

export const selectSearchedProductsData = createSelector(
  selectSearchedProductsResult,
  (searchedProductsResult) => searchedProductsResult.data
);

export const {
  selectAll: selectAllSearchedProducts,
  selectById: selectSearchedProducts,
} = searchAdapter.getSelectors(
  (state) => selectSearchedProductsData(state) ?? initialState
);
