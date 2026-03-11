<script setup lang="ts">
const route = useRoute()
const { t, getProductBySlug, getLocalizedTitle, getLocalizedDescription, getCategoryLabel } = useStoreProducts()
const { add } = useCart()

const product = computed(() => getProductBySlug(String(route.params.slug)))
const currentImage = ref('')

watchEffect(() => {
  if (product.value) {
    currentImage.value = product.value.images[0] || ''
  }
})

useSeoMeta({
  title: () => product.value ? `${getLocalizedTitle(product.value)} | ${t.value.brand}` : t.value.brand,
  description: () => product.value ? getLocalizedDescription(product.value) : t.value.subtitle
})
</script>

<template>
  <main class="section">
    <div v-if="product" class="container product-layout">
      <div class="card product-gallery">
        <div class="product-main-image">
          <img :src="currentImage" :alt="getLocalizedTitle(product)" />
        </div>

        <div class="product-thumbs">
          <button
            v-for="image in product.images"
            :key="image"
            type="button"
            class="product-thumb-btn"
            @click="currentImage = image"
          >
            <img :src="image" alt="" />
          </button>
        </div>
      </div>

      <div class="card product-info">
        <NuxtLink to="/catalog" class="back-link">
          ← {{ t.backToCatalog }}
        </NuxtLink>

        <div class="product-topline">
          <span class="pill">{{ getCategoryLabel(product.category) }}</span>
          <span class="product-card__stock" v-if="product.inStock">{{ t.inStock }}</span>
        </div>

        <h1 class="product-title">{{ getLocalizedTitle(product) }}</h1>
        <p class="product-desc">{{ getLocalizedDescription(product) }}</p>

        <div class="product-sizes">
          <div class="product-sizes-label">Sizes</div>
          <div class="product-sizes-list">
            <span v-for="size in product.sizes" :key="size">{{ size }}</span>
          </div>
        </div>

        <div class="product-price-row">
          <strong class="product-price">{{ product.price }} MDL</strong>
        </div>

        <button type="button" class="btn btn-primary" @click="add(product)">
          {{ t.addToCart }}
        </button>
      </div>
    </div>

    <div v-else class="container" style="padding:40px 0;">
      Product not found
    </div>
  </main>
</template>
