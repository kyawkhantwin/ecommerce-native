import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

const transactionsAdapter = createEntityAdapter({});

const initialState = transactionsAdapter.getInitialState({});

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => "/transactions",
      transformResponse: (responseData) => {
        const data = responseData || [];
        return transactionsAdapter.setAll(initialState, data);
      },
      providesTags: (result, error, arg) => {
        if (!result || !result.ids.length) {
          return [{ type: "Transaction", id: "LIST" }];
        }
        return [
          { type: "Transaction", id: "LIST" },
          ...result.ids.map((id) => ({ type: "Transaction", id })),
        ];
      },
    }),
    getTransaction: builder.query({
      query: (transactionId) => `/transactions/${transactionId}`,
      transformResponse: (responseData) => {
        const data = [responseData] || [];
        console.log(responseData);
        return transactionsAdapter.setAll(initialState, data);
      },
      providesTags: (result, error, arg) => {
        if (!result || !result.ids.length) {
          return [{ type: "Transaction", id: "LIST" }];
        }
        return [
          { type: "Transaction", id: "LIST" },
          ...result.ids.map((id) => ({ type: "Transaction", id })),
        ];
      },
    }),
    createTransaction: builder.mutation({
      query: (newTransaction) => ({
        url: "/transactions",
        method: "POST",
        body: newTransaction,
      }),
      invalidatesTags: [
        { type: "Transaction", id: "LIST" },
        { type: "Order", id: "LIST" },
      ],
    }),
    deleteTransaction: builder.mutation({
      query: (transactionId) => ({
        url: `/transactions/${transactionId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, transactionId) => [
        { type: "Transaction", id: transactionId },
      ],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useGetTransactionQuery,
} = extendedApiSlice;

const selectTransactionsResult =
  extendedApiSlice.endpoints.getTransactions.select();

const selectTransactionsData = createSelector(
  selectTransactionsResult,
  (transactionsResult) => transactionsResult.data
);

export const {
  selectAll: selectAllTransactions,
  selectById: selectTransactionById,
  selectIds: selectTransactionIds,
} = transactionsAdapter.getSelectors(
  (state) => selectTransactionsData(state) ?? initialState
);
