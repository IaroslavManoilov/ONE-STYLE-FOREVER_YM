<script setup lang="ts">
import type { StoreProduct } from '../../composables/useStoreProducts'

const props = defineProps<{
  product: StoreProduct
}>()

const { t, getLocalizedProduct } = useStoreProducts()
const { add } = useCart()
</script>

<template>
  <div class="glass-card product-card">
    <NuxtLink to="/catalog" class="back-link">
      ← {{ t.backToCatalog }}
    </NuxtLink>

    <div class="product-topline">
      <span class="pill product-category">{{ product.category === 'hoodies' ? t.hoodies : t.polo }}</span>
      <span class="product-stock">{{ t.inStock }}</span>
    </div>

    <h1 class="product-title">{{ getLocalizedProduct(product).title }}</h1>

    <p class="product-desc">{{ getLocalizedProduct(product).description }}</p>

    <div class="product-price-row">
      <strong class="product-price">{{ product.price }} MDL</strong>
      <span v-if="product.oldPrice" class="product-old-price">{{ product.oldPrice }} MDL</span>
    </div>

    <button type="button" class="btn btn-primary" @click="add(product)">
      {{ t.addToCart }}
    </button>
  </div>
</template>
