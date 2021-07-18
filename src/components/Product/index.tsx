import React, { useState } from 'react'
import { saveToFavorites } from '../../lib/apis/productAPIcalls'
import { IProduct } from '../../lib/models/types'
import { getIcons } from '../../lib/services/getIcons'
import './product.scss'

interface ProductProps {
  product: IProduct
  addToCart: (productId: string) => void
}

const Product = ({ product: { price, image_url, productDescription, productName, stock, id, favorite }, addToCart }: ProductProps): JSX.Element => {
  const [isFavorite, setIsFavorite] = useState(favorite === '1' ? true : false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFavoriteClick = async (groceryId: string) => {
    if (!isLoading) {
      setIsLoading(true)
      try {
        await saveToFavorites(groceryId, isFavorite)
        setIsFavorite(!isFavorite)

      } catch (err) {
        console.error(err.message || err)

      } finally {
        setIsLoading(false)
      }
    }
  }

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

          <div className='product-button_container'>
            <button className='product-button' onClick={() => addToCart(id)}>Add</button>
            <img onClick={() => handleFavoriteClick(id)} src={!isFavorite ? getIcons('HeartBlue') : getIcons('HeartFilledBlue')} alt="heart" width='20' height='20' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
