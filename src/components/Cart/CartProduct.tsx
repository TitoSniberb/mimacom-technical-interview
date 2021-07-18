import React from 'react'
import { IProduct } from '../../lib/models/types'
import './cartProduct.scss'

interface CartProductProps {
  product: IProduct,
  removeFromCart: (productId: string) => void
}

const CartProduct = ({ product: { image_url, productName, id, price }, removeFromCart }: CartProductProps) => {
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
            3
            <button>+</button>
          </div>
        </div>

        <div className='cart_product-price'>${price}</div>
      </div>
    </div >
  )
}

export default CartProduct
