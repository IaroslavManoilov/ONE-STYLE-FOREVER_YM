<script setup lang="ts">
const { t } = useStoreProducts()
</script>

<template>
  <section class="section">
    <div class="container about-grid">
      <div class="card about-card">
        <span class="pill">{{ t.navAbout }}</span>
        <h1 class="hero-title">{{ t.aboutPageTitle }}</h1>
        <p class="hero-text">{{ t.aboutLead }}</p>
      </div>

      <div class="card about-card">
        <div class="about-logo">
          <img src="/images/brand/logo-circle.png" alt="ONE_STYLE FOREVER" />
        </div>
      </div>
    </div>
  </section>
</template>
