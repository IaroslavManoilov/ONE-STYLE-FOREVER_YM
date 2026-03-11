<script setup lang="ts">
defineProps<{
  title: string
  text: string
  soft?: boolean
}>()
</script>

<template>
  <section :class="soft ? 'soft-card value-card' : 'glass-card content-card'">
    <h3 :class="soft ? 'value-title' : 'content-title'">{{ title }}</h3>
    <p :class="soft ? 'value-text' : 'content-text'">{{ text }}</p>
  </section>
</template>
