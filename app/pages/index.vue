<script setup lang="ts">
const { t } = useStoreProducts()

useSeoMeta({
  title: () => t.value.brand,
  description: () => t.value.subtitle
})
</script>

<template>
  <main>
    <HomeHero />
    <HomeBrandShowcase />
  </main>
</template>
