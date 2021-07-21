import React, { useEffect, useState } from 'react'
import { ICartProduct } from '../../lib/models/types'
import './cart.scss'
import CartProduct from './CartProduct'

interface CartProps {
  cart: ICartProduct
  addToCart: (productId: string) => void
  removeFromCart: (productId: string) => void
  isMobile?: boolean
}

const Cart = ({ addToCart, removeFromCart, cart, isMobile }: CartProps) => {
  const [totalItems, setTotalItems] = useState(0);
  const [toPay, setToPay] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    let totalItems = 0
    let toPay = 0

    Object.values(cart).forEach(item => {
      totalItems += item.total
      toPay += item.product.price * item.total
    })
    setTotalItems(totalItems)
    setToPay(toPay)

    if (Object.values(cart).length) {
      setTimeout(() => {
        setShowWarning(true)
      }, 10000);
    }
  }, [cart])

  return (
    <div className='cart-main_container'>
      {!isMobile && <h1>Cart</h1>}

      {showWarning && <span className='cart-warning'>Please take into account that the items on your cart are not reserved!</span>}

      <div className='cart-list scrollbar'>
        {Object.values(cart).map((item) => <CartProduct cartProduct={item} addToCart={addToCart} removeFromCart={removeFromCart} key={item.product.id} />)}
      </div>

      <div className='cart-checkout'>
        <div>
          <span>
            Items in cart: {totalItems}
          </span>
          <span>
            Total: {toPay}$
          </span>
        </div>

        <button>Checkout</button>
      </div>
    </div>
  )
}

export default Cart
