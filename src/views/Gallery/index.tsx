import React, { useEffect, useState } from 'react'
import LoadingTruck from '../../components/LoadingTruck';
import ProductList from '../../components/ProductList'
import { getProducts } from '../../lib/apis/productAPIcalls';
import { IProduct } from '../../lib/models/types';
import './gallery.scss'

const Gallery = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts()

        if (products) {
          console.log('products =>', products)
          setProducts(products)
        }
      } catch (err) {
        setError(err.message || err);
        console.error(err.message || err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className='gallery-main_container scrollbar'>
      <h1>Product list</h1>
      <ProductList products={products} />
      
      {
        isLoading && (
          <div className='gallery-truck_Container'>
            <LoadingTruck />
            <span>We are fetching your groceries!</span>
          </div>
        )
      }
      {
        error && (
          <div className='gallery-error_container'>
            <span>You likely forgot to start the json server on local.</span>
            <p>Please open the <code>server-api</code> folder and from the Windows command line or Mac terminal (we Linux haters sorry) do <code>yarn start</code>.</p>
            <p>Please be sure to add <code>--port 3001</code>!</p>
          </div>
        )
      }
    </div>
  )
}

export default Gallery
