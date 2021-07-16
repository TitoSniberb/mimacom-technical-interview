import React from 'react'
import { IProduct } from '../../models/types';
import Product from '../Product';

interface ProductProps {
  products: IProduct[]
}

const ProductList = ({ products }: ProductProps): JSX.Element => {
  return (
    <div>
      {products.map(product => <Product product={product} key={product.id} />)}
    </div>
  )
}

export default ProductList;
