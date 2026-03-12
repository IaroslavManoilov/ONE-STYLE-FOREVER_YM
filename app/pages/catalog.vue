<script setup lang="ts">
const {
  t,
  products,
  getLocalizedTitle,
  getLocalizedDescription,
  locale
} = useStoreProducts()

const search = ref('')
const activeCategory = ref<'all' | 'sweater' | 'hoodie' | 'polo'>('all')
const selectedSizes = ref<string[]>([])
const selectedColors = ref<string[]>([])
const selectedPrice = ref<'all' | '0-400' | '401-700' | '701+'>('all')
const sortOption = ref<'default' | 'price-asc' | 'price-desc' | 'new' | 'popular'>('default')

const sweaterLabel = computed(() => {
  if (locale.value === 'ru') return 'Свитеры'
  if (locale.value === 'ro') return 'Pulovere'
  return 'Sweaters'
})

const colorTitle = computed(() => {
  if (locale.value === 'ru') return 'Цвет'
  if (locale.value === 'ro') return 'Culoare'
  return 'Color'
})

const sizeTitle = computed(() => {
  if (locale.value === 'ru') return 'Размер'
  if (locale.value === 'ro') return 'Mărime'
  return 'Size'
})

const priceTitle = computed(() => {
  if (locale.value === 'ru') return 'Цена'
  if (locale.value === 'ro') return 'Preț'
  return 'Price'
})

const filterTitle = computed(() => {
  if (locale.value === 'ru') return 'Фильтры'
  if (locale.value === 'ro') return 'Filtre'
  return 'Filters'
})

const resetText = computed(() => {
  if (locale.value === 'ru') return 'Сбросить'
  if (locale.value === 'ro') return 'Resetează'
  return 'Reset'
})

const sortTitle = computed(() => {
  if (locale.value === 'ru') return 'Сортировка'
  if (locale.value === 'ro') return 'Sortare'
  return 'Sort'
})

const colorOptions = computed(() => {
  if (locale.value === 'ru') {
    return [
      { value: 'white', label: 'Белый' },
      { value: 'black', label: 'Черный' }
    ]
  }

  if (locale.value === 'ro') {
    return [
      { value: 'white', label: 'Alb' },
      { value: 'black', label: 'Negru' }
    ]
  }

  return [
    { value: 'white', label: 'White' },
    { value: 'black', label: 'Black' }
  ]
})

const priceOptions = computed(() => {
  return [
    { value: 'all', label: locale.value === 'ru' ? 'Все' : locale.value === 'ro' ? 'Toate' : 'All' },
    { value: '0-400', label: '0 - 400 MDL' },
    { value: '401-700', label: '401 - 700 MDL' },
    { value: '701+', label: '701+ MDL' }
  ]
})

const sortOptions = computed(() => {
  if (locale.value === 'ru') {
    return [
      { value: 'default', label: 'По умолчанию' },
      { value: 'price-asc', label: 'Цена ↑' },
      { value: 'price-desc', label: 'Цена ↓' },
      { value: 'new', label: 'Новинки' },
      { value: 'popular', label: 'Популярные' }
    ]
  }

  if (locale.value === 'ro') {
    return [
      { value: 'default', label: 'Implicit' },
      { value: 'price-asc', label: 'Preț ↑' },
      { value: 'price-desc', label: 'Preț ↓' },
      { value: 'new', label: 'Noi' },
      { value: 'popular', label: 'Populare' }
    ]
  }

  return [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price ↑' },
    { value: 'price-desc', label: 'Price ↓' },
    { value: 'new', label: 'New' },
    { value: 'popular', label: 'Popular' }
  ]
})

const categoryOptions = computed(() => {
  return [
    { key: 'all' as const, label: t.value.all },
    { key: 'sweater' as const, label: sweaterLabel.value },
    { key: 'hoodie' as const, label: t.value.hoodies },
    { key: 'polo' as const, label: t.value.polo }
  ]
})

function toggleSize(size: string) {
  if (selectedSizes.value.includes(size)) {
    selectedSizes.value = selectedSizes.value.filter(item => item !== size)
  } else {
    selectedSizes.value = [...selectedSizes.value, size]
  }
}

function toggleColor(color: string) {
  if (selectedColors.value.includes(color)) {
    selectedColors.value = selectedColors.value.filter(item => item !== color)
  } else {
    selectedColors.value = [...selectedColors.value, color]
  }
}

function resetFilters() {
  search.value = ''
  activeCategory.value = 'all'
  selectedSizes.value = []
  selectedColors.value = []
  selectedPrice.value = 'all'
  sortOption.value = 'default'
}

function matchesPrice(price: number) {
  if (selectedPrice.value === 'all') return true
  if (selectedPrice.value === '0-400') return price >= 0 && price <= 400
  if (selectedPrice.value === '401-700') return price >= 401 && price <= 700
  if (selectedPrice.value === '701+') return price >= 701
  return true
}

const filteredProducts = computed(() => {
  const q = search.value.trim().toLowerCase()

  let result = products.filter((item) => {
    const categoryMatch = activeCategory.value === 'all' || item.category === activeCategory.value

    const sizeMatch =
      selectedSizes.value.length === 0 ||
      item.sizes.some(size => selectedSizes.value.includes(size))

    const colorMatch =
      selectedColors.value.length === 0 ||
      selectedColors.value.includes(item.color)

    const priceMatch = matchesPrice(item.price)

    const textMatch =
      !q ||
      getLocalizedTitle(item).toLowerCase().includes(q) ||
      getLocalizedDescription(item).toLowerCase().includes(q)

    return categoryMatch && sizeMatch && colorMatch && priceMatch && textMatch
  })

  if (sortOption.value === 'price-asc') {
    result = [...result].sort((a, b) => a.price - b.price)
  } else if (sortOption.value === 'price-desc') {
    result = [...result].sort((a, b) => b.price - a.price)
  } else if (sortOption.value === 'new') {
    result = result.filter(item => item.badge === 'NEW')
  } else if (sortOption.value === 'popular') {
    result = result.filter(item => item.badge === 'HOT')
  }

  return result
})

useSeoMeta({
  title: () => `${t.value.navCatalog} | ${t.value.brand}`,
  description: () => t.value.popularSub
})
</script>

<template>
  <main class="section">
    <div class="container catalog-page">
      <aside class="catalog-sidebar">
        <div class="catalog-filter-card">
          <div class="catalog-filter-card__top">
            <h2 class="catalog-filter-card__title">{{ filterTitle }}</h2>
            <button type="button" class="catalog-filter-card__reset" @click="resetFilters">
              {{ resetText }}
            </button>
          </div>

          <div class="catalog-filter-group">
            <div class="catalog-filter-group__label">{{ sizeTitle }}</div>
            <div class="catalog-filter-pills">
              <button
                v-for="size in ['S', 'M', 'L']"
                :key="size"
                type="button"
                class="catalog-filter-pill"
                :class="{ active: selectedSizes.includes(size) }"
                @click="toggleSize(size)"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <div class="catalog-filter-group">
            <div class="catalog-filter-group__label">{{ colorTitle }}</div>
            <div class="catalog-filter-pills">
              <button
                v-for="color in colorOptions"
                :key="color.value"
                type="button"
                class="catalog-filter-pill"
                :class="{ active: selectedColors.includes(color.value) }"
                @click="toggleColor(color.value)"
              >
                {{ color.label }}
              </button>
            </div>
          </div>

          <div class="catalog-filter-group">
            <div class="catalog-filter-group__label">{{ priceTitle }}</div>
            <div class="catalog-filter-price-list">
              <button
                v-for="price in priceOptions"
                :key="price.value"
                type="button"
                class="catalog-filter-price-btn"
                :class="{ active: selectedPrice === price.value }"
                @click="selectedPrice = price.value as any"
              >
                {{ price.label }}
              </button>
            </div>
          </div>
        </div>
      </aside>

      <section class="catalog-main">
        <div class="catalog-top">
          <div>
            <h1 class="page-title">{{ t.popular }}</h1>
            <p class="page-subtitle">{{ t.popularSub }}</p>
          </div>

          <div class="catalog-top__controls">
            <input
              v-model="search"
              type="text"
              :placeholder="t.searchPlaceholder"
              class="search-input"
            />

            <div class="catalog-sort-wrap">
              <label class="catalog-sort-label">{{ sortTitle }}</label>
              <select v-model="sortOption" class="catalog-sort">
                <option
                  v-for="opt in sortOptions"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="filter-row">
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

        <div class="catalog-grid">
          <StoreProductCard
            v-for="item in filteredProducts"
            :key="item.id"
            :item="item"
          />
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.catalog-page{
  display:grid;
  grid-template-columns:280px minmax(0,1fr);
  gap:22px;
  align-items:start;
}

.catalog-sidebar{
  position:sticky;
  top:100px;
}

.catalog-filter-card{
  background:#fff;
  border:1px solid #e8ece9;
  border-radius:28px;
  box-shadow:0 8px 20px rgba(15,23,42,.04);
  padding:18px;
  display:grid;
  gap:18px;
}

.catalog-filter-card__top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
}

.catalog-filter-card__title{
  margin:0;
  font-size:22px;
  line-height:1.15;
  font-weight:900;
  color:#0f172a;
}

.catalog-filter-card__reset{
  border:none;
  background:transparent;
  color:#2f7d57;
  font-size:13px;
  font-weight:900;
  cursor:pointer;
}

.catalog-filter-group{
  display:grid;
  gap:10px;
}

.catalog-filter-group__label{
  font-size:13px;
  font-weight:900;
  color:#475569;
}

.catalog-filter-pills{
  display:flex;
  gap:8px;
  flex-wrap:wrap;
}

.catalog-filter-pill{
  min-height:38px;
  padding:0 12px;
  border-radius:999px;
  border:1px solid #dce6df;
  background:#fff;
  color:#0f172a;
  font-size:13px;
  font-weight:800;
  cursor:pointer;
}

.catalog-filter-pill.active{
  border-color:#2f7d57;
  background:linear-gradient(135deg,#2f7d57 0%,#468764 100%);
  color:#fff;
}

.catalog-filter-price-list{
  display:grid;
  gap:8px;
}

.catalog-filter-price-btn{
  min-height:40px;
  padding:0 12px;
  border-radius:14px;
  border:1px solid #dce6df;
  background:#fff;
  color:#0f172a;
  font-size:13px;
  font-weight:800;
  text-align:left;
  cursor:pointer;
}

.catalog-filter-price-btn.active{
  border-color:#2f7d57;
  background:#f3fbf6;
  color:#2f7d57;
}

.catalog-main{
  min-width:0;
}

.catalog-top__controls{
  display:flex;
  gap:12px;
  align-items:end;
  flex-wrap:wrap;
}

.catalog-sort-wrap{
  display:grid;
  gap:6px;
}

.catalog-sort-label{
  font-size:12px;
  font-weight:900;
  color:#64748b;
}

.catalog-sort{
  min-width:180px;
  height:50px;
  border-radius:16px;
  border:1px solid #e5e7eb;
  background:#fff;
  padding:0 14px;
  outline:none;
  font-size:14px;
  font-weight:800;
  color:#0f172a;
}

@media (max-width: 1080px){
  .catalog-page{
    grid-template-columns:1fr;
  }

  .catalog-sidebar{
    position:static;
  }
}

@media (max-width: 640px){
  .catalog-filter-card{
    border-radius:22px;
    padding:14px;
  }

  .catalog-filter-card__title{
    font-size:20px;
  }

  .catalog-top__controls{
    width:100%;
  }

  .catalog-sort{
    min-width:100%;
    width:100%;
  }
}
</style>
