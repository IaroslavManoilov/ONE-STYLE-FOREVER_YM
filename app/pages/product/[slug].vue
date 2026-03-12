<script setup lang="ts">
const route = useRoute()
const {
  t,
  products,
  getProductBySlug,
  getLocalizedTitle,
  getLocalizedDescription,
  getCategoryLabel,
  locale
} = useStoreProducts()
const { add } = useCart()

const product = computed(() => getProductBySlug(String(route.params.slug)))
const currentImage = ref('')
const selectedSize = ref('')
const justAdded = ref(false)
let successTimer: ReturnType<typeof setTimeout> | null = null

watchEffect(() => {
  if (product.value) {
    currentImage.value = product.value.images[0] || ''
    selectedSize.value = ''
    justAdded.value = false
  }
})

const similarProducts = computed(() => {
  if (!product.value) return []

  return products
    .filter(item => item.slug !== product.value?.slug && item.category === product.value?.category)
    .slice(0, 3)
})

const sizeTitle = computed(() => t.value.chooseSize)

const whyTitle = computed(() => {
  return locale.value === 'ru'
    ? 'Почему стоит выбрать'
    : locale.value === 'ro'
      ? 'De ce merită ales'
      : 'Why choose it'
})

const whyPoints = computed(() => {
  if (locale.value === 'ru') {
    return [
      'Минималистичный стиль, который легко сочетать каждый день.',
      'Комфортная посадка и уверенный фирменный образ.',
      'Универсальная вещь для современного гардероба.'
    ]
  }

  if (locale.value === 'ro') {
    return [
      'Stil minimalist ușor de combinat zi de zi.',
      'Croială confortabilă și prezență vizuală puternică.',
      'O piesă universală pentru garderoba modernă.'
    ]
  }

  return [
    'Minimal style that is easy to wear every day.',
    'Comfortable fit with a strong branded look.',
    'A versatile piece for a modern wardrobe.'
  ]
})

const similarTitle = computed(() => {
  return locale.value === 'ru'
    ? 'Похожие товары'
    : locale.value === 'ro'
      ? 'Produse similare'
      : 'Similar products'
})

function addCurrentProduct() {
  if (!product.value || !selectedSize.value) return

  const ok = add(product.value, selectedSize.value)
  if (!ok) return

  justAdded.value = true

  if (successTimer) {
    clearTimeout(successTimer)
  }

  if (import.meta.client) {
    successTimer = setTimeout(() => {
      justAdded.value = false
    }, 1500)
  }
}

useSeoMeta({
  title: () => product.value ? `${getLocalizedTitle(product.value)} | ${t.value.brand}` : t.value.brand,
  description: () => product.value ? getLocalizedDescription(product.value) : t.value.subtitle
})
</script>

<template>
  <main class="section">
    <div v-if="product" class="container product-page-grid">
      <section class="card product-gallery-card">
        <div class="product-main-visual">
          <img :src="currentImage" :alt="getLocalizedTitle(product)" />
        </div>

        <div class="product-thumb-row">
          <button
            v-for="image in product.images"
            :key="image"
            type="button"
            class="product-thumb"
            :class="{ active: currentImage === image }"
            @click="currentImage = image"
          >
            <img :src="image" alt="" />
          </button>
        </div>
      </section>

      <section class="card product-info-card">
        <NuxtLink to="/catalog" class="back-link">
          ← {{ t.backToCatalog }}
        </NuxtLink>

        <div class="product-label-row">
          <span class="pill">{{ getCategoryLabel(product.category) }}</span>
          <span v-if="product.inStock" class="in-stock">{{ t.inStock }}</span>
        </div>

        <h1 class="product-big-title">{{ getLocalizedTitle(product) }}</h1>
        <p class="product-lead">{{ getLocalizedDescription(product) }}</p>

        <div class="product-price-box">
          <strong class="product-big-price">{{ product.price }} MDL</strong>
          <span v-if="product.oldPrice" class="product-old-price">{{ product.oldPrice }} MDL</span>
        </div>

        <div class="size-block">
          <div class="size-title">{{ sizeTitle }}</div>
          <div class="size-options">
            <button
              v-for="size in product.sizes"
              :key="size"
              type="button"
              class="size-btn"
              :class="{ active: selectedSize === size }"
              @click="selectedSize = size"
            >
              {{ size }}
            </button>
          </div>

          <div v-if="selectedSize" class="product-selected-size">
            {{ t.selectedSize }}: <b>{{ selectedSize }}</b>
          </div>
        </div>

        <button
          type="button"
          class="btn btn-primary buy-btn"
          :class="{ 'buy-btn--success': justAdded }"
          :disabled="!selectedSize"
          :title="!selectedSize ? t.selectSizeFirst : ''"
          @click="addCurrentProduct"
        >
          {{ justAdded ? t.added : (!selectedSize ? t.chooseSize : t.addToCart) }}
        </button>

        <div class="card product-why-card">
          <h2 class="product-section-title">{{ whyTitle }}</h2>
          <ul class="why-list">
            <li v-for="point in whyPoints" :key="point">{{ point }}</li>
          </ul>
        </div>
      </section>
    </div>

    <section v-if="similarProducts.length" class="section-small">
      <div class="container">
        <div class="catalog-top" style="margin-bottom:20px;">
          <div>
            <h2 class="page-title" style="font-size:34px;">{{ similarTitle }}</h2>
          </div>
        </div>

        <div class="catalog-grid">
          <StoreProductCard
            v-for="item in similarProducts"
            :key="item.id"
            :item="item"
          />
        </div>
      </div>
    </section>

    <div v-if="!product" class="container" style="padding:40px 0;">
      Product not found
    </div>
  </main>
</template>

<style scoped>
.product-selected-size{
  margin-top:10px;
  font-size:13px;
  color:#475569;
}

.buy-btn:disabled{
  opacity:.68;
  cursor:not-allowed;
  box-shadow:none;
}

.buy-btn--success{
  background:linear-gradient(135deg,#2d8d62 0%,#47a874 100%);
}
</style>
