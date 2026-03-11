import { defineStore } from 'pinia'
import type { Product } from '~/types/product'

interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.product.price.current * item.quantity, 0)
  },

  actions: {
    add(product: Product) {
      const existing = this.items.find(item => item.product.id === product.id)

      if (existing) {
        existing.quantity += 1
        return
      }

      this.items.push({ product, quantity: 1 })
    },

    remove(productId: string) {
      this.items = this.items.filter(item => item.product.id !== productId)
    },

    increment(productId: string) {
      const item = this.items.find(item => item.product.id === productId)
      if (item) item.quantity += 1
    },

    decrement(productId: string) {
      const item = this.items.find(item => item.product.id === productId)
      if (!item) return

      if (item.quantity > 1) item.quantity -= 1
      else this.remove(productId)
    },

    clear() {
      this.items = []
    }
  }
})
