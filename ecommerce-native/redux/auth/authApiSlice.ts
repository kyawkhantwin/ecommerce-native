import { createEntityAdapter } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

const authAdapter = createEntityAdapter({
  selectId: (entity) => {
    return entity.user.id;
  },
});
const initialState = authAdapter.getInitialState({});
const authApiExtended = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
      transformResponse: (responseData) => {
        return authAdapter.setAll(initialState, [responseData]);
      },
      providesTags: (result, error, arg) => {
        if (!result || !result.ids.length) {
          return [{ type: "Auth", id: "LIST" }];
        }
        return [
          { type: "Auth", id: "LIST" },
          ...result.ids.map((id) => ({ type: "User", id })),
        ];
      },
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: { ...credentials },
      }),
      transformResponse: (responseData) => {
        return authAdapter.setAll(initialState, [responseData]);
      },
      invalidatesTags: (res, error, args) => {
        return [{ type: "Auth", id: "LIST" }];
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApiExtended;
