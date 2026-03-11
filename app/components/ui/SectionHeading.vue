<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  titleClass?: string
}>()
</script>

<template>
  <div>
    <h2 :class="titleClass || 'page-title'">{{ title }}</h2>
    <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
  </div>
</template>
