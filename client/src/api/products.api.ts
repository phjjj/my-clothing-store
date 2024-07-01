import { Pagination } from "../models/pagination.model"
import { Product } from "../models/product.model"
import { httpclient } from "./https"

interface FetchBooksParams {
  category_id?: number
  currentPage?: number
  limit: number
}

export interface FetchProductResponse {
  products: Product[]
  pagination: Pagination
}

export const fetchProducts = async (params: FetchBooksParams) => {
  try {
    const response = await httpclient.get<FetchProductResponse>("/products", { params })
    return response.data
  } catch (error) {
    return {
      products: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
      },
    }
  }
}

export const fetchProduct = async (id: number) => {
  try {
    const response = await httpclient.get<Product>(`/products/${id}`)
    return response.data
  } catch (error) {
    return
  }
}
