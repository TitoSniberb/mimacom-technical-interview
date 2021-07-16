import React from 'react'
import { IProduct } from '../../models/types'

interface ProductProps {
  product: IProduct
}

const Product = ({}: ProductProps): JSX.Element => {
  return (
    <div>
      imma product
    </div>
  )
}

export default Product
