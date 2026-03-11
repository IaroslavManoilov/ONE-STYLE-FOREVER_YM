<script setup lang="ts">
import type { Product } from '../composables/useStoreProducts'

const props = defineProps<{
  item: Product
}>()

const emit = defineEmits<{
  add: [product: Product]
}>()

const { getLocalizedTitle, getLocalizedDescription, getCategoryLabel, t } = useStoreProducts()

const imageSrc = computed(() => props.item.images[0] || '')
</script>

<template>
  <article class="product-card">
    <NuxtLink :to="`/product/${item.slug}`" class="product-card__image-link">
      <div class="product-card__badge" v-if="item.badge">
        {{ item.badge }}
      </div>

      <div class="product-card__image-wrap">
        <img :src="imageSrc" :alt="getLocalizedTitle(item)" class="product-card__image" />
      </div>
    </NuxtLink>

    <div class="product-card__body">
      <div class="product-card__meta">
        <span class="pill product-card__category">{{ getCategoryLabel(item.category) }}</span>
        <span class="product-card__stock" v-if="item.inStock">{{ t.inStock }}</span>
      </div>

      <NuxtLink :to="`/product/${item.slug}`" class="product-card__title-link">
        <h3 class="product-card__title">{{ getLocalizedTitle(item) }}</h3>
      </NuxtLink>

      <p class="product-card__desc">{{ getLocalizedDescription(item) }}</p>

      <div class="product-card__sizes">
        <span v-for="size in item.sizes" :key="size">{{ size }}</span>
      </div>

      <div class="product-card__bottom">
        <strong class="product-card__price">{{ item.price }} MDL</strong>

        <button type="button" class="btn btn-primary product-card__btn" @click="emit('add', item)">
          {{ t.addToCart }}
        </button>
      </div>
    </div>
  </article>
</template>
