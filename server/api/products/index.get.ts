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
  const query = getQuery(event)

  const search = String(query.search || '').trim().toLowerCase()
  const category = String(query.category || '').trim().toLowerCase()
  const sort = String(query.sort || 'default').trim().toLowerCase()
  const featured = String(query.featured || '').trim().toLowerCase()

  let filtered = [...products]

  if (search) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search)
    )
  }

  if (category) {
    filtered = filtered.filter(item => item.category.toLowerCase() === category)
  }

  if (featured === 'true') {
    filtered = filtered.filter(item => item.featured)
  }

  if (sort === 'price-asc') filtered.sort((a, b) => a.price.current - b.price.current)
  if (sort === 'price-desc') filtered.sort((a, b) => b.price.current - a.price.current)
  if (sort === 'name-asc') filtered.sort((a, b) => a.title.localeCompare(b.title))

  return {
    items: filtered,
    total: filtered.length
  }
})
