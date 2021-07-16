import React from 'react'
import { IProduct } from '../../models/types'
import './product.scss'

interface ProductProps {
  product: IProduct
}

const Product = ({}: ProductProps): JSX.Element => {
  return (
    <div className='product-main_container'>
      imma product
    </div>
  )
}

export default Product
