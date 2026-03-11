<script setup lang="ts">
const { t, products, getLocalizedTitle, getLocalizedDescription, locale } = useStoreProducts()
const { add } = useCart()

const search = ref('')
const activeCategory = ref<'all' | 'sweater' | 'hoodie' | 'polo'>('all')

const categoryOptions = computed(() => {
  const sweaterLabel =
    locale.value === 'ru'
      ? 'Свитеры'
      : locale.value === 'ro'
        ? 'Pulovere'
        : 'Sweaters'

  return [
    { key: 'all' as const, label: t.value.all },
    { key: 'sweater' as const, label: sweaterLabel },
    { key: 'hoodie' as const, label: t.value.hoodies },
    { key: 'polo' as const, label: t.value.polo }
  ]
})

const filteredProducts = computed(() => {
  const q = search.value.trim().toLowerCase()

  return products.filter((item) => {
    const categoryMatch = activeCategory.value === 'all' || item.category === activeCategory.value
    const textMatch =
      !q ||
      getLocalizedTitle(item).toLowerCase().includes(q) ||
      getLocalizedDescription(item).toLowerCase().includes(q)

    return categoryMatch && textMatch
  })
})

useSeoMeta({
  title: () => `${t.value.navCatalog} | ${t.value.brand}`,
  description: () => t.value.popularSub
})
</script>

<template>
  <main class="section">
    <div class="container catalog-top">
      <div>
        <h1 class="page-title">{{ t.popular }}</h1>
        <p class="page-subtitle">{{ t.popularSub }}</p>
      </div>

      <input v-model="search" type="text" :placeholder="t.searchPlaceholder" class="search-input" />
    </div>

    <div class="container filter-row">
      <button
        v-for="category in categoryOptions"
        :key="category.key"
        type="button"
        class="filter-btn"
        :class="{ active: activeCategory === category.key }"
        @click="activeCategory = category.key"
      >
        {{ category.label }}
      </button>
    </div>

    <div class="container catalog-grid">
      <StoreProductCard
        v-for="item in filteredProducts"
        :key="item.id"
        :item="item"
        @add="add"
      />
    </div>
  </main>
</template>
