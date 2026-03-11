<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const search = ref(String(route.query.search || ''))
const category = ref(String(route.query.category || ''))
const sort = ref(String(route.query.sort || 'default'))

function applyFilters() {
  router.push({
    path: '/catalog',
    query: {
      ...(search.value ? { search: search.value } : {}),
      ...(category.value ? { category: category.value } : {}),
      ...(sort.value && sort.value !== 'default' ? { sort: sort.value } : {})
    }
  })
}
</script>

<template>
  <div class="card" style="padding: 16px; display: grid; gap: 12px; margin-bottom: 20px;">
    <div style="display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 12px;">
      <input v-model="search" type="text" placeholder="Поиск товара..." class="field" />
      <select v-model="category" class="field">
        <option value="">Все категории</option>
        <option value="hoodies">Hoodies</option>
        <option value="jackets">Jackets</option>
        <option value="accessories">Accessories</option>
      </select>
      <select v-model="sort" class="field">
        <option value="default">Сортировка</option>
        <option value="price-asc">Цена ↑</option>
        <option value="price-desc">Цена ↓</option>
        <option value="name-asc">Название А-Я</option>
      </select>
      <button class="btn btn-primary" @click="applyFilters">Применить</button>
    </div>
  </div>
</template>
