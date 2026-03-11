<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{
  item: Product
}>()

const cart = useCartStore()

const hasOldPrice = computed(() => {
  return typeof props.item.price.old === 'number' && props.item.price.old > props.item.price.current
})

function addToCart() {
  if (!props.item.inStock) return
  cart.add(props.item)
}
</script>

<template>
  <article class="card" style="padding: 14px;">
    <NuxtLink :to="`/product/${item.slug}`">
      <div style="position: relative; overflow: hidden; border-radius: 16px; background: #f1f5f9; aspect-ratio: 1 / 1; display: flex; align-items: center; justify-content: center;">
        <img
          :src="item.images[0]?.url"
          :alt="item.images[0]?.alt || item.title"
          style="width: 100%; height: 100%; object-fit: cover;"
          loading="lazy"
        />

        <div style="position: absolute; top: 12px; left: 12px; display: flex; gap: 8px;">
          <span v-if="item.isNew" class="badge badge-dark">NEW</span>
          <span v-if="item.isHot" class="badge badge-hot">HOT</span>
        </div>
      </div>
    </NuxtLink>

    <div style="padding-top: 14px; display: grid; gap: 10px;">
      <NuxtLink :to="`/product/${item.slug}`" style="font-weight: 700; font-size: 18px;">
        {{ item.title }}
      </NuxtLink>

      <p class="muted" style="margin: 0; min-height: 40px;">
        {{ item.shortDescription || item.description }}
      </p>

      <div style="display: flex; justify-content: space-between; align-items: end; gap: 12px;">
        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
          <strong style="font-size: 20px;">{{ item.price.current }} {{ item.price.currency }}</strong>
          <span v-if="hasOldPrice" class="muted" style="text-decoration: line-through;">
            {{ item.price.old }} {{ item.price.currency }}
          </span>
        </div>

        <span :class="item.inStock ? 'status-success' : 'status-danger'" style="font-size: 14px;">
          {{ item.inStock ? 'В наличии' : 'Нет в наличии' }}
        </span>
      </div>

      <button
        class="btn btn-primary"
        :disabled="!item.inStock"
        :style="{ opacity: item.inStock ? 1 : 0.6 }"
        @click="addToCart"
      >
        {{ item.inStock ? 'Добавить в корзину' : 'Нет в наличии' }}
      </button>
    </div>
  </article>
</template>
