import { fetchProducts } from "../api/products.api"
import { useInfiniteQuery } from "react-query"
import { useLocation } from "react-router-dom"
import { LIMIT } from "../constants/pagination"
import { QUERYSTRING } from "../constants/querystring"

export const useProducts = () => {
  const location = useLocation()

  // products 가져오기
  const getProducts = ({ pageParam }: { pageParam: number }) => {
    const params = new URLSearchParams(location.search)

    const category_id = params.get(QUERYSTRING.CATEGORY_ID)
      ? Number(params.get(QUERYSTRING.CATEGORY_ID))
      : undefined
    const limit = LIMIT
    const currentPage = pageParam

    return fetchProducts({ category_id, limit, currentPage })
  }

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    ["products", location.search.split("?")[1] ? location.search.split("?")[1] : "all"],
    // pageParam의 초기값은 1
    ({ pageParam = 1 }) => getProducts({ pageParam }),
    {
      // getNextPageParam은 마지막 페이지인지 확인하고, 마지막 페이지가 아니라면 다음 페이지로 이동
      getNextPageParam: (lastPage) => {
        const isLastPage =
          Math.ceil(lastPage.pagination.totalCount / LIMIT) === lastPage.pagination.currentPage

        return isLastPage ? null : lastPage.pagination.currentPage + 1
      },
      staleTime: 1000 * 60 * 5,
    }
  )
  const products = data ? data.pages.flatMap((page) => page.products) : []
  const pagination = data ? data.pages[data.pages.length - 1].pagination : {}
  const isEmpty = products.length === 0

  return {
    products,
    pagination,
    fetchNextPage,
    hasNextPage,
    isLoading,

    isEmpty,
  }
}
