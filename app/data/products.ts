export type ProductCategory = 'sweater' | 'hoodie' | 'polo'

export type Product = {
  id: number
  slug: string
  price: number
  oldPrice?: number | null
  sizes: string[]
  category: ProductCategory
  images: string[]
  inStock: boolean
  badge?: 'NEW' | 'HOT' | ''
  title: {
    ru: string
    ro: string
    en: string
  }
  description: {
    ru: string
    ro: string
    en: string
  }
}

export const products: Product[] = [
  {
    id: 1,
    slug: 'halfzip-white-osf',
    price: 600,
    oldPrice: null,
    sizes: ['S', 'M', 'L'],
    category: 'sweater',
    images: ['/images/products/halfzip-white.png'],
    inStock: true,
    badge: 'NEW',
    title: {
      ru: 'Свитер полузамок белый OSF',
      ro: 'Pulover half-zip alb OSF',
      en: 'White half-zip sweater OSF'
    },
    description: {
      ru: 'Белый свитер с полузамком и фирменным знаком OSF. Чистый силуэт, комфорт и аккуратный повседневный стиль.',
      ro: 'Pulover alb half-zip cu emblemă OSF. Siluetă curată, confort și stil zilnic premium.',
      en: 'White half-zip sweater with OSF emblem. Clean silhouette, comfort and refined everyday style.'
    }
  },
  {
    id: 2,
    slug: 'halfzip-black-osf',
    price: 600,
    oldPrice: null,
    sizes: ['S', 'M', 'L'],
    category: 'sweater',
    images: ['/images/products/halfzip-black.png'],
    inStock: true,
    badge: 'HOT',
    title: {
      ru: 'Свитер полузамок черный OSF',
      ro: 'Pulover half-zip negru OSF',
      en: 'Black half-zip sweater OSF'
    },
    description: {
      ru: 'Черный свитер с полузамком в эстетике ONE_STYLE FOREVER. Универсальная модель для стильного повседневного образа.',
      ro: 'Pulover negru half-zip în estetica ONE_STYLE FOREVER. Model versatil pentru un look modern de zi cu zi.',
      en: 'Black half-zip sweater in ONE_STYLE FOREVER aesthetic. A versatile piece for a modern everyday look.'
    }
  },
  {
    id: 3,
    slug: 'hoodie-black-osf',
    price: 800,
    oldPrice: null,
    sizes: ['S', 'M', 'L'],
    category: 'hoodie',
    images: [
      '/images/products/hoodie-black-front.png',
      '/images/products/hoodie-black-back.png'
    ],
    inStock: true,
    badge: 'NEW',
    title: {
      ru: 'Батник черный OSF',
      ro: 'Hanorac negru OSF',
      en: 'Black hoodie OSF'
    },
    description: {
      ru: 'Черный батник ONE_STYLE FOREVER с фирменным знаком спереди и сильной подачей бренда на спине.',
      ro: 'Hanorac negru ONE_STYLE FOREVER cu emblemă frontală și identitate puternică pe spate.',
      en: 'Black ONE_STYLE FOREVER hoodie with front emblem and strong back branding.'
    }
  },
  {
    id: 4,
    slug: 'hoodie-white-osf',
    price: 800,
    oldPrice: null,
    sizes: ['S', 'M', 'L'],
    category: 'hoodie',
    images: ['/images/products/hoodie-white-front.png'],
    inStock: true,
    badge: '',
    title: {
      ru: 'Батник белый OSF',
      ro: 'Hanorac alb OSF',
      en: 'White hoodie OSF'
    },
    description: {
      ru: 'Белый батник OSF в чистом минималистичном стиле. Светлая база для современного гардероба.',
      ro: 'Hanorac alb OSF într-un stil minimalist curat. O piesă luminoasă pentru garderoba modernă.',
      en: 'White OSF hoodie in a clean minimalist style. A bright essential for a modern wardrobe.'
    }
  },
  {
    id: 5,
    slug: 'polo-white-osf',
    price: 300,
    oldPrice: null,
    sizes: ['S', 'M', 'L'],
    category: 'polo',
    images: ['/images/products/polo-white.png'],
    inStock: true,
    badge: '',
    title: {
      ru: 'Майка Polo белая OSF',
      ro: 'Tricou Polo alb OSF',
      en: 'White polo OSF'
    },
    description: {
      ru: 'Белое поло с минималистичным фирменным знаком OSF. Лаконичная база для аккуратного образа.',
      ro: 'Polo alb cu emblemă OSF minimalistă. O bază elegantă pentru un look îngrijit.',
      en: 'White polo with minimalist OSF emblem. A clean essential for a polished look.'
    }
  },
  {
    id: 6,
    slug: 'polo-black-osf',
    price: 300,
    oldPrice: null,
    sizes: ['S', 'M', 'L'],
    category: 'polo',
    images: ['/images/products/polo-black.png'],
    inStock: true,
    badge: '',
    title: {
      ru: 'Майка Polo черная OSF',
      ro: 'Tricou Polo negru OSF',
      en: 'Black polo OSF'
    },
    description: {
      ru: 'Черное поло OSF с минималистичным знаком бренда. Универсальный вариант для аккуратного повседневного стиля.',
      ro: 'Polo negru OSF cu semn discret de brand. Variantă universală pentru stil curat de zi cu zi.',
      en: 'Black OSF polo with a subtle brand mark. A versatile choice for clean everyday style.'
    }
  }
]
