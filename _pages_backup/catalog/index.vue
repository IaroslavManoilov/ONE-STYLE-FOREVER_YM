<script setup lang="ts">
const route = useRoute()

const { data, pending, error } = await useFetch('/api/products', {
  query: route.query
})

useSeoMeta({
  title: 'Каталог | ONE_STYLE FOREVER',
  description: 'Каталог одежды и аксессуаров'
})
</script>

<template>
  <div>
    <AppHeader />

    <main class="section">
      <div class="container">
        <h1 style="margin-top: 0;">Каталог</h1>
        <CatalogToolbar />

        <div v-if="pending" class="card" style="padding: 20px;">Загрузка товаров...</div>
        <div v-else-if="error" class="card" style="padding: 20px;">Ошибка загрузки каталога</div>
        <div v-else-if="!data?.items?.length" class="card" style="padding: 20px;">Товары не найдены</div>
        <ProductGrid v-else :items="data.items" />
      </div>
    </main>
  </div>
</template>
