<script setup lang="ts">
defineProps<{
  phoneLabel: string
  phone: string
  emailLabel: string
  email: string
  instagramLabel: string
  instagram: string
  instagramUrl: string
}>()
</script>

<template>
  <div class="contact-list">
    <div class="contact-row">
      <span class="contact-label">{{ phoneLabel }}</span>
      <a class="contact-link" :href="`tel:${phone}`">{{ phone }}</a>
    </div>

    <div class="contact-row">
      <span class="contact-label">{{ emailLabel }}</span>
      <a class="contact-link" :href="`mailto:${email}`">{{ email }}</a>
    </div>

    <div class="contact-row">
      <span class="contact-label">{{ instagramLabel }}</span>
      <a class="contact-link" :href="instagramUrl" target="_blank" rel="noopener noreferrer">
        @{{ instagram }}
      </a>
    </div>
  </div>
</template>
