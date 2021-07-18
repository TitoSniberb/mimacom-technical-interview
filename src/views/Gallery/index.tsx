import React from 'react'
import Product from '../../components/Product';
import { IProducts } from '../../lib/models/types';
import './gallery.scss'

interface GalleryProps {
  products: IProducts
  addToCart: (productId: string) => void
  
}

const Gallery = ({ products, addToCart }: GalleryProps) => {
  return (
    <div className='gallery-main_container scrollbar'>
      <h1>Product list</h1>

      <div className='product-list'>
        {Object.values(products).map(product => <Product product={product} addToCart={addToCart} key={product.id} />)}
      </div>
    </div>
  )
}

export default Gallery
