import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

const userAdapter = createEntityAdapter({});

const initialState = userAdapter.getInitialState({});

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (responseData) => {
        // Handle the case where responseData is null or undefined
        const data = responseData || [];
        return userAdapter.setAll(initialState, data);
      },
      providesTags: (result, error, arg) => {
        // Handle the case where result is undefined or empty
        if (!result || !result.ids.length) {
          return [{ type: "User", id: "LIST" }];
        }
        return [
          { type: "User", id: "LIST" },
          ...result.ids.map((id) => ({ type: "User", id })),
        ];
      },
    }),
  }),
});

export const { useGetUsersQuery } = extendedApiSlice;

const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (userResult) => userResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = userAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
