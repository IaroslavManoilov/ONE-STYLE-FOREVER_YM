import { useState } from '#app'
import type { Product } from './useStoreProducts'

export function useQuickView() {
  const isOpen = useState<boolean>('quick-view-open', () => false)
  const product = useState<Product | null>('quick-view-product', () => null)

  function open(nextProduct: Product) {
    product.value = nextProduct
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return {
    isOpen,
    product,
    open,
    close
  }
}
