import { computed } from 'vue'
import { useState } from '#app'
import type { Product } from './useStoreProducts'

export type CartItem = Product & {
  qty: number
  selectedSize: string
}

const STORAGE_KEY = 'osf-cart'

export function useCart() {
  const items = useState<CartItem[]>('shop-cart', () => [])
  const hydrated = useState<boolean>('shop-cart-hydrated', () => false)
  const { show } = useToast()
  const { t, getLocalizedTitle } = useStoreProducts()

  function add(product: Product, selectedSize?: string) {
    const size = (selectedSize || '').trim()
    if (!size) return false

    const found = items.value.find(item => item.id === product.id && item.selectedSize === size)

    if (found) {
      found.qty += 1
    } else {
      items.value.push({
        ...product,
        qty: 1,
        selectedSize: size
      })
    }

    saveToStorage()

    const title = getLocalizedTitle(product)
    const toastAddedWithSize =
      (t.value as any).toastAddedWithSize ||
      (t.value as any).addToCart ||
      'Product added'

    const toastSizePrefix =
      (t.value as any).toastSizePrefix ||
      (t.value as any).chooseSizeShort ||
      'size'

    show(`${toastAddedWithSize}: ${title} · ${toastSizePrefix} ${size}`, 'success')

    return true
  }

  function increment(id: number, selectedSize: string) {
    const item = items.value.find(item => item.id === id && item.selectedSize === selectedSize)
    if (!item) return
    item.qty += 1
    saveToStorage()
  }

  function decrement(id: number, selectedSize: string) {
    const item = items.value.find(item => item.id === id && item.selectedSize === selectedSize)
    if (!item) return

    if (item.qty > 1) {
      item.qty -= 1
    } else {
      remove(id, selectedSize)
      return
    }

    saveToStorage()
  }

  function remove(id: number, selectedSize: string) {
    items.value = items.value.filter(item => !(item.id === id && item.selectedSize === selectedSize))
    saveToStorage()
  }

  function changeSize(id: number, fromSize: string, toSize: string) {
    const nextSize = (toSize || '').trim()
    if (!nextSize || fromSize === nextSize) return false

    const currentItem = items.value.find(item => item.id === id && item.selectedSize === fromSize)
    if (!currentItem) return false

    const sameTarget = items.value.find(item => item.id === id && item.selectedSize === nextSize)

    if (sameTarget) {
      sameTarget.qty += currentItem.qty
      items.value = items.value.filter(item => !(item.id === id && item.selectedSize === fromSize))
    } else {
      currentItem.selectedSize = nextSize
    }

    saveToStorage()
    return true
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
    changeSize,
    clear,
    loadFromStorage
  }
}
