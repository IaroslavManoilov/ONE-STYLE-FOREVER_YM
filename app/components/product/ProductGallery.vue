<script setup lang="ts">
import type { StoreProduct } from '../../composables/useStoreProducts'

const props = defineProps<{
  product: StoreProduct
}>()

const { getLocalizedProduct } = useStoreProducts()

const currentImage = ref('')

watchEffect(() => {
  currentImage.value = props.product.gallery?.[0] || props.product.image
})
</script>

<template>
  <div class="glass-card product-card">
    <div class="product-main-image">
      <img :src="currentImage" :alt="getLocalizedProduct(product).title" />
    </div>

    <div class="thumb-row">
      <button
        v-for="image in product.gallery || [product.image]"
        :key="image"
        type="button"
        class="thumb-btn"
        @click="currentImage = image"
      >
        <img :src="image" alt="" />
      </button>
    </div>
  </div>
</template>
