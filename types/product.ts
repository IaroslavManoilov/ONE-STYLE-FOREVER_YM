export interface ProductImage {
  id: string
  url: string
  alt: string
}

export interface ProductPrice {
  current: number
  old?: number
  currency: 'MDL'
}

export interface Product {
  id: string
  slug: string
  title: string
  description: string
  shortDescription?: string
  sku: string
  category: string
  price: ProductPrice
  images: ProductImage[]
  inStock: boolean
  featured?: boolean
  isNew?: boolean
  isHot?: boolean
}
