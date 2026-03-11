import { computed } from 'vue'
import { useState } from '#app'
import { brandInfo, storeMessages } from '../data/store'
import { products, type Product } from '../data/products'
import type { Locale } from '../data/store'

export type { Product, Locale }

export function useStoreProducts() {
  const locale = useState<Locale>('site-locale', () => 'ru')
  const t = computed(() => storeMessages[locale.value])

  function setLocale(value: Locale) {
    locale.value = value
  }

  function getProductBySlug(slug: string) {
    return products.find((item) => item.slug === slug) || null
  }

  function getLocalizedTitle(product: Product) {
    return product.title[locale.value]
  }

  function getLocalizedDescription(product: Product) {
    return product.description[locale.value]
  }

  function getCategoryLabel(category: Product['category']) {
    if (category === 'hoodie') return t.value.hoodies
    if (category === 'polo') return t.value.polo

    return locale.value === 'ru'
      ? 'Свитеры'
      : locale.value === 'ro'
        ? 'Pulovere'
        : 'Sweaters'
  }

  return {
    locale,
    setLocale,
    t,
    brandInfo,
    products,
    getProductBySlug,
    getLocalizedTitle,
    getLocalizedDescription,
    getCategoryLabel
  }
}
