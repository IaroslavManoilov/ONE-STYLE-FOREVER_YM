<script setup lang="ts">
const { loadFromStorage: loadCart } = useCart()
const { loadFromStorage: loadWishlist } = useWishlist()

onMounted(() => {
  loadCart()
  loadWishlist()
})
</script>

<template>
  <div class="page-root">
    <SiteHeader />
    <slot />
    <SiteFooter />
    <UiAppToast />
    <ProductQuickViewModal />
  </div>
</template>
