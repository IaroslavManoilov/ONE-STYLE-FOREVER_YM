<script setup lang="ts">
const { products, getLocalizedTitle, getLocalizedDescription } = useStoreProducts()

const selectedProductId = ref(products[0]?.id || 1)

const selectedProduct = computed(() => {
  return products.find(item => item.id === selectedProductId.value) || products[0]
})
</script>

<template>
  <section id="brand" class="section-small">
    <div class="container card hero-side">
      <div class="hero-side__stage">
        <img v-if="selectedProduct" :src="selectedProduct.images[0]" :alt="getLocalizedTitle(selectedProduct)" />
      </div>

      <div class="catalog-grid" style="grid-template-columns:repeat(2,minmax(0,1fr));">
        <button
          v-for="item in products.slice(0,4)"
          :key="item.id"
          type="button"
          class="card"
          style="padding:12px;border-radius:22px;cursor:pointer;background:#fff;"
          @click="selectedProductId = item.id"
        >
          <div style="height:120px;display:flex;align-items:center;justify-content:center;">
            <img :src="item.images[0]" :alt="getLocalizedTitle(item)" style="max-height:100px;object-fit:contain;" />
          </div>
          <div style="font-weight:900;margin-top:10px;text-align:left;">{{ getLocalizedTitle(item) }}</div>
          <div style="font-size:13px;color:#64748b;line-height:1.5;text-align:left;margin-top:6px;">
            {{ getLocalizedDescription(item) }}
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
