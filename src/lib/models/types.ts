export type IProduct = {
  id: string,
  image_url: string,
  stock: number,
  productName: string,
  price: number,
  productDescription: string,
  favorite: string | number
}

export type IProducts = {
  [id: string]: IProduct
}