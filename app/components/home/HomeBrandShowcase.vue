<script setup lang="ts">
const { products, getLocalizedTitle, getLocalizedDescription, getCategoryLabel, t } = useStoreProducts()

const selectedProductId = ref(products[0]?.id || 1)

const selectedProduct = computed(() => {
  return products.find(item => item.id === selectedProductId.value) || products[0]
})

const previewProducts = computed(() => products.slice(0, 4))
</script>

<template>
  <section id="brand" class="section-small">
    <div class="container showcase-wrap">
      <div class="card showcase-main" v-if="selectedProduct">
        <div class="showcase-main__media">
          <div class="showcase-main__media-box">
            <img
              :src="selectedProduct.images[0]"
              :alt="getLocalizedTitle(selectedProduct)"
            />
          </div>
        </div>

        <div class="showcase-main__content">
          <span class="showcase-main__label">
            {{ getCategoryLabel(selectedProduct.category) }}
          </span>

          <h2 class="showcase-main__title">
            {{ getLocalizedTitle(selectedProduct) }}
          </h2>

          <p class="showcase-main__desc">
            {{ getLocalizedDescription(selectedProduct) }}
          </p>

          <div class="showcase-main__meta">
            <div class="showcase-main__price">
              {{ selectedProduct.price }} MDL
            </div>

            <div class="showcase-main__sizes">
              <span
                v-for="size in selectedProduct.sizes"
                :key="size"
                class="showcase-main__size"
              >
                {{ size }}
              </span>
            </div>
          </div>

          <div class="showcase-main__actions">
            <NuxtLink
              :to="`/product/${selectedProduct.slug}`"
              class="btn btn-primary"
            >
              {{ t.addToCart }}
            </NuxtLink>

            <NuxtLink
              to="/catalog"
              class="btn btn-secondary"
            >
              {{ t.navCatalog }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="showcase-grid">
        <button
          v-for="item in previewProducts"
          :key="item.id"
          type="button"
          class="showcase-mini"
          :class="{ 'showcase-mini--active': selectedProduct && selectedProduct.id === item.id }"
          @click="selectedProductId = item.id"
        >
          <div class="showcase-mini__image-wrap">
            <img
              :src="item.images[0]"
              :alt="getLocalizedTitle(item)"
              class="showcase-mini__image"
            />
          </div>

          <div class="showcase-mini__body">
            <div class="showcase-mini__title">
              {{ getLocalizedTitle(item) }}
            </div>

            <div class="showcase-mini__price">
              {{ item.price }} MDL
            </div>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
