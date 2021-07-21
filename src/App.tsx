import React, { useEffect, useState } from 'react'
import './App.scss'
import Cart from './components/Cart'
import LoadingTruck from './components/LoadingTruck';
import { getProducts } from './lib/apis/productAPIcalls';
import { ICartProduct, IProduct, IProducts } from './lib/models/types';
import { getIcons } from './lib/services/getIcons';
import Gallery from './views/Gallery';

const objectFilter = (obj: Record<any, any>, fn: any): Record<any, any> => Object.fromEntries(Object.entries(obj).filter(fn))
const objectMap = (obj: Record<any, any>, fn: any): Record<any, any> => Object.fromEntries(Object.entries(obj).map(([key, value], i) => [key, fn(value, key, i)]))

function App() {
  const [windowDimension, setWindowDimension] = useState(0)
  const [showCart, setShowCart] = useState(false);

  const [products, setProducts] = useState<IProducts>({})
  const [productsInCart, setProductsInCart] = useState<ICartProduct>({})

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const isMobile = windowDimension <= 800;

  const addToCart = (productId: string) => {
    if (productsInCart[productId]) {
      if (productsInCart[productId].total < products[productId].stock) {
        const updatedItem = {
          ...productsInCart[productId],
          total: productsInCart[productId].total + 1
        }

        const updatedProducts = objectMap({ ...productsInCart }, (value: { product: IProduct, total: number }) => {
          if (value.product.id === productId) {
            return updatedItem
          }
          return value
        })

        setProductsInCart(updatedProducts)
      }
    } else {
      setProductsInCart(prevProducts => ({ ...prevProducts, [productId]: { product: products[productId], total: 1 } }))
    }

  }

  const removeFromCart = (productId: string) => {
    if (productsInCart[productId] && productsInCart[productId].total > 1) {
      const updatedItem = {
        ...productsInCart[productId],
        total: productsInCart[productId].total - 1
      }

      const updatedProducts = objectMap({ ...productsInCart }, (value: { product: IProduct, total: number }) => {
        if (value.product.id === productId) {
          return updatedItem
        }
        return value
      })

      setProductsInCart(updatedProducts)
    } else {
      setProductsInCart(prevProducts => objectFilter(prevProducts, ([key, value]: any) => value.product.id !== productId))
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts()

        if (products) {
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
    const handleResize = () => {
      setWindowDimension(window.innerWidth)
      console.log(window.innerWidth)
    }

    fetchProducts()
    setWindowDimension(window.innerWidth)
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <div className='app-main_container'>
      {
        isLoading ?
          <>
            <div className='app-truck_Container'>
              <LoadingTruck />
              <span>We are fetching your groceries!</span>
            </div>
            {error &&
              <div className='app-error_container'>
                <span>You likely forgot to start the json server on local.</span>
                <p>Please open the <code>server-api</code> folder and from the Windows command line or Mac terminal (we Linux haters sorry) do <code>yarn start</code>.</p>
                <p>Please be sure to add <code>--port 3001</code>!</p>
              </div>
            }
          </>
          :
          !isMobile ?
            <div className='app-products_container'>
              <Gallery products={products} addToCart={addToCart} />
              <Cart cart={productsInCart} addToCart={addToCart} removeFromCart={removeFromCart} />
            </div>
            :
            <div className='app-mobile_products_container'>
              <div className='app-navbar' onClick={() => setShowCart(!showCart)} style={{ background: showCart ? 'whitesmoke' : 'white' }}>
                <img src={!showCart ? getIcons('CartBlue') : getIcons('ArrowLeft')} alt="cart" width='36' height='36' />
                <span>{showCart ? 'Products' : 'Cart'}</span>
              </div>

              {showCart ?
                <Cart cart={productsInCart} addToCart={addToCart} removeFromCart={removeFromCart} />
                :
                <Gallery products={products} addToCart={addToCart} />
              }
            </div>
      }
    </div>
  );
}

export default App
