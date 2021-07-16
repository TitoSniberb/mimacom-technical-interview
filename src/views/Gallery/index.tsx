import React, { useEffect, useState } from 'react'
import ProductList from '../../components/ProductList'
import { getProducts } from '../../lib/apis/productAPIcalls';
import { IProduct } from '../../models/types';
import './gallery.scss'

const Gallery = () => {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts()

        if (products) {
          console.log('products =>', products)
          setProducts(products)
        }
      } catch (err) {
        console.error(err.message || err)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className='gallery-main_container scrollbar'>
      <h1>Product list</h1>
      <ProductList products={products} />
    </div>
  )
}

export default Gallery
