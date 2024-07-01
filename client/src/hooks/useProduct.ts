import { InfiniteData, useQuery, useQueryClient } from "react-query"
import { FetchProductResponse, fetchProduct } from "../api/products.api"
import { useLocation } from "react-router-dom"

interface CacheData {
  pages: InfiniteData<FetchProductResponse>["pages"]
}

export const useProduct = (id: string | undefined) => {
  const location = useLocation()
  const queryClient = useQueryClient()

  const { data: product } = useQuery(["product", id], () => fetchProduct(Number(id)), {
    initialData: () => {
      const queryData = queryClient.getQueryData<CacheData>([
        "products",
        location.pathname.split("/")[2] === "all" ? "all" : location.pathname.split("/")[2], // 카테고리별로 분기처리
      ])
      const product = queryData?.pages
        .flatMap((page) => page.products)
        .find((product) => product.id === Number(id))
      return product
    },
    staleTime: 1000 * 60 * 5,
  })

  const handleAddToCart = () => {
    // react-query의 mutate를 사용하여 장바구니에 제품 추가
    // mutate는 데이터를 업데이트할 때 사용한다.
  }

  return { product }
}
