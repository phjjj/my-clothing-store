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

  // fetchNextPage: 다음 페이지를 가져오는 함수
  // hasNextPage: 다음 페이지가 있는지 확인하는 boolean
  // isFetching: 데이터를 가져오는 중인지 확인하는 boolean

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ["products", location.search],
    // pageParam의 초기값은 1
    ({ pageParam = 1 }) => getProducts({ pageParam }),
    {
      // getNextPageParam은 마지막 페이지인지 확인하고, 마지막 페이지가 아니라면 다음 페이지로 이동
      getNextPageParam: (lastPage) => {
        const isLastPage =
          Math.ceil(lastPage.pagination.totalCount / LIMIT) === lastPage.pagination.currentPage

        return isLastPage ? null : lastPage.pagination.currentPage + 1
      },
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
    isFetching,
    isEmpty,
  }
}
