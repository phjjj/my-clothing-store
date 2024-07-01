import styled from "styled-components"
import Button from "../common/Button"
import InputText from "../common/inputText"
import { useState } from "react"

function AddToCart() {
  const [quantity, setQuantity] = useState(0)

  const handleClickIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleClickDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <AddToCartStyle>
      <div className="quantity-container">
        <Button size="medium" schema="secondary" type="button" onClick={handleClickDecrease}>
          -
        </Button>
        <InputText inputType="number" disabled value={quantity} />
        <Button size="medium" schema="secondary" type="button" onClick={handleClickIncrease}>
          +
        </Button>
      </div>

      <Button schema="primary" size="large">
        <span>장바구니 담기</span>
      </Button>
    </AddToCartStyle>
  )
}
const AddToCartStyle = styled.div`
  display: flex;
  gap: 10px;
  .quantity-container {
    display: flex;
    gap: 10px;

    input {
      width: 50px;
      text-align: center;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`

export default AddToCart
