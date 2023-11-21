import {
  ProductProps,
  Product,
  CloudinaryImage,
} from "@/types"
import { apiSlice } from "./api"

const productsSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addProduct: builder.mutation<Product, ProductProps>({
      query: arg => ({
        url: "/products/addOne",
        method: "POST",
        credentials: "include",
        body: JSON.stringify(arg),
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    updateProduct: builder.mutation<
      Product,
      { product: ProductProps; id: string }
    >({
      query: arg => ({
        url: `/products/${arg.id}`,
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(arg.product),
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    uploadImage: builder.mutation<
      CloudinaryImage,
      FormData
    >({
      query: arg => ({
        url: `/products/uploadImage`,
        method: "POST",
        credentials: "include",
        body: arg,
      }),
    }),
    GetProductByID: builder.query<any, { id: string }>({
      query: arg => ({
        url: `/products/${arg.id}`,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
  }),
})

export const {
  useAddProductMutation,
  useUpdateProductMutation,
  useUploadImageMutation,
} = productsSlice
