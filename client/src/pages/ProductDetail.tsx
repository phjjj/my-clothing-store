import styled from "styled-components"
import { formatNumber } from "../utils/format"
import Button from "../components/common/Button"
import { useState } from "react"
import AddToCart from "../components/ProductDetail/AddToCart"
import { useParams } from "react-router-dom"
import { useProduct } from "../hooks/useProduct"

function ProductDetail() {
  const { id } = useParams()
  const { product } = useProduct(id)
  const [imgIndex, setImgIndex] = useState(0)

  if (!product) {
    return <div>상품이 존재하지 않습니다.</div>
  }

  return (
    <ProductDetailStyle>
      <div className="img-container">
        <div className="img">
          <img src={product.images[imgIndex]} alt={product.title} />
        </div>

        <div className="img-list">
          {product.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={product.title} onMouseOver={() => setImgIndex(index)} />
            </div>
          ))}
        </div>
      </div>

      <div className="info-container">
        <h2 className="title">{product.title}</h2>
        <p className="price">{formatNumber(product.price)}원</p>
        <p>SIZE - {product.size}</p>
        <p>{product.description}</p>
        <div className="button-container">
          <div>
            <AddToCart />
          </div>
          <Button schema="primary" size="large">
            구매하기
          </Button>
        </div>
      </div>
    </ProductDetailStyle>
  )
}
const ProductDetailStyle = styled.div`
  display: flex;
  max-width: 900px;
  margin: 0 auto;
  justify-content: start;
  gap: 20px;
  margin-top: 40px;

  .img-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .img {
      width: 500px;
      height: 800px;
      img {
        border-radius: 5px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .img-list {
      display: flex;
      gap: 4px;
      img {
        border-radius: 5px;
        width: 100px;
        height: 100px;
        margin-right: 10px;
      }
    }
  }

  .info-container {
    display: flex;
    flex-direction: column;

    h2 {
      margin: 0;
    }
  }

  .price {
    font-size: 20px;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }
  // 버튼컨테이너 가장 아래로

  .button-container {
    display: flex;
    flex-direction: column;
    gap: 10px;

    margin-top: auto;
  }
`

export default ProductDetail
