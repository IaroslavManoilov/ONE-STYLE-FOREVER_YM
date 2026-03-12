<script setup lang="ts">
import type { Product } from '../composables/useStoreProducts'

const props = defineProps<{
  item: Product
}>()

const { getLocalizedTitle, getLocalizedDescription, getCategoryLabel, t, locale } = useStoreProducts()
const { add } = useCart()
const { toggle, isInWishlist } = useWishlist()
const { show } = useToast()
const { open } = useQuickView()

const imageSrc = computed(() => props.item.images[0] || '')
const selectedSize = ref('')
const justAdded = ref(false)
let successTimer: ReturnType<typeof setTimeout> | null = null

const wishlistAddedText = computed(() => {
  if (locale.value === 'ru') return 'Добавлено в избранное'
  if (locale.value === 'ro') return 'Adăugat la favorite'
  return 'Added to wishlist'
})

const wishlistRemovedText = computed(() => {
  if (locale.value === 'ru') return 'Удалено из избранного'
  if (locale.value === 'ro') return 'Eliminat din favorite'
  return 'Removed from wishlist'
})

const quickViewText = computed(() => {
  if (locale.value === 'ru') return 'Быстрый просмотр'
  if (locale.value === 'ro') return 'Vizualizare rapidă'
  return 'Quick View'
})

function onAddToCart() {
  if (!selectedSize.value) return

  const ok = add(props.item, selectedSize.value)
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

function onToggleWishlist() {
  const added = toggle(props.item)
  show(added ? wishlistAddedText.value : wishlistRemovedText.value, 'success')
}
</script>

<template>
  <article class="product-card">
    <button
      type="button"
      class="product-card__wishlist"
      :class="{ active: isInWishlist(item.id) }"
      @click.stop="onToggleWishlist"
    >
      <span v-if="isInWishlist(item.id)">♥</span>
      <span v-else>♡</span>
    </button>

    <NuxtLink :to="`/product/${item.slug}`" class="product-card__image-link">
      <div class="product-card__badge" v-if="item.badge">
        {{ item.badge }}
      </div>

      <div class="product-card__image-wrap">
        <img :src="imageSrc" :alt="getLocalizedTitle(item)" class="product-card__image" />
      </div>
    </NuxtLink>

    <div class="product-card__body">
      <div class="product-card__meta">
        <span class="pill product-card__category">{{ getCategoryLabel(item.category) }}</span>
        <span class="product-card__stock" v-if="item.inStock">{{ t.inStock }}</span>
      </div>

      <NuxtLink :to="`/product/${item.slug}`" class="product-card__title-link">
        <h3 class="product-card__title">{{ getLocalizedTitle(item) }}</h3>
      </NuxtLink>

      <p class="product-card__desc">{{ getLocalizedDescription(item) }}</p>

      <div class="product-card__size-block">
        <div class="product-card__size-label">{{ t.chooseSizeShort }}</div>

        <div class="product-card__sizes">
          <button
            v-for="size in item.sizes"
            :key="size"
            type="button"
            class="product-card__size-btn"
            :class="{ active: selectedSize === size }"
            @click="selectedSize = size"
          >
            {{ size }}
          </button>
        </div>

        <div v-if="selectedSize" class="product-card__selected-size">
          {{ t.selectedSize }}: <b>{{ selectedSize }}</b>
        </div>
      </div>

      <div class="product-card__bottom">
        <strong class="product-card__price">{{ item.price }} MDL</strong>

        <div class="product-card__actions">
          <button
            type="button"
            class="product-card__quick-view"
            @click="open(item)"
          >
            {{ quickViewText }}
          </button>

          <button
            type="button"
            class="btn btn-primary product-card__btn"
            :class="{ 'product-card__btn--success': justAdded }"
            :disabled="!selectedSize"
            :title="!selectedSize ? t.selectSizeFirst : ''"
            @click="onAddToCart"
          >
            {{ justAdded ? t.added : (!selectedSize ? t.chooseSize : t.addToCart) }}
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.product-card{
  position:relative;
}

.product-card__wishlist{
  position:absolute;
  top:14px;
  right:14px;
  z-index:3;
  width:40px;
  height:40px;
  border-radius:999px;
  border:1px solid #e5e7eb;
  background:#fff;
  color:#0f172a;
  font-size:18px;
  font-weight:900;
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  box-shadow:0 10px 20px rgba(15,23,42,.08);
  transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}

.product-card__wishlist:hover{
  transform:scale(1.06);
}

.product-card__wishlist.active{
  border-color:#2f7d57;
  color:#2f7d57;
  background:#f3fbf6;
}

.product-card__size-block{
  display:grid;
  gap:8px;
}

.product-card__size-label{
  font-size:13px;
  font-weight:800;
  color:#64748b;
}

.product-card__sizes{
  display:flex;
  gap:8px;
  flex-wrap:wrap;
}

.product-card__size-btn{
  padding:8px 12px;
  border-radius:999px;
  border:1px solid #e5e7eb;
  background:#fff;
  color:#475569;
  font-size:12px;
  font-weight:800;
  cursor:pointer;
}

.product-card__size-btn.active{
  border-color:#2f7d57;
  background:linear-gradient(135deg,#2f7d57 0%,#468764 100%);
  color:#fff;
}

.product-card__selected-size{
  font-size:12px;
  color:#475569;
}

.product-card__actions{
  display:flex;
  gap:8px;
  align-items:center;
  flex-wrap:wrap;
}

.product-card__quick-view{
  min-height:42px;
  padding:0 14px;
  border-radius:14px;
  border:1px solid #e5e7eb;
  background:#fff;
  color:#0f172a;
  font-size:13px;
  font-weight:900;
  cursor:pointer;
}

.product-card__btn:disabled{
  opacity:.68;
  cursor:not-allowed;
  box-shadow:none;
}

.product-card__btn--success{
  background:linear-gradient(135deg,#2d8d62 0%,#47a874 100%);
}

@media (max-width: 640px){
  .product-card__actions{
    width:100%;
    display:grid;
    grid-template-columns:1fr;
  }

  .product-card__quick-view,
  .product-card__btn{
    width:100%;
  }
}
</style>
