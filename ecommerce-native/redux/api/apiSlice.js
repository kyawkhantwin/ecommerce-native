import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: [
    "Product",
    "Category",
    "Cart",
    "User",
    "Order",
    "Transaction",
    "Auth",
    "Search",
    "Review"
  ],
  endpoints: (builder) => ({}),
  refetchOnMountOrArgChange: true,
});
export default apiSlice;
