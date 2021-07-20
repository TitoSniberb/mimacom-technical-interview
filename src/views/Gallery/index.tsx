import React, { useEffect, useState } from 'react'
import Product from '../../components/Product'
import { getAllFavorites } from '../../lib/apis/productAPIcalls'
import { IProduct, IProducts } from '../../lib/models/types'
import { getIcons } from '../../lib/services/getIcons'
import './gallery.scss'

interface GalleryProps {
  products: IProducts
  addToCart: (productId: string) => void

}

const Gallery = ({ products, addToCart }: GalleryProps) => {
  const [showFavorites, setShowFavorites] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('')
  const [favorites, setFavorites] = useState<IProducts>({})

  useEffect(() => {
    if (showFavorites) {
      const fetchFavorites = async () => {
        setIsLoading(true)

        try {
          const favoriteProds = (await getAllFavorites()).reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {})

          setFavorites(favoriteProds)
        } catch (err) {
          setError(err.message || err)
        } finally {
          setIsLoading(false)
        }
      }

      fetchFavorites()
    }
  }, [showFavorites])

  return (
    <div className='gallery-main_container scrollbar'>
      <div className='gallery-title_container'>
        <h1>{!showFavorites ? 'Product list' : 'Favorite products'}</h1>

        <img src={!showFavorites ? getIcons('HeartFilledBlue') : getIcons('List')} alt="fav" onClick={() => !isLoading && setShowFavorites(!showFavorites)} />
      </div>

      <div className='product-list'>
        {
          !showFavorites ?
            Object.values(products).map(product => <Product product={product} addToCart={addToCart} key={product.id} />)
            :
            Object.values(favorites).map(product => <Product product={product} addToCart={addToCart} key={product.id} />)
        }
      </div>
    </div >
  )
}

export default Gallery
