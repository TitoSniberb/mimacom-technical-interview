import React from 'react'
import { IProduct } from '../../lib/models/types'
import './cartProduct.scss'

interface CartProductProps {
  cartProduct: {
    product: IProduct,
    total: number
  },
  addToCart: (productId: string) => void
  removeFromCart: (productId: string) => void
}

const CartProduct = ({ cartProduct, addToCart, removeFromCart }: CartProductProps) => {
  const { image_url, productName, price, id } = cartProduct.product
  const { total } = cartProduct

  return (
    <div className='cart_product-main_container'>
      <div className='cart-image_container'>
        <img className='cart-image' src={image_url} alt="" />
      </div>

      <div className='cart_product-body_container'>
        <span className='cart_product-name'>{productName}</span>

        <div className='cart_product-button_container'>
          <div>
            <button onClick={() => removeFromCart(id)}>-</button>
            {total}
            <button onClick={() => addToCart(id)}>+</button>
          </div>
        </div>

        <div className='cart_product-price'>${price}</div>
      </div>
    </div >
  )
}

export default CartProduct
