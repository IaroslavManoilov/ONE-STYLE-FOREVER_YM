import { computed } from 'vue'
import { useState } from '#app'
import type { Product } from './useStoreProducts'

export type CartItem = Product & {
  qty: number
}

const STORAGE_KEY = 'osf-cart'

export function useCart() {
  const items = useState<CartItem[]>('shop-cart', () => [])
  const hydrated = useState<boolean>('shop-cart-hydrated', () => false)

  function add(product: Product) {
    const found = items.value.find(item => item.id === product.id)

    if (found) {
      found.qty += 1
    } else {
      items.value.push({
        ...product,
        qty: 1
      })
    }

    saveToStorage()
  }

  function increment(id: number) {
    const item = items.value.find(item => item.id === id)
    if (!item) return
    item.qty += 1
    saveToStorage()
  }

  function decrement(id: number) {
    const item = items.value.find(item => item.id === id)
    if (!item) return

    if (item.qty > 1) {
      item.qty -= 1
    } else {
      remove(id)
      return
    }

    saveToStorage()
  }

  function remove(id: number) {
    items.value = items.value.filter(item => item.id !== id)
    saveToStorage()
  }

  function clear() {
    items.value = []
    saveToStorage()
  }

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

  const count = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))
  const total = computed(() => items.value.reduce((sum, item) => sum + item.qty * item.price, 0))

  return {
    items,
    hydrated,
    count,
    total,
    add,
    increment,
    decrement,
    remove,
    clear,
    loadFromStorage
  }
}
