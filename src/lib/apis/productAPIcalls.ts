export const getProducts = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/grocery`, {
    method: 'GET'
  })
  if (response.status !== 200) {
    throw new Error('There was an error getting the groceries, please try again later.')
  }
  const products = await response.json()

  return products
}