import React from 'react'
import { IProduct } from '../../models/types';
import Product from '../Product';
import './productList.scss'

interface ProductProps {
  products: IProduct[]
}

const ProductList = ({ products }: ProductProps): JSX.Element => {
  return (
    <div className='product-list'>
      {products.map(product => <Product product={product} key={product.id} />)}
    </div>
  )
}

export default ProductList;
