import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

const reviewAdapter = createEntityAdapter({
  selectId: (review) => {
    return review.id;
  },
});
const initialState = reviewAdapter.getInitialState({});

const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReview: builder.query({
      query: (productId) => "/review/product/" + productId,
      transformResponse: (responseData) => {
        const data = responseData || [];
        return reviewAdapter.setAll(initialState, data);
      },
      providesTags: (result, error, arg) => {
        if (!result || !result.ids.length) {
          return [{ type: "Review", id: "List" }];
        }
        return [
          { type: "Review", id: "List" },
          ...result.ids.map((id) => ({ type: "Review", id })),
        ];
      },
    }),
    createReview: builder.mutation({
      query: (review) => ({
        url: "/review/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: review,
      }),
      transformResponse: (responseData) => {
        const data = responseData || [];
        return reviewAdapter.addOne(initialState, data);
      },
      invalidatesTags: [{ type: "Review", id: "List" }],
    }),
    updateReview: builder.mutation({
      query: (review) => ({
        url: "/review/" + review.id,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: review,
      }),
      transformResponse: (responseData) => {
        return reviewAdapter.updateOne(initialState, {
          id: responseData.id,
          changes: responseData,
        });
      },
      invalidatesTags: (result, error, arg) => [{ type: "Review", id: arg.id }],
    }),
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: "/review/" + reviewId,
        method: "DELETE",
      }),
      transformResponse: (responseData) => {
        return reviewAdapter.removeOne(initialState, responseData.id);
      },
      invalidatesTags: (result, error, arg) => [{ type: "Review", id: arg.id }],
    }),
  }),
});

export const {
  useGetReviewQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApiSlice;

const selectReviewResult = reviewApiSlice.endpoints.getReview.select();

const selectReviewData = createSelector(
  selectReviewResult,
  (reviewResult) => reviewResult.data || initialState
);

export const {
  selectAll: selectAllReview,
  selectById: selectReviewById,
  selectIds: selectReviewIds,
} = reviewAdapter.getSelectors((state) => selectReviewData(state));
