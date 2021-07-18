import React from 'react'
import { IProducts } from '../../lib/models/types'
import './cart.scss'
import CartProduct from './CartProduct'

interface CartProps {
  cart: IProducts
  removeFromCart: (productId: string) => void
}

const Cart = ({ removeFromCart, cart }: CartProps) => {
  return (
    <div className='cart-main_container scrollbar'>
      <h1>Cart</h1>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {Object.values(cart).map(product => <CartProduct product={product} removeFromCart={removeFromCart} key={product.id} />)}
      </div>
    </div>
  )
}

export default Cart
