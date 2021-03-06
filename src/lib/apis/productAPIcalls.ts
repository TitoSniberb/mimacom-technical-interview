import { IProduct } from "../models/types"

export const getProducts = async (): Promise<IProduct[]> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/grocery`, {
    method: 'GET'
  })

  if (response.status !== 200) {
    throw new Error('There was an error getting the groceries, please try again later.')
  }
  const products = await response.json()

  return products
}

export const saveToFavorites = async (groceryId: string, isFavorite: boolean): Promise<void> => {
  const body = { favorite: isFavorite ? 0 : '1' }
  const headers = { "Content-type": "application/json" }
  const response = await fetch(`${process.env.REACT_APP_API_URL}/grocery/${groceryId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body)
  })

  if (response.status !== 200) {
    throw new Error('There was an error saving the product to favorites, please try again later.')
  }
}

export const getAllFavorites = async (): Promise<IProduct[]> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/grocery?favorite=1`, {
    method: 'GET'
  })

  if (response.status !== 200) {
    throw new Error('We could not load your favorites. Please try again.')
  }
  const favorites = response.json()

  return favorites
}