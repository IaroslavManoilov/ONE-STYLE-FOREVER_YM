<script setup lang="ts">
const cart = useCartStore()
</script>

<template>
  <header class="section" style="padding-bottom: 0;">
    <div class="container card" style="padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
      <NuxtLink to="/" style="font-size: 22px; font-weight: 800;">
        ONE_STYLE
      </NuxtLink>

      <nav style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <NuxtLink to="/">Главная</NuxtLink>
        <NuxtLink to="/catalog">Каталог</NuxtLink>
        <NuxtLink to="/cart">Корзина ({{ cart.totalItems }})</NuxtLink>
      </nav>
    </div>
  </header>
</template>
