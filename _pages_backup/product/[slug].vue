<script setup lang="ts">
const route = useRoute()
const { t, getProductBySlug, getLocalizedProduct } = useStoreProducts()
const { add } = useCart()

const product = computed(() => {
  return getProductBySlug(String(route.params.slug))
})

const currentImage = ref('')

watchEffect(() => {
  if (product.value) {
    currentImage.value = product.value.gallery?.[0] || product.value.image
  }
})

useSeoMeta({
  title: () => {
    if (!product.value) return t.value.brand
    return `${getLocalizedProduct(product.value).title} | ${t.value.brand}`
  },
  description: () => {
    if (!product.value) return t.value.subtitle
    return getLocalizedProduct(product.value).description
  }
})
</script>

<template>
  <div class="page-bg">
    <SiteHeader />

    <main class="product-page">
      <div v-if="product" class="container product-layout">
        <div class="gallery-card">
          <div class="main-image">
            <img :src="currentImage" :alt="getLocalizedProduct(product).title" />
          </div>

          <div class="thumb-row">
            <button
              v-for="image in product.gallery || [product.image]"
              :key="image"
              type="button"
              class="thumb"
              @click="currentImage = image"
            >
              <img :src="image" alt="" />
            </button>
          </div>
        </div>

        <div class="info-card">
          <NuxtLink to="/catalog" class="back-link">
            ← {{ t.backToCatalog }}
          </NuxtLink>

          <div class="top-line">
            <span class="cat">{{ product.category === 'hoodies' ? t.hoodies : t.polo }}</span>
            <span class="stock">{{ t.inStock }}</span>
          </div>

          <h1>{{ getLocalizedProduct(product).title }}</h1>

          <p class="desc">{{ getLocalizedProduct(product).description }}</p>

          <div class="price-box">
            <strong class="price">{{ product.price }} MDL</strong>
            <span v-if="product.oldPrice" class="old-price">{{ product.oldPrice }} MDL</span>
          </div>

          <button type="button" class="buy-btn" @click="add(product)">
            {{ t.addToCart }}
          </button>
        </div>
      </div>

      <div v-else class="container not-found">
        Product not found
      </div>
    </main>
  </div>
</template>

<style scoped>
.page-bg{min-height:100vh;background:radial-gradient(circle at top left,rgba(47,125,87,.14),transparent 25%),radial-gradient(circle at top right,rgba(15,23,42,.06),transparent 20%),linear-gradient(180deg,#f8fafc 0%,#eef5f0 100%);color:#0f172a}
.container{width:min(1360px,calc(100% - 32px));margin:0 auto}
.product-page{padding:28px 0 52px}
.product-layout{display:grid;grid-template-columns:1fr 480px;gap:24px;align-items:start}
.gallery-card,.info-card{background:rgba(255,255,255,.9);border:1px solid #e5e7eb;border-radius:34px;padding:22px;box-shadow:0 18px 36px rgba(15,23,42,.05)}
.main-image{border-radius:28px;overflow:hidden;background:radial-gradient(circle at center,#ffffff 0%,#eef8f1 100%);min-height:520px}
.main-image img{width:100%;height:100%;object-fit:cover}
.thumb-row{display:flex;gap:12px;flex-wrap:wrap;margin-top:16px}
.thumb{width:92px;height:92px;border-radius:18px;overflow:hidden;border:1px solid #e5e7eb;background:#fff;cursor:pointer}
.thumb img{width:100%;height:100%;object-fit:cover}
.back-link{display:inline-block;margin-bottom:18px;color:#2f7d57;text-decoration:none;font-weight:800}
.top-line{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:12px}
.cat{display:inline-flex;padding:8px 12px;border-radius:999px;background:#f8fafc;border:1px solid #e5e7eb;color:#64748b;font-size:12px;font-weight:900}
.stock{color:#16a34a;font-size:13px;font-weight:900}
.info-card h1{margin:0 0 12px;font-size:42px;font-weight:900}
.desc{margin:0 0 22px;color:#64748b;line-height:1.7;font-size:17px}
.price-box{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:22px}
.price{font-size:40px}
.old-price{color:#94a3b8;text-decoration:line-through;font-size:18px;font-weight:800}
.buy-btn{width:100%;border:none;border-radius:18px;padding:18px;background:linear-gradient(135deg,#2f7d57 0%,#468764 100%);color:#fff;font-size:16px;font-weight:900;cursor:pointer;box-shadow:0 14px 28px rgba(47,125,87,.22)}
.not-found{padding:40px 0}

@media (max-width: 1180px){
  .product-layout{grid-template-columns:1fr}
}

@media (max-width: 640px){
  .container{width:min(100% - 20px,1360px)}
  .product-page{padding:20px 0 32px}
  .gallery-card,.info-card{padding:16px;border-radius:24px}
  .main-image{min-height:320px}
  .thumb{width:72px;height:72px}
  .info-card h1{font-size:30px}
  .desc{font-size:15px}
  .price{font-size:32px}
  .buy-btn{padding:16px}
}
</style>