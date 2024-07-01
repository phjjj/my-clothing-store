import styled from "styled-components"
import ProductsList from "../components/products/ProductsList"
import ProductsFilter from "../components/products/ProductsFilter"
import { useProducts } from "../hooks/useProducts"
import Button from "../components/common/Button"
import Loading from "../components/products/Loading"

function Home() {
  const { products, fetchNextPage, hasNextPage, isEmpty, isLoading } = useProducts()

  if (isLoading) {
    return (
      <HomeStyle>
        <ProductsFilter />
        <Loading />
      </HomeStyle>
    )
  }

  if (isEmpty) {
    return (
      <HomeStyle>
        <ProductsFilter />
        <div className="empty">
          <h1>No Products</h1>
        </div>
      </HomeStyle>
    )
  }

  return (
    <HomeStyle>
      <ProductsFilter />
      <h1>NEW ARRIVALS</h1>
      <ProductsList products={products} />
      <div className="more">
        <Button
          size="large"
          schema="secondary"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
        >
          {hasNextPage ? "More" : "No More Products"}
        </Button>
      </div>
    </HomeStyle>
  )
}

const HomeStyle = styled.div`
  h1 {
    color: ${(props) => props.theme.colors.primary};
    text-align: center;
    font-size: 2rem;
    margin-top: 2rem;
  }
  max-width: 1200px;
  margin: 0 auto;

  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
  }
  .more {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    button {
      &:hover {
        cursor: pointer;
        transform: scale(1.05);
      }
      &:disabled {
        pointer-events: none;
        background-color: #bdc3c7;
      }
    }
  }
`

export default Home
