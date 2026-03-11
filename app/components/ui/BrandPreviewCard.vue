<script setup lang="ts">
defineProps<{
  image: string
  title: string
  text: string
}>()
</script>

<template>
  <div class="glass-card side-card">
    <div class="brand-preview-box">
      <img :src="image" :alt="title" />
    </div>

    <div class="dark-card brand-note">
      <div class="brand-note-title">{{ title }}</div>
      <div class="brand-note-text">{{ text }}</div>
    </div>
  </div>
</template>
