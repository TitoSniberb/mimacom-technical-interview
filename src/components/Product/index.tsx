import React from 'react'
import { IProduct } from '../../models/types'
import './product.scss'

interface ProductProps {
  product: IProduct
}

const Product = ({ product: { price, image_url, productDescription, productName, stock } }: ProductProps): JSX.Element => {
  return (
    <div className='product-main_container'>
      <div className='product-image_container'>
        <img className='product-image' src={image_url} alt="" />
      </div>

      <div className='product-body_container'>
        <div className='product-name_container'>
          <span className='product-name'>{productName}</span>
          <span className='product-info'>{price}</span>
        </div>

        <span className='product-description'>{productDescription}</span>

        <div className='product-footer_container'>
          <span className='product-info'>{stock}</span>
          <button className='product-button'>Add</button>
        </div>
      </div>
    </div>
  )
}

export default Product
