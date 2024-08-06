import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

const usersAdapter = createEntityAdapter({
  selectId: (user) => user.id, // Adjust to user.id if applicable
});

const initialState = usersAdapter.getInitialState({}); // Initialize with usersAdapter

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (responseData) => {
        const data = responseData || [];
        return usersAdapter.setAll(initialState, data);
      },
      providesTags: (result, error, arg) => {
        if (!result || !result.ids.length) {
          return [{ type: "User", id: "LIST" }];
        }
        return [
          { type: "User", id: "LIST" },
          ...result.ids.map((id) => ({ type: "User", id })),
        ];
      },
    }),
    getUser: builder.query({
      query: (userId) => "/users"+ userId,
      transformResponse: (responseData) => {
        const data = responseData || [];
        return usersAdapter.setAll(initialState, data);
      },
      providesTags: (result, error, arg) => {
        if (!result || !result.ids.length) {
          return [{ type: "User", id: "LIST" }];
        }
        return [
          { type: "User", id: "LIST" },
          ...result.ids.map((id) => ({ type: "User", id })),
        ];
      },
    }),
  
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: user,
      }),
      transformResponse: (res, meta, arg) => {
        usersAdapter.updateOne(initialState, { id: res.id, changes: res });
        return res;
      },
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: user,
      }),
      transformResponse: (res, meta, arg) => {
        usersAdapter.removeOne(initialState, res.id);
        return res;
      },
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;

const selectUsersResult = userApiSlice.endpoints.getUsers.select();
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
