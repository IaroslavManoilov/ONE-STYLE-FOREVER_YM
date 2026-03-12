<script setup lang="ts">
const { items, count, remove } = useWishlist()
const { locale, getLocalizedTitle } = useStoreProducts()
const { show } = useToast()

const titleText = computed(() => {
  if (locale.value === 'ru') return 'Избранное'
  if (locale.value === 'ro') return 'Favorite'
  return 'Wishlist'
})

const emptyText = computed(() => {
  if (locale.value === 'ru') return 'Пока нет сохранённых товаров.'
  if (locale.value === 'ro') return 'Nu ai produse salvate încă.'
  return 'No saved products yet.'
})

const openText = computed(() => {
  if (locale.value === 'ru') return 'Открыть избранное'
  if (locale.value === 'ro') return 'Deschide favorite'
  return 'Open wishlist'
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
</script>

<template>
  <div class="wishlist-dropdown">
    <div class="wishlist-dropdown__head">
      <h3 class="wishlist-dropdown__title">{{ titleText }}</h3>
      <span class="wishlist-dropdown__count">{{ count }}</span>
    </div>

    <div v-if="count === 0" class="wishlist-dropdown__empty">
      {{ emptyText }}
    </div>

    <div v-else class="wishlist-dropdown__list">
      <article
        v-for="item in items.slice(0, 4)"
        :key="item.id"
        class="wishlist-dropdown__item"
      >
        <NuxtLink :to="`/product/${item.slug}`" class="wishlist-dropdown__image">
          <img :src="item.images[0]" :alt="getLocalizedTitle(item)" />
        </NuxtLink>

        <div class="wishlist-dropdown__body">
          <NuxtLink :to="`/product/${item.slug}`" class="wishlist-dropdown__name">
            {{ getLocalizedTitle(item) }}
          </NuxtLink>

          <div class="wishlist-dropdown__price">
            {{ item.price }} MDL
          </div>
        </div>

        <button
          type="button"
          class="wishlist-dropdown__remove"
          @click.prevent.stop="onRemove(item.id)"
        >
          ×
        </button>
      </article>

      <NuxtLink to="/wishlist" class="wishlist-dropdown__open">
        {{ openText }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.wishlist-dropdown{
  width:340px;
  border:1px solid #e7ece8;
  border-radius:22px;
  background:#fff;
  box-shadow:0 18px 40px rgba(15,23,42,.10);
  padding:14px;
}

.wishlist-dropdown__head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  margin-bottom:10px;
}

.wishlist-dropdown__title{
  margin:0;
  font-size:18px;
  font-weight:900;
  color:#0f172a;
}

.wishlist-dropdown__count{
  min-width:28px;
  height:28px;
  padding:0 8px;
  border-radius:999px;
  background:#f3f7f4;
  border:1px solid #dfe8e1;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-size:12px;
  font-weight:900;
  color:#2f7d57;
}

.wishlist-dropdown__empty{
  padding:12px 4px 4px;
  color:#64748b;
  font-size:14px;
  line-height:1.6;
}

.wishlist-dropdown__list{
  display:grid;
  gap:10px;
}

.wishlist-dropdown__item{
  display:grid;
  grid-template-columns:64px 1fr 28px;
  gap:10px;
  align-items:center;
  padding:8px;
  border-radius:16px;
  background:#fbfdfb;
  border:1px solid #edf2ee;
}

.wishlist-dropdown__image{
  width:64px;
  height:64px;
  border-radius:14px;
  background:#f4f7f5;
  border:1px solid #dde6df;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  padding:8px;
}

.wishlist-dropdown__image img{
  width:100%;
  height:100%;
  object-fit:contain;
}

.wishlist-dropdown__body{
  min-width:0;
}

.wishlist-dropdown__name{
  display:block;
  color:#0f172a;
  text-decoration:none;
  font-size:14px;
  font-weight:800;
  line-height:1.35;
  margin-bottom:4px;
}

.wishlist-dropdown__price{
  color:#475569;
  font-size:13px;
  font-weight:800;
}

.wishlist-dropdown__remove{
  width:28px;
  height:28px;
  border:none;
  border-radius:999px;
  background:#fff;
  color:#94a3b8;
  cursor:pointer;
  font-size:20px;
  line-height:1;
}

.wishlist-dropdown__open{
  margin-top:4px;
  min-height:42px;
  border-radius:14px;
  display:flex;
  align-items:center;
  justify-content:center;
  text-decoration:none;
  font-size:14px;
  font-weight:900;
  background:linear-gradient(135deg,#2f7d57 0%,#468764 100%);
  color:#fff;
  box-shadow:0 12px 24px rgba(47,125,87,.16);
}
</style>
