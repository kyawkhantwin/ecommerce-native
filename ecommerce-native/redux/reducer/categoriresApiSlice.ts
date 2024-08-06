import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice"; // Import the existing apiSlice

// Initialize the adapter
const categoriesAdapter = createEntityAdapter({
  selectId: (category) => category.id,
});

// Initial state using the adapter
const initialState = categoriesAdapter.getInitialState();

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Read
    getCategories: builder.query({
      query: () => "/categories",
      transformResponse: (responseData) => {
        const data = responseData || [];
        return categoriesAdapter.setAll(initialState, data);
      },
      providesTags: (result, error, arg) => {
        if (!result || !result.ids.length) {
          return [{ type: "Category", id: "LIST" }];
        }
        return [
          { type: "Category", id: "LIST" },
          ...result.ids.map((id) => ({ type: "Category", id })),
        ];
      },
    }),
    // Create
    createCategory: builder.mutation({
      query: (category) => ({
        url: "/categories",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: category,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    // Update
    updateCategory: builder.mutation({
      query: (category) => ({
        url: `/categories/${category.id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: category,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Category", id }],
    }),
    // Delete
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Category", id }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = extendedApiSlice;

// Selectors
const selectCategoriesResult =
  extendedApiSlice.endpoints.getCategories.select();

const selectCategoriesData = createSelector(
  selectCategoriesResult,
  (categoriesResult) => categoriesResult.data
);

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = categoriesAdapter.getSelectors(
  (state) => selectCategoriesData(state) ?? initialState
);

export default extendedApiSlice;
