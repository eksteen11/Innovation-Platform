export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  is_active: boolean
}

export interface CartItem extends Product {
  quantity: number
}

export interface School {
  id: string
  name: string
  address: string
  is_active: boolean
}