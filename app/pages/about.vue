<script setup lang="ts">
const { t } = useStoreProducts()

useSeoMeta({
  title: () => `${t.value.navAbout} | ${t.value.brand}`,
  description: () => t.value.aboutLead
})
</script>

<template>
  <main>
    <AboutHero />
    <AboutValues />
  </main>
</template>
