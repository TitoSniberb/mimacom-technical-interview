import React, { useEffect, useState } from 'react'
import './App.scss'
import Cart from './components/Cart'
import LoadingTruck from './components/LoadingTruck';
import { getProducts } from './lib/apis/productAPIcalls';
import { IProduct, IProducts } from './lib/models/types';
import Gallery from './views/Gallery';

function App() {
  const [products, setProducts] = useState<IProducts>({});
  const [productsInCart, setProductsInCart] = useState<IProduct[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const pushToCart = (productId: string) => {

  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts()

        if (products) {
          console.log('products =>', products)
          const keyedProducts = products.reduce((acc, product) => ({ ...acc, [product.id]: product }), {})
          setProducts(keyedProducts)
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
    <div className='app-main_container'>
      {
        isLoading ?
          <div className='gallery-truck_Container'>
            <LoadingTruck />
            <span>We are fetching your groceries!</span>
          </div>
          :
          <div className='app-products_container'>
            <Gallery products={products} />
            <Cart />
          </div>
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
  );
}

export default App
