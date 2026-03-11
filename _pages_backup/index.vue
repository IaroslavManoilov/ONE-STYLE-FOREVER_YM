<script setup lang="ts">
const { data } = await useFetch('/api/products', {
  query: {
    featured: 'true'
  }
})

useSeoMeta({
  title: 'ONE_STYLE FOREVER',
  description: 'Стильный интернет-магазин одежды и аксессуаров'
})
</script>

<template>
  <div>
    <AppHeader />

    <main class="section">
      <div class="container" style="display: grid; gap: 24px;">
        <section class="card" style="padding: 32px; display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; align-items: center;">
          <div style="display: grid; gap: 18px;">
            <span style="display: inline-block; width: fit-content; padding: 8px 12px; border-radius: 999px; border: 1px solid var(--border); color: var(--brand);">
              Moldova • Chișinău
            </span>

            <div>
              <h1 style="margin: 0 0 12px; font-size: 52px; line-height: 1;">
                ONE_STYLE FOREVER
              </h1>
              <p class="muted" style="margin: 0; font-size: 18px;">
                Одежда, аксессуары и базовые вещи на каждый день. Быстрая доставка, аккуратная упаковка и понятный каталог.
              </p>
            </div>

            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <NuxtLink to="/catalog" class="btn btn-primary">Перейти в каталог</NuxtLink>
              <NuxtLink to="/cart" class="btn btn-secondary">Открыть корзину</NuxtLink>
            </div>
          </div>

          <div class="card" style="min-height: 360px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
            <img
              src="/images/products/hoodie.svg"
              alt="ONE_STYLE FOREVER"
              style="width: 100%; height: 100%; object-fit: cover;"
            />
          </div>
        </section>

        <section>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h2 style="margin: 0;">Популярные товары</h2>
            <NuxtLink to="/catalog" class="muted">Весь каталог →</NuxtLink>
          </div>

          <ProductGrid :items="data?.items || []" />
        </section>
      </div>
    </main>
  </div>
</template>
