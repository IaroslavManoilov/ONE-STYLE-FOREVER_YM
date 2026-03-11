<script setup lang="ts">
defineProps<{
  text: string
  tone?: 'green' | 'dark' | 'soft'
}>()

const toneClass = computed(() => {
  return {
    green: 'pill pill-green',
    dark: 'pill pill-dark',
    soft: 'pill hero-chip hero-chip-green'
  }
})
</script>

<template>
  <div :class="toneClass[tone || 'green']">
    {{ text }}
  </div>
</template>
