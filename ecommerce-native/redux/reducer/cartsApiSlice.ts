import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

// Initialize the adapter
const cartsAdapter = createEntityAdapter({
  selectId: (cart) => cart.id,
});

// Initial state using the adapter
const initialState = cartsAdapter.getInitialState();

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Read (Get Carts)
    getUserCarts: builder.query({
      query: (userId) => `/carts/user/${userId}`,
      transformResponse: (responseData) => {
        // Assuming responseData is an array of cart objects
        return cartsAdapter.setAll(initialState, [responseData]);
      },
      providesTags: (result, error, arg) => {
        if (!result || !result.ids.length) {
          return [{ type: "Cart", id: "LIST" }];
        }
        return [
          { type: "Cart", id: "LIST" },
          ...result.ids.map((id) => ({ type: "Cart", id })),
        ];
      },
    }),
    createCart: builder.mutation({
      query: (newCart) => ({
        url: "/carts",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: newCart,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    updateCart: builder.mutation({
      query: (updatedCart) => ({
        url: `/carts/${updatedCart.id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: updatedCart,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Cart", id }],
    }),
    deleteProductFromCart: builder.mutation({
      query: ({ cartId, productId }) => ({
        url: `/carts/${cartId}/products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { cartId }) => [{ type: 'Cart', id: cartId }],
    }),

  }),
});

export const {
  useGetUserCartsQuery,
  useCreateCartMutation,
  useUpdateCartMutation,
  useDeleteProductFromCartMutation,
} = extendedApiSlice;

// Selectors
const selectUserCartsResult = extendedApiSlice.endpoints.getUserCarts.select();

const selectCartsData = createSelector(
  selectUserCartsResult,
  (UserCartsResult) => {
    return UserCartsResult.data
  }
);

export const selectUserCart = (state) => selectCartsData(state);

export default extendedApiSlice;
