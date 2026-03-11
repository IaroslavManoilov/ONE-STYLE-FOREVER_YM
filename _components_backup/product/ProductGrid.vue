<script setup lang="ts">
import type { Product } from '~/types/product'

defineProps<{
  items: Product[]
}>()
</script>

<template>
  <div class="grid grid-3">
    <ProductCard
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </div>
</template>
