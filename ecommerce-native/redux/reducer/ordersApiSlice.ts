import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

const orderAdapter = createEntityAdapter({});

const initialState = orderAdapter.getInitialState({});

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (status) => `/orders?status=${status}`,
      transformResponse: (responseData) => {
        return orderAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (!result || !result.ids.length) {
          return [{ type: "Order", id: "LIST" }];
        }
        return [
          { type: "Order", id: "LIST" },
          ...result.ids.map((id) => ({ type: "Order", id })),
        ];
      },
    }),
    getUserOrders: builder.query({
      query: (data) => `orders/user/${data.userId}?status=${data.status}`,
      transformResponse: (responseData) => {
        return orderAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (!result || !result.ids.length) {
          return [{ type: "Order", id: "LIST" }];
        }
        return [
          { type: "Order", id: "LIST" },
          ...result.ids.map((id) => ({ type: "Order", id })),
        ];
      },
    }),
    getLatestOrder: builder.query({
      query: (data) => `/orders/user/${data.userId}?latest=${data.latest}`,
      transformResponse: (responseData) => {
        return orderAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (!result || !result.ids.length) {
          return [{ type: "Order", id: "LIST" }];
        }
        return [
          { type: "Order", id: "LIST" },
          ...result.ids.map((id) => ({ type: "Order", id })),
        ];
      },
    }),
    getOrder: builder.query({
      query: (orderId) => `/orders/${orderId}`,
      transformResponse: (responseData) => {
        return orderAdapter.setAll(initialState, [responseData]);
      },
      providesTags: (result, error, arg) => {
        if (!result || !result.ids.length) {
          return [{ type: "Order", id: "LIST" }];
        }
        return [
          { type: "Order", id: "LIST" },
          ...result.ids.map((id) => ({ type: "Order", id })),
        ];
      },
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: order,
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
    deleteOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: order,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Order", id: arg }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderQuery,
  useGetUserOrdersQuery,
  useGetLatestOrderQuery,
} = ordersApiSlice;

const selectOrderResult = ordersApiSlice.endpoints.getOrders.select();

const selectOrderData = createSelector(
  selectOrderResult,
  (orderResult) => orderResult.data
);

export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,
} = orderAdapter.getSelectors(
  (state) => selectOrderData(state) ?? initialState
);
