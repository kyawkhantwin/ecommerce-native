import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";

const productsAdapter = createEntityAdapter({
  selectId: (product) => product.id,
});

const initialState = productsAdapter.getInitialState({});

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      transformResponse: (responseData) => {
        const data = responseData || [];
        return productsAdapter.setAll(initialState, data);
      },
      providesTags: (result, error, arg) => {
        if (!result || !result.ids.length) {
          return [{ type: "Product", id: "LIST" }];
        }
        return [
          { type: "Product", id: "LIST" },
          ...result.ids.map((id) => ({ type: "Product", id })),
        ];
      },
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: product,
      }),
      transformResponse: (res, meta, arg) => {
        productsAdapter.addOne(initialState, res);
        return res;
      },
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: product,
      }),
      transformResponse: (res, meta, arg) => {
        productsAdapter.updateOne(initialState, { id: res.id, changes: res });
        return res;
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
    deleteProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: product,
      }),
      transformResponse: (res, meta, arg) => {
        productsAdapter.removeOne(initialState, res.id);
        return res;
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = extendedApiSlice;

const selectProductsResult = extendedApiSlice.endpoints.getProducts.select();
const selectProductsData = createSelector(
  selectProductsResult,
  (productsResult) => productsResult.data
);

export const { selectAll: selectAllProducts, selectById: selectProductById } =
  productsAdapter.getSelectors(
    (state) => selectProductsData(state) ?? initialState
  );
