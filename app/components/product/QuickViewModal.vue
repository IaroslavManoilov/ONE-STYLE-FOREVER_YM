<script setup lang="ts">
const { isOpen, product, close } = useQuickView()
const { t, getLocalizedTitle, getLocalizedDescription, getCategoryLabel, locale } = useStoreProducts()
const { add } = useCart()
const { toggle, isInWishlist } = useWishlist()
const { show } = useToast()

const currentImage = ref('')
const selectedSize = ref('')
const justAdded = ref(false)
let successTimer: ReturnType<typeof setTimeout> | null = null

watchEffect(() => {
  if (product.value && isOpen.value) {
    currentImage.value = product.value.images[0] || ''
    selectedSize.value = ''
    justAdded.value = false
  }
})

const chooseSizeText = computed(() => {
  return (t.value as any).chooseSize || 'Choose size'
})

const addedText = computed(() => {
  return (t.value as any).added || 'Added'
})

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

function onBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    close()
  }
}

function onAddToCart() {
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

function onToggleWishlist() {
  if (!product.value) return
  const added = toggle(product.value)
  show(added ? wishlistAddedText.value : wishlistRemovedText.value, 'success')
}
</script>

<template>
  <Teleport to="body">
    <transition name="qv-fade">
      <div
        v-if="isOpen && product"
        class="qv-backdrop"
        @click="onBackdropClick"
      >
        <transition name="qv-scale">
          <div v-if="isOpen && product" class="qv-modal">
            <button type="button" class="qv-close" @click="close">×</button>

            <div class="qv-grid">
              <section class="qv-gallery">
                <div class="qv-label">{{ quickViewText }}</div>

                <div class="qv-main-image">
                  <img :src="currentImage" :alt="getLocalizedTitle(product)" />
                </div>

                <div class="qv-thumbs">
                  <button
                    v-for="image in product.images"
                    :key="image"
                    type="button"
                    class="qv-thumb"
                    :class="{ active: currentImage === image }"
                    @click="currentImage = image"
                  >
                    <img :src="image" alt="" />
                  </button>
                </div>
              </section>

              <section class="qv-info">
                <div class="qv-topline">
                  <span class="qv-pill">{{ getCategoryLabel(product.category) }}</span>
                  <button
                    type="button"
                    class="qv-wishlist"
                    :class="{ active: isInWishlist(product.id) }"
                    @click="onToggleWishlist"
                  >
                    <span v-if="isInWishlist(product.id)">♥</span>
                    <span v-else>♡</span>
                  </button>
                </div>

                <h2 class="qv-title">{{ getLocalizedTitle(product) }}</h2>
                <p class="qv-desc">{{ getLocalizedDescription(product) }}</p>

                <div class="qv-price-row">
                  <strong class="qv-price">{{ product.price }} MDL</strong>
                  <span v-if="product.oldPrice" class="qv-old-price">{{ product.oldPrice }} MDL</span>
                </div>

                <div class="qv-size-block">
                  <div class="qv-size-label">{{ chooseSizeText }}</div>

                  <div class="qv-size-options">
                    <button
                      v-for="size in product.sizes"
                      :key="size"
                      type="button"
                      class="qv-size-btn"
                      :class="{ active: selectedSize === size }"
                      @click="selectedSize = size"
                    >
                      {{ size }}
                    </button>
                  </div>

                  <div v-if="selectedSize" class="qv-size-selected">
                    {{ t.selectedSize }}: <b>{{ selectedSize }}</b>
                  </div>
                </div>

                <div class="qv-actions">
                  <button
                    type="button"
                    class="qv-add-btn"
                    :class="{ 'qv-add-btn--success': justAdded }"
                    :disabled="!selectedSize"
                    @click="onAddToCart"
                  >
                    {{ justAdded ? addedText : (!selectedSize ? chooseSizeText : t.addToCart) }}
                  </button>

                  <NuxtLink
                    :to="`/product/${product.slug}`"
                    class="qv-open-link"
                    @click="close"
                  >
                    {{ t.backToCatalog }}
                  </NuxtLink>
                </div>
              </section>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.qv-backdrop{
  position:fixed;
  inset:0;
  z-index:250;
  background:rgba(15,23,42,.46);
  backdrop-filter:blur(5px);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:20px;
}

.qv-modal{
  position:relative;
  width:min(1080px, 100%);
  max-height:min(90vh, 920px);
  overflow:auto;
  background:#fff;
  border:1px solid #e7ece8;
  border-radius:30px;
  box-shadow:0 24px 60px rgba(15,23,42,.18);
  padding:24px;
}

.qv-close{
  position:absolute;
  top:14px;
  right:14px;
  width:40px;
  height:40px;
  border:none;
  border-radius:999px;
  background:#fff;
  box-shadow:0 8px 20px rgba(15,23,42,.08);
  font-size:24px;
  line-height:1;
  cursor:pointer;
  z-index:2;
}

.qv-grid{
  display:grid;
  grid-template-columns:minmax(0,1fr) 420px;
  gap:24px;
  align-items:start;
}

.qv-gallery{
  display:grid;
  gap:14px;
}

.qv-label{
  width:max-content;
  padding:8px 12px;
  border-radius:999px;
  border:1px solid #e5e7eb;
  background:#fff;
  font-size:12px;
  font-weight:900;
  color:#64748b;
}

.qv-main-image{
  min-height:540px;
  border-radius:28px;
  background:radial-gradient(circle at top, rgba(255,255,255,.98) 0%, rgba(241,247,243,.98) 48%, rgba(231,238,233,1) 100%);
  border:1px solid #dde8e0;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:26px;
  overflow:hidden;
}

.qv-main-image img{
  max-width:100%;
  max-height:470px;
  object-fit:contain;
  filter:drop-shadow(0 18px 36px rgba(15,23,42,.10));
}

.qv-thumbs{
  display:flex;
  gap:12px;
  flex-wrap:wrap;
}

.qv-thumb{
  width:82px;
  height:82px;
  border-radius:16px;
  border:1px solid #dde6df;
  background:#fff;
  overflow:hidden;
  cursor:pointer;
  padding:6px;
}

.qv-thumb.active{
  border-color:#2f7d57;
  box-shadow:0 0 0 3px rgba(47,125,87,.12);
}

.qv-thumb img{
  width:100%;
  height:100%;
  object-fit:cover;
}

.qv-info{
  display:grid;
  gap:16px;
  padding-top:14px;
}

.qv-topline{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
}

.qv-pill{
  padding:8px 12px;
  border-radius:999px;
  border:1px solid #e5e7eb;
  background:#f8fafc;
  font-size:12px;
  font-weight:900;
  color:#64748b;
}

.qv-wishlist{
  width:40px;
  height:40px;
  border-radius:999px;
  border:1px solid #e5e7eb;
  background:#fff;
  font-size:18px;
  cursor:pointer;
  box-shadow:0 8px 20px rgba(15,23,42,.06);
}

.qv-wishlist.active{
  color:#2f7d57;
  border-color:#2f7d57;
  background:#f3fbf6;
}

.qv-title{
  margin:0;
  font-size:34px;
  line-height:1.08;
  font-weight:900;
  color:#0f172a;
}

.qv-desc{
  margin:0;
  color:#64748b;
  font-size:15px;
  line-height:1.75;
}

.qv-price-row{
  display:flex;
  align-items:center;
  gap:12px;
  flex-wrap:wrap;
}

.qv-price{
  font-size:34px;
  font-weight:900;
  color:#0f172a;
}

.qv-old-price{
  color:#94a3b8;
  text-decoration:line-through;
  font-size:16px;
  font-weight:800;
}

.qv-size-block{
  display:grid;
  gap:10px;
  padding:16px;
  border-radius:20px;
  background:linear-gradient(180deg,#fbfdfb 0%,#f2f7f4 100%);
  border:1px solid #e2ebe5;
}

.qv-size-label{
  font-size:13px;
  font-weight:900;
  color:#475569;
}

.qv-size-options{
  display:flex;
  gap:10px;
  flex-wrap:wrap;
}

.qv-size-btn{
  min-width:54px;
  height:42px;
  padding:0 14px;
  border-radius:14px;
  border:1px solid #dbe4de;
  background:#fff;
  font-size:14px;
  font-weight:900;
  cursor:pointer;
}

.qv-size-btn.active{
  border-color:#2f7d57;
  background:linear-gradient(135deg,#2f7d57 0%,#468764 100%);
  color:#fff;
  box-shadow:0 12px 24px rgba(47,125,87,.18);
}

.qv-size-selected{
  font-size:13px;
  color:#475569;
}

.qv-actions{
  display:grid;
  gap:10px;
}

.qv-add-btn,
.qv-open-link{
  min-height:48px;
  border-radius:16px;
  display:flex;
  align-items:center;
  justify-content:center;
  text-decoration:none;
  font-size:14px;
  font-weight:900;
}

.qv-add-btn{
  border:none;
  background:linear-gradient(135deg,#2f7d57 0%,#468764 100%);
  color:#fff;
  box-shadow:0 12px 24px rgba(47,125,87,.16);
  cursor:pointer;
}

.qv-add-btn:disabled{
  opacity:.7;
  cursor:not-allowed;
  box-shadow:none;
}

.qv-add-btn--success{
  background:linear-gradient(135deg,#2d8d62 0%,#47a874 100%);
}

.qv-open-link{
  border:1px solid #e5e7eb;
  background:#fff;
  color:#0f172a;
}

.qv-fade-enter-active,
.qv-fade-leave-active{
  transition:opacity .2s ease;
}
.qv-fade-enter-from,
.qv-fade-leave-to{
  opacity:0;
}

.qv-scale-enter-active,
.qv-scale-leave-active{
  transition:all .22s ease;
}
.qv-scale-enter-from,
.qv-scale-leave-to{
  opacity:0;
  transform:scale(.98) translateY(8px);
}

@media (max-width: 980px){
  .qv-grid{
    grid-template-columns:1fr;
  }

  .qv-main-image{
    min-height:340px;
  }

  .qv-main-image img{
    max-height:280px;
  }
}

@media (max-width: 640px){
  .qv-backdrop{
    padding:10px;
  }

  .qv-modal{
    padding:14px;
    border-radius:22px;
  }

  .qv-title{
    font-size:26px;
  }

  .qv-price{
    font-size:28px;
  }

  .qv-main-image{
    min-height:280px;
    padding:16px;
    border-radius:20px;
  }

  .qv-main-image img{
    max-height:220px;
  }

  .qv-thumb{
    width:66px;
    height:66px;
  }
}
</style>
