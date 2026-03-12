import { computed } from 'vue'
import { useState } from '#app'
import type { Product } from './useStoreProducts'

const STORAGE_KEY = 'osf-wishlist'

export function useWishlist() {
  const items = useState<Product[]>('shop-wishlist', () => [])
  const hydrated = useState<boolean>('shop-wishlist-hydrated', () => false)

  function loadFromStorage() {
    if (!import.meta.client) return
    if (hydrated.value) return

    try {
      const raw = localStorage.getItem(STORAGE_KEY)

      if (!raw) {
        items.value = []
      } else {
        const parsed = JSON.parse(raw)
        items.value = Array.isArray(parsed) ? parsed : []
      }
    } catch {
      items.value = []
    }

    hydrated.value = true
  }

  function saveToStorage() {
    if (!import.meta.client) return
    if (!hydrated.value) return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
    } catch {
    }
  }

  function isInWishlist(id: number | string) {
    return items.value.some(item => item.id === id)
  }

  function add(product: Product) {
    if (isInWishlist(product.id)) return false
    items.value.push(product)
    saveToStorage()
    return true
  }

  function remove(id: number | string) {
    items.value = items.value.filter(item => item.id !== id)
    saveToStorage()
  }

  function toggle(product: Product) {
    const exists = isInWishlist(product.id)

    if (exists) {
      remove(product.id)
      return false
    }

    add(product)
    return true
  }

  const count = computed(() => items.value.length)

  return {
    items,
    hydrated,
    count,
    loadFromStorage,
    saveToStorage,
    isInWishlist,
    add,
    remove,
    toggle
  }
}
