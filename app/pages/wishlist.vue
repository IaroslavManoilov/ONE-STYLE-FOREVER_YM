<script setup lang="ts">
const { items, remove, hydrated } = useWishlist()
const { locale, getLocalizedTitle } = useStoreProducts()
const { show } = useToast()

const pageTitle = computed(() => {
  if (locale.value === 'ru') return 'Избранное'
  if (locale.value === 'ro') return 'Favorite'
  return 'Wishlist'
})

const emptyText = computed(() => {
  if (locale.value === 'ru') return 'В избранном пока нет товаров.'
  if (locale.value === 'ro') return 'Nu ai produse salvate încă.'
  return 'No saved products yet.'
})

const removedText = computed(() => {
  if (locale.value === 'ru') return 'Товар удалён из избранного'
  if (locale.value === 'ro') return 'Produs eliminat din favorite'
  return 'Product removed from wishlist'
})

function onRemove(id: number | string) {
  remove(id)
  show(removedText.value, 'success')
}

useSeoMeta({
  title: () => pageTitle.value
})
</script>

<template>
  <main class="section">
    <div class="container wishlist-page">
      <div class="catalog-top">
        <div>
          <h1 class="page-title">{{ pageTitle }}</h1>
        </div>
      </div>

      <div v-if="!hydrated" class="wishlist-empty">
        Loading...
      </div>

      <div v-else-if="items.length === 0" class="wishlist-empty">
        {{ emptyText }}
      </div>

      <div v-else class="catalog-grid">
        <div
          v-for="product in items"
          :key="product.id"
          class="wishlist-item-wrap"
        >
          <button
            type="button"
            class="wishlist-remove"
            @click="onRemove(product.id)"
          >
            ×
          </button>

          <StoreProductCard :item="product" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.wishlist-page{
  padding-top:8px;
}

.wishlist-empty{
  border:1px solid #e5e7eb;
  background:#fff;
  border-radius:24px;
  padding:28px;
  text-align:center;
  color:#64748b;
}

.wishlist-item-wrap{
  position:relative;
}

.wishlist-remove{
  position:absolute;
  top:14px;
  right:60px;
  z-index:4;
  width:36px;
  height:36px;
  border-radius:999px;
  border:1px solid #e5e7eb;
  background:#fff;
  color:#0f172a;
  font-size:24px;
  line-height:1;
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  box-shadow:0 10px 20px rgba(15,23,42,.08);
}
</style>
