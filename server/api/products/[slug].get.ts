import type { Product } from '~/types/product'

const products: Product[] = [
  {
    id: '1',
    slug: 'minimal-hoodie',
    title: 'Minimal Hoodie',
    description: 'Плотное худи в минималистичном стиле на каждый день.',
    shortDescription: 'Плотная ткань, свободный крой',
    sku: 'HD-001',
    category: 'hoodies',
    price: { current: 699, old: 799, currency: 'MDL' },
    images: [{ id: '1', url: '/images/products/hoodie.svg', alt: 'Minimal Hoodie' }],
    inStock: true,
    isNew: true,
    featured: true
  },
  {
    id: '2',
    slug: 'street-jacket',
    title: 'Street Jacket',
    description: 'Легкая куртка для повседневного городского образа.',
    shortDescription: 'Современный силуэт, комфортная посадка',
    sku: 'JK-001',
    category: 'jackets',
    price: { current: 1199, currency: 'MDL' },
    images: [{ id: '2', url: '/images/products/jacket.svg', alt: 'Street Jacket' }],
    inStock: true,
    isHot: true,
    featured: true
  },
  {
    id: '3',
    slug: 'leather-belt',
    title: 'Leather Belt',
    description: 'Кожаный ремень для базового гардероба.',
    shortDescription: 'Натуральный материал, универсальный стиль',
    sku: 'BL-001',
    category: 'accessories',
    price: { current: 299, currency: 'MDL' },
    images: [{ id: '3', url: '/images/products/belt.svg', alt: 'Leather Belt' }],
    inStock: true,
    featured: true
  }
]

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const product = products.find(item => item.slug === slug)

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Товар не найден'
    })
  }

  return product
})
